//引入包
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'news51'
};

const sessionStore = new MySQLStore(options);
//app对象
const app = express();
//配置包
app.engine('html', require('express-art-template'));
app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
//配置express-mysql-session
app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
	store: sessionStore,
	resave: false,
	saveUninitialized: false
}));

app.use(router);
//绑定端口
app.listen(12346, () => {
    console.log('start at http://127.0.0.1/12346');
});
