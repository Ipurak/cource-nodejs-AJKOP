- login page

- create module 
	in route
- binding module
	//add this code below in app.js 
	var user = require('./routes/user');
	app.use('/user', user); // '/user' can set any name such as '/uuuu' URL:http://localhost:3000/uuuu 

- session
npm install express-session //installing

-session-file-store//this will help when modify code then keep session
npm install session-file-store

-reportting
npm install print-js --save//install
printjs.crabbly.com