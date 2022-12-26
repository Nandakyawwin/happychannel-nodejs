let db = require('./db');

let User = db.User;

let all_users = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_user = (userObj) => {
    return new Promise((resolve, reject) => {
        userObj['since'] = new Date();
        let user = new User(userObj);
        user.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let delete_user = (userObj_id) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({ _id: userObj_id }, (error, data) => {
            if (error) reject(error);
            resolve('Deleted user..');
        })
    })
};

let update_user = (movieobj) => {
    return new Promise((resolve, reject) => {
        User.findById(userObj.id, (error, data) => {
            if (error) {
                reject(error);
            } else {
                data.email = userObj.email;
                data.name = userObj.name;
                data.image = userObj.image;
                data.password = userObj.password;
                data.save((error, data) => {
                    if (error) reject(error);
                    resolve(data);
                })
            }
        })
    })
};

let findUserbyemail = (email) => {
    return new Promise((resolve, reject) => {
        User.findOne({ emai: email }, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}






module.exports = {
    all_users,
    save_user,
    update_user,
    delete_user,
    findUserbyemail

}