/**
 * Node server
 * Created at 2021/08/02
 * Created by Ilia L
 */
require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())
app.use(cors())
app.use(express.json())

//  Define the route to read the files of the server from the client
app.use('/uploads/', express.static('uploads'))

// Define Routes
app.use('/api/auth', require('./routes/api/authRoute'))
app.use('/api/userGroup', require('./routes/api/userGroupRoute'))
app.use('/api/announcement', require('./routes/api/announcementRoute'))
app.use('/api/component', require('./routes/api/componentRoute'))
app.use('/api/layout', require('./routes/api/layoutRoute'))
app.use('/api/user', require('./routes/api/userRoute'))
app.use('/api/board', require('./routes/api/boardRoute'))
app.use('/api/job', require('./routes/api/jobRoute'))
app.use('/api/boardField', require('./routes/api/boardFieldRoute'))
app.use('/api/jobCategory', require('./routes/api/jobCategoryRoute'))
app.use('/api/jobStatus', require('./routes/api/jobStatusRoute'))
app.use('/api/jobDueDate', require('./routes/api/jobDueDateRoute'))

// Serve frontend built
app.use(express.static(__dirname + '/client/build'))

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/build/index.html')
})

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
