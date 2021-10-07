const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')
const UserGroup = require('../models/UserGroup')

/**
 * Sign in
 */
exports.signup = async (req, res) => {
  try {
    const { displayName, email, password } = req.body

    //  Judge if the user who has the req email is already existed.
    let user = await User.findOne({ email: email })
    if (user) {
      return res.json({
        error: [{ type: 'email', message: 'User already existed' }],
      })
    }

    //  Find the default group which 'name' is 'user'
    let defaultUserGroup = await UserGroup.findOne({ name: 'user' })

    //  Create a new user
    user = new User({
      username: displayName,
      name: displayName,
      email: email,
      password: password,
      userGroups: defaultUserGroup._id,
    })

    //  Encrypt the password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    //  Save the newly created user
    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    //  Generate the token using the created user info.
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '500 days' },
      (err, token) => {
        if (err) throw err
        res.json({
          access_token: token,
          user: user,
        })
        // user
        //   .execPopulate('groups')
        //   .execPopulate('leftMenu')
        //   .execPopulate('rightMenu')
        //   .execPopulate('dashboard')
        //   .then((result) => {
        //     console.log(result)
        //     res.json({
        //       access_token: token,
        //       user: result,
        //     })
        //   })
      },
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

/**
 * Sign up
 */
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    //  Find a user who has the email.
    let user = await User.findOne({ email })
      .populate('groups')
      .populate('leftMenu')
      .populate('rightMenu')
      .populate('dashboard')
    if (!user) {
      return res.json({
        error: [{ type: 'email', message: 'Check your email address.' }],
      })
    }
    //  Compare the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.json({
        error: [{ type: 'password', message: 'Check your password.' }],
      })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }

    //  Generate the token using the created user info.
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err
        res.json({
          access_token: token,
          user: user,
        })
      },
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

/**
 * Sign in with access-token
 */
exports.signinWithToken = (req, res) => {
  //  id from token
  const { id } = req.user
  User.findById(id)
    .populate('groups')
    .populate('leftMenu')
    .populate('rightMenu')
    .populate('dashboard')
    .then((result) => {
      if (result) {
        res.json({ user: result })
      } else {
        res.status(400).send('Your account has been removed.')
      }
    })
    .catch((err) => {
      res.status(401).send('Unauthorized request')
    })
}
