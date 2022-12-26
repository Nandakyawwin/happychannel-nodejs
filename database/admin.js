let db = require('./db');

let Admin = db.Admin;


let all_admin = () => {
    return new Promise((resolve, reject) => {
        Admin.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_admin = (adminObj) => {
    return new Promise((resolve, reject) => {
        adminObj['since'] = new Date();
        let admin = new Admin(adminObj);
        admin.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let update_admin = (adminObj) => {
    return new Promise((resolve, reject) => {
        if (error) {
            reject(error);
        } else {
            data.email = adminObj.email;
            data.name = adminObj.name;
            data.password = adminObj.password;

            data.save((error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        }
    })
};

let delete_admin = (adminObj_id) => {
    return new Promise((resolve, reject) => {
        Admin.deleteOne({ _id: adminObj_id }, (error, data) => {
            if (error) reject(error);
            resolve('Ok! Admin account is removed!');
        })
    })
}

let findByAdminname = (findemail) => {
    return new Promise((resolve, reject) => {
        Admin.findOne({ email: findemail }, (error, data) => {
            if (error) reject(error);
            resolve(data)
        })
    })
}












module.exports = {
    all_admin,
    save_admin,
    findByAdminname,
    update_admin,
    delete_admin
}