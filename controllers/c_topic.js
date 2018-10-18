const m_topic = require('../models/m_topic');
const moment = require('moment');
exports.showTopic = (req, res) => {
    m_topic.findAllTopic((err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错误'
            });
        }
        res.render('index.html', {
            topics: data,
            user: req.session.user
        });
    });
};
exports.createTopic = (req, res) => {
    res.render('topic/create.html');
};

exports.handleCreateTopic = (req, res) => {
    const body = req.body;
    body.createdAt = moment().format();
    body.userId = req.session.user.id;
    m_topic.addTopic(body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错误'
            });
        }
        res.send({
            code: 200,
            message: '发布新话题成功'
        });
    });
};

exports.showDetail = (req, res) => {
    const topicID = req.params.topicID;
    m_topic.findTopicByID(topicID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错误'
            });
        }
        res.render('topic/show.html', {
            topic: data[0],
            sessionUserId: req.session.user.id
        });
    });
};
//渲染话题编辑页面
exports.showEdit = (req, res) => {
    const topicID = req.params.topicID;
    const body = req.body;
    m_topic.findTopicByID(topicID, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: err.message
            })
        }
        res.render('topic/edit.html', {
            topic: data[0]
        });
    });
};
//处理编辑页面的表单请求
exports.handleEditTopic = (req, res) => {
    const body = req.body;
    const topicID = req.params.topicID;
    m_topic.updateTopicById(topicID, body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                message: '服务器错误'
            })
        }
        return res.send({
            code: 200,
            message: '编辑成功'
        })
    });
};
//删除话题
exports.deleteTopic = (req, res) => {
    const topicID = req.params.topicID;
    m_topic.deleteTopicById(topicID, (err, data) => {
        if(err){
            return res.send({
                code: 500,
                message: err.message
            });
        }
        return res.send({
            code: 200,
            message: '删除成功'
        });
    });
};