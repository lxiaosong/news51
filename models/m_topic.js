const db = require('../tools/db_config');
exports.findAllTopic = (callback) => {
    const sqlstr = 'SELECT * FROM `topics` ORDER BY `createdAt` DESC';
    db.query(sqlstr, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
};
exports.addTopic = (body, callback) => {
    const sqlstr = 'INSERT INTO `topics` SET ?';
    db.query(sqlstr, body, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
};
exports.findTopicByID = (topicID, callback) => {
    const sqlstr = 'SELECT * FROM `topics` WHERE id = ?';
    db.query(sqlstr, topicID, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
}
//修改话题
exports.updateTopicById = (topicID, body, callback) => {
    const sqlstr = 'UPDATE `topics` SET `title` = ? , `content` = ? WHERE `id` = ?';
    db.query(sqlstr, [body.title, body.content, topicID], (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    });
};
//删除话题
exports.deleteTopicById = (topicID,callback)=>{
    const sqlstr = 'DELETE FROM `topics` WHERE `id` = ?';
    db.query(sqlstr, topicID, (err,data)=>{
        if(err){
            return callback(err);
        }
        callback(null,data);
    });
};