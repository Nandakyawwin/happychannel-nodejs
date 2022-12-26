let db = require('./db');

let Comment = db.Comment;

let all_comments = () => {
    return new Promise((resolve, reject) => {
        Comment.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_comment = (commentObj) => {
    return new Promise((resolve, reject) => {
        commentObj['since'] = new Date();
        let comment = new Comment(commentObj);
        comment.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let update_comment = (commentObj) => {
    return new Promise((resolve, reject) => {
        if (error) {
            reject(error);
        } else {
            data.value = commentObj.value;

            data.save((error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        }
    })
};

let delete_comment = (commentObj_id) => {
    return new Promise((resolve, reject) => {
        Comment.deleteOne({ _id: commentObj_id }, (error, data) => {
            if (error) reject(error);
            resolve('Comment deleted!!');
        })
    })
}

let findcomment = (commentObj) => {
    return new Promise((resolve, reject) => {
        Comment.findOne({ value: commentObj }, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

module.exports = {
    all_comments,
    save_comment,
    update_comment,
    findcomment,
    delete_comment
}