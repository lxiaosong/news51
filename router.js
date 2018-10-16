const express = require('express');
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');
const router = express.Router();
router
    .get('/signin', c_user.showSignin)
    .post('/signin', c_user.handleSignin)
    .get('/', c_topic.showTopic)
    .get('/topic/create', c_topic.createTopic)
    .post('/createTopic', c_topic.handleCreateTopic)
    .get('/signout', c_user.handleSignout)
    .get('/topic/:topicID',c_topic.showDetail);


module.exports = router;