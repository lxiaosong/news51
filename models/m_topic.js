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