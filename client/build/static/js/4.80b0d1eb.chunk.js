(this["webpackJsonpfuse-react-app"]=this["webpackJsonpfuse-react-app"]||[]).push([[4],{1132:function(t,e,n){"use strict";n.d(e,"a",(function(){return f})),n.d(e,"i",(function(){return p})),n.d(e,"c",(function(){return j})),n.d(e,"f",(function(){return O})),n.d(e,"d",(function(){return x})),n.d(e,"e",(function(){return h})),n.d(e,"g",(function(){return m})),n.d(e,"j",(function(){return v})),n.d(e,"k",(function(){return g})),n.d(e,"h",(function(){return w})),n.d(e,"l",(function(){return C}));var r,a=n(22),c=n(7),s=n(18),u=n.n(s),o=n(35),i=n(24),d=n(75),l=n(1136),b=n(1133),f=Object(i.b)("/tasks/boardColumns/create",function(){var t=Object(o.a)(u.a.mark((function t(e,n){var r,a,c,s,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.dispatch,a=e.columnType,c=e.newData,t.next=4,d.a.post("".concat(y(a),"/create"),c);case 4:return s=t.sent,t.next=7,s.data;case 7:if(o=t.sent,a!==l.c){t.next=11;break}return t.next=11,r(Object(b.b)(o));case 11:if(a!==l.a){t.next=14;break}return t.next=14,r(Object(b.a)(o));case 14:return t.abrupt("return",o);case 15:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),p=Object(i.b)("/tasks/boardColumns/rename",function(){var t=Object(o.a)(u.a.mark((function t(e){var n,r,a,c,s;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.columnType,r=e.name,a=e._id,t.next=3,d.a.put("".concat(y(n),"/rename/").concat(a),{name:r});case 3:return c=t.sent,t.next=6,c.data;case 6:return(s=t.sent).name=r,t.abrupt("return",s);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),j=Object(i.b)("/tasks/boardColumns/delete",function(){var t=Object(o.a)(u.a.mark((function t(e,n){var r,a,c,s,o;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.dispatch,a=e.columnType,c=e._id,t.next=4,d.a.delete("".concat(y(a),"/delete/").concat(c));case 4:return s=t.sent,t.next=7,s.data;case 7:if(o=t.sent,a!==l.c){t.next=11;break}return t.next=11,r(Object(b.h)(c));case 11:if(a!==l.a){t.next=14;break}return t.next=14,r(Object(b.g)(c));case 14:return t.abrupt("return",o);case 15:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),O=Object(i.b)("/tasks/boardColumns/getAllJobStatuses",Object(o.a)(u.a.mark((function t(){var e,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("/jobStatus/getAll");case 2:return e=t.sent,t.next=5,e.data;case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))),x=Object(i.b)("/tasks/boardColumns/getAllJobCategories",Object(o.a)(u.a.mark((function t(){var e,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("/jobCategory/getAll");case 2:return e=t.sent,t.next=5,e.data;case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))),h=Object(i.b)("/tasks/boardColumns/getAllJobDueDates",Object(o.a)(u.a.mark((function t(){var e,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("/jobDueDate/getAll");case 2:return e=t.sent,t.next=5,e.data;case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))),m=Object(i.b)("/tasks/boardColumns/getAllUsers",Object(o.a)(u.a.mark((function t(){var e,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("/user/getAll");case 2:return e=t.sent,t.next=5,e.data;case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))),v=Object(i.b)("/tasks/boardColumns/replaceColumns",function(){var t=Object(o.a)(u.a.mark((function t(e,n){var r,a,s,o,i,l;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.dispatch,r=e.columnType,a=e.columns,s=e.job,o=null,s&&(o=Object(c.a)({},s),s.dueDate&&(o.dueDate=s.dueDate._id),s.user&&(o.user=s.user._id)),t.next=6,d.a.put("".concat(y(r),"/changeJobs"),{columns:a,job:o});case 6:return i=t.sent,t.next=9,i.data;case 9:return l=t.sent,t.abrupt("return",l);case 11:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),g=Object(i.b)("/tasks/boardColumns/resetAllColumns",function(){var t=Object(o.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),w=Object(i.b)("/tasks/boardColumns/removeColumn",function(){var t=Object(o.a)(u.a.mark((function t(e){return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),y=function(t){switch(t){case l.c:return"jobStatus";case l.a:return"jobCategory";case l.b:return"jobDueDate";case l.d:return"user"}return null},k=Object(i.c)({selectId:function(t){return t._id}}),C=k.getSelectors((function(t){return t.tasks.boardColumns})).selectAll,D=Object(i.d)({name:"tasks/boardColumns",initialState:k.getInitialState({}),reducers:{},extraReducers:(r={},Object(a.a)(r,f.fulfilled,k.addOne),Object(a.a)(r,O.fulfilled,k.setAll),Object(a.a)(r,x.fulfilled,k.setAll),Object(a.a)(r,h.fulfilled,k.setAll),Object(a.a)(r,m.fulfilled,k.setAll),Object(a.a)(r,g.fulfilled,k.setAll),Object(a.a)(r,p.fulfilled,k.upsertOne),Object(a.a)(r,v.fulfilled,k.upsertMany),Object(a.a)(r,w.fulfilled,k.removeOne),r)});e.b=D.reducer},1133:function(t,e,n){"use strict";n.d(e,"e",(function(){return i})),n.d(e,"f",(function(){return b})),n.d(e,"c",(function(){return f})),n.d(e,"b",(function(){return p})),n.d(e,"a",(function(){return j})),n.d(e,"h",(function(){return O})),n.d(e,"g",(function(){return x}));var r=n(22),a=n(18),c=n.n(a),s=n(35),u=n(24),o=n(75),i=Object(u.b)("/tasks/jobCardDialog/getAllBoardColumnsExceptDueDate",Object(s.a)(c.a.mark((function t(){var e,n;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("job/getAllBoardColumnsExceptDueDate");case 2:return e=t.sent,t.next=5,e.data;case 5:return n=t.sent,console.log(n),t.abrupt("return",n);case 8:case"end":return t.stop()}}),t)})))),d=Object(u.d)({name:"tasks/jobCardDialog",initialState:{dialogOpen:!1,data:null,statuses:[],categories:[]},reducers:{openJobCardDialog:function(t,e){t.dialogOpen=!0,t.data=e.payload},closeJobCardDialog:function(t,e){t.dialogOpen=!1,t.data=null},addStatus:function(t,e){t.statuses.push(e.payload)},addCategory:function(t,e){t.categories.push(e.payload)},removeStatus:function(t,e){t.statuses.splice(t.statuses.indexOf(t.statuses.find((function(t){return t._id===e.payload}))),1)},removeCategory:function(t,e){console.log(e.payload),t.categories.splice(t.categories.indexOf(t.categories.find((function(t){return t._id===e.payload}))),1)},replaceStatus:function(t,e){t.statuses.splice(t.statuses.indexOf(t.statuses.find((function(t){return t._id===e.payload._id}))),1,e.payload)},replaceCategory:function(t,e){t.categories.splice(t.categories.indexOf(t.categories.find((function(t){return t._id===e.payload._id}))),1,e.payload)}},extraReducers:Object(r.a)({},i.fulfilled,(function(t,e){var n=e.payload,r=n.statuses,a=n.categories,c=n.users;t.statuses=r,t.categories=a,t.users=c}))}),l=d.actions,b=l.openJobCardDialog,f=l.closeJobCardDialog,p=l.addStatus,j=l.addCategory,O=(l.replaceStatus,l.replaceCategory,l.removeStatus),x=l.removeCategory;e.d=d.reducer},1134:function(t,e,n){"use strict";n.d(e,"a",(function(){return l})),n.d(e,"d",(function(){return b})),n.d(e,"e",(function(){return h})),n.d(e,"h",(function(){return m})),n.d(e,"c",(function(){return v})),n.d(e,"f",(function(){return g})),n.d(e,"g",(function(){return y}));var r,a=n(22),c=n(18),s=n.n(c),u=n(35),o=n(24),i=n(75),d=n(1132),l=Object(o.b)("/tasks/jobs/createJob",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.post("job/create",e);case 2:return n=t.sent,t.next=5,n.data;case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),b=Object(o.b)("/tasks/jobs/getAllJobs",Object(u.a)(s.a.mark((function t(){var e,n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get("job/getAll");case 2:return e=t.sent,t.next=5,e.data;case 5:return n=t.sent,t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})))),f=Object(o.b)("/tasks/jobs/getJobsByBoard",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get("job/getByJobType/".concat(e));case 2:return n=t.sent,t.next=5,n.data;case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),p=Object(o.b)("/tasks/jobs/changeJobStatus",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r,a,c,u;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e._id,r=e.oldStatusId,a=e.newStatusId,t.next=3,i.a.put("job/changeStatus/".concat(n),{oldStatusId:r,newStatusId:a});case 3:return c=t.sent,t.next=6,c.data;case 6:return u=t.sent,t.abrupt("return",u);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),j=Object(o.b)("/tasks/jobs/changeJobCategory",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r,a,c,u;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e._id,r=e.oldCategoryId,a=e.newCategoryId,t.next=3,i.a.put("job/changeCategory/".concat(n),{oldCategoryId:r,newCategoryId:a});case 3:return c=t.sent,t.next=6,c.data;case 6:return u=t.sent,t.abrupt("return",u);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),O=Object(o.b)("/tasks/jobs/changeJobDueDate",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r,a,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e._id,r=e.newDueDate,t.next=3,i.a.put("job/changeDueDate/".concat(n),{newDueDate:r});case 3:return a=t.sent,t.next=6,a.data;case 6:return c=t.sent,t.abrupt("return",c);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),x=Object(o.b)("/tasks/jobs/changeJobUser",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r,a,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e._id,r=e.newUserId,t.next=3,i.a.put("job/changeUser/".concat(n),{newUserId:r});case 3:return a=t.sent,t.next=6,a.data;case 6:return c=t.sent,t.abrupt("return",c);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),h=Object(o.b)("/tasks/jobs/replaceJob",function(){var t=Object(u.a)(s.a.mark((function t(e){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",e);case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),m=Object(o.b)("/tasks/jobs/updateJob",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r,a,c,u,o;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e._id,r=e.title,a=e.description,c=e.columnType,t.next=3,i.a.put("job/update/".concat(n),{title:r,description:a,columnType:c});case 3:return u=t.sent,t.next=6,u.data;case 6:return(o=t.sent).job.title=r,o.job.description=a,t.abrupt("return",o);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),v=Object(o.b)("/tasks/jobs/deleteJob",function(){var t=Object(u.a)(s.a.mark((function t(e,n){var r,a,c,u,o;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n.dispatch,a=e._id,c=e.columnData,t.next=4,i.a.put("job/delete/".concat(a),c);case 4:return u=t.sent,t.next=7,u.data;case 7:return o=t.sent,r(Object(d.k)(o.boardColumns)),t.abrupt("return",o);case 10:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()),g=Object(o.b)("/tasks/jobs/replaceSomeJobs",function(){var t=Object(u.a)(s.a.mark((function t(e){return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(e),t.abrupt("return",e);case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),w=Object(o.c)({selectId:function(t){return t._id}}),y=w.getSelectors((function(t){return t.tasks.jobs})).selectAll,k=Object(o.d)({name:"tasks/jobs",initialState:w.getInitialState({}),reducers:{},extraReducers:(r={},Object(a.a)(r,l.fulfilled,w.addOne),Object(a.a)(r,f.fulfilled,w.setAll),Object(a.a)(r,b.fulfilled,w.setAll),Object(a.a)(r,p.fulfilled,w.upsertOne),Object(a.a)(r,j.fulfilled,w.upsertOne),Object(a.a)(r,O.fulfilled,w.upsertOne),Object(a.a)(r,x.fulfilled,w.upsertOne),Object(a.a)(r,h.fulfilled,w.setOne),Object(a.a)(r,g.fulfilled,w.setMany),Object(a.a)(r,m.fulfilled,(function(t,e){var n=e.payload.job;w.upsertOne(t,n)})),Object(a.a)(r,v.fulfilled,(function(t,e){var n=e.payload,r=n.jobId,a=n.job;r&&w.removeOne(t,r),a&&w.setOne(t,a)})),r)});e.b=k.reducer},1135:function(t,e,n){"use strict";n.d(e,"a",(function(){return d})),n.d(e,"d",(function(){return l})),n.d(e,"e",(function(){return b})),n.d(e,"c",(function(){return f})),n.d(e,"f",(function(){return j}));var r,a=n(22),c=n(18),s=n.n(c),u=n(35),o=n(24),i=n(75),d=Object(o.b)("/tasks/boards/create",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.post("board/create",e);case 2:return n=t.sent,t.next=5,n.data;case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),l=Object(o.b)("/tasks/boards/userId",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.get("board/getByUserId/".concat(e));case 2:return n=t.sent,t.next=5,n.data;case 5:return r=t.sent,t.abrupt("return",r);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),b=Object(o.b)("/tasks/boards/rename",function(){var t=Object(u.a)(s.a.mark((function t(e){var n,r,a,c;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.title,r=e._id,t.next=3,i.a.put("board/rename/".concat(r),{title:n});case 3:return a=t.sent,t.next=6,a.data;case 6:return(c=t.sent).title=n,t.abrupt("return",c);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),f=Object(o.b)("/tasks/boards/delete",function(){var t=Object(u.a)(s.a.mark((function t(e){var n;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,i.a.delete("board/delete/".concat(e));case 2:return n=t.sent,t.next=5,n.data;case 5:return t.sent,t.abrupt("return",e);case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),p=Object(o.c)({selectId:function(t){return t._id}}),j=p.getSelectors((function(t){return t.tasks.boards})).selectAll,O=Object(o.d)({name:"tasks/boards",initialState:p.getInitialState({}),reducers:{},extraReducers:(r={},Object(a.a)(r,d.fulfilled,p.addOne),Object(a.a)(r,l.fulfilled,p.setAll),Object(a.a)(r,b.fulfilled,p.upsertOne),Object(a.a)(r,f.fulfilled,p.removeOne),r)});e.b=O.reducer},1136:function(t,e,n){"use strict";n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return c})),n.d(e,"b",(function(){return s}));var r="status",a="category",c="user",s="dueDate"},1137:function(t,e,n){"use strict";var r=n(126),a=n(1134),c=n(1135),s=n(1132),u=n(1133),o=Object(r.c)({jobs:a.b,jobCardDialog:u.d,boards:c.b,boardColumns:s.b});e.a=o},1161:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n(400),c=n(549),s=n(299),u=n(12),o=n(10),i=n(42),d=n(5),l=n(416),b=n(30),f=n(169),p=n(579),j=n(129),O=n(550),x=n(135),h=n(136),m=n(1137),v=n(1135),g=n(1),w=Object(a.a)((function(t){return{root:{},board:{cursor:"pointer",transitionProperty:"box-shadow border-color",transitionDuration:t.transitions.duration.short,transitionTimingFunction:t.transitions.easing.easeInOut},newBoard:{}}}));var y=Object(x.a)("tasks",m.a)((function(t){var e=w(t),n={hidden:{opacity:0,y:20},show:{opacity:1,y:0}},a=Object(o.c)(),c=Object(i.g)(),s=Object(o.d)((function(t){return t.auth.user})),x=Object(o.d)(v.f),m=Object(r.useState)(!0),y=Object(u.a)(m,2),k=y[0],C=y[1];if(Object(r.useEffect)((function(){a(Object(v.d)(s.data._id)).then((function(){return C(!1)}))}),[a]),k)return Object(g.jsx)(h.a,{});var D=function(){a(Object(v.a)({title:"Untitled Board",user:s.data._id})).then((function(t){var e=t.payload;c.push("/tasks/boards/".concat(e._id))}))};return Object(g.jsx)("div",{className:Object(d.a)(e.root,"flex flex-grow flex-shrink-0 flex-col items-center"),children:Object(g.jsx)("div",{className:"flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24",children:Object(g.jsxs)(l.a.div,{variants:{show:{transition:{staggerChildren:.1}}},initial:"hidden",animate:"show",className:"flex flex-wrap w-full justify-center py-32 px-16",children:[x.length>0?x.map((function(t,r){return Object(g.jsx)(l.a.div,{variants:n,className:"w-224 h-224 p-16",children:Object(g.jsxs)(f.a,{to:"/tasks/boards/".concat(t._id),className:Object(d.a)(e.board,"flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg"),role:"button",component:b.a,children:[Object(g.jsx)(p.a,{className:"text-56",color:"action",children:"assessment"}),Object(g.jsx)(j.a,{className:"text-16 font-medium text-center pt-16 px-32",color:"inherit",children:Object(O.a)(t.title)})]})},r)})):Object(g.jsx)(g.Fragment,{}),Object(g.jsx)(l.a.div,{variants:n,className:"w-224 h-224 p-16",children:Object(g.jsxs)(f.a,{className:Object(d.a)(e.board,e.newBoard,"flex flex-col items-center justify-center w-full h-full rounded-16 py-24 shadow hover:shadow-lg outline-none"),onClick:D,onKeyDown:D,role:"button",tabIndex:0,children:[Object(g.jsx)(p.a,{className:"text-56",color:"secondary",children:"add_circle"}),Object(g.jsx)(j.a,{className:"text-16 font-medium text-center pt-16 px-32",color:"inherit",children:"Add new board"})]})})]})})})}));Object(a.a)((function(t){return{root:{},board:{cursor:"pointer",transitionProperty:"box-shadow border-color",transitionDuration:t.transitions.duration.short,transitionTimingFunction:t.transitions.easing.easeInOut},newBoard:{}}}));e.default=function(){return Object(g.jsx)(c.a,{header:Object(g.jsx)(s.a,{title:"Boards",breadCrumb:{pageName:"Dashboard",linkTo:"/dashboard"},icon:"assignment_turned_in"}),content:Object(g.jsx)(y,{})})}}}]);