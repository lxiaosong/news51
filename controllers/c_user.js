const m_user = require('../models/m_user');
const showSignin = (req, res) => {
    res.render('signin.html');
};
const handleSignin = (req, res) => {
    const body = req.body;
    // 调用Models中验证邮箱的方法
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错误'
            });
        }
        if (!data[0]) {
            return res.send({
                code: 1,
                message: '邮箱不存在'
            });
        }
        if (body.password != data[0].password) {
            return res.send({
                code: 2,
                message: '密码错误'
            });
        }
        req.session.user = data[0];
        res.send({
            code: 200,
            message: '可以跳转了'
        });
    });
};
const handleSignout = (req, res) => {
    delete req.session.user;
    res.redirect('/signin');
};

exports.showSignin = showSignin;
exports.handleSignin = handleSignin;
exports.handleSignout = handleSignout;

exports.showSignup = (req, res) => {
    res.render('signup.html');
};

exports.handleSignup = (req, res) => {
    const body = req.body;
    m_user.checkEmail(body.email, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            });
        }
        if (data[0]) {
            return res.send({
                code: 1,
                message: '邮箱已存在'
            });
        }
        //验证昵称是否存在
        m_user.checkNickname(body.nickname, (err, data) => {
            if (err) {
                return res.send({
                    code: 500,
                    message: err.message
                })
            }
            if (data[0]) {
                return res.send({
                    code: 2,
                    message: '昵称已存在'
                });
            }
            //添加用户到数据库
            m_user.addUser(body, (err, data) => {
                if (err) {
                    return res.send({
                        code: 500,
                        message: err.message
                    });
                }
                res.send({
                    code: 200,
                    message: '注册成功'
                })
            });
        });
    });
};