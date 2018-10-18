const db = require('../tools/db_config');
// 1 验证邮箱
const checkEmail = function (email, callback) {
    const sqlstr = 'SELECT * FROM `users` WHERE email = ?';
    db.query(sqlstr, email, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
};
exports.checkEmail = checkEmail;
//验证昵称
exports.checkNickname = (nickname, callback) => {
    const sqlstr = 'SELECT * FROM `users` WHERE nickname = ?';
    db.query(sqlstr, nickname, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
};
//添加新用户
exports.addUser = (body, callback) => {
    const sqlstr = 'INSERT INTO `users` SET ?';
    db.query(sqlstr, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
};