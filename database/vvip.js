let db = require('./db');

let Vvip = db.Vvip;

let all_vvip = () => {
    return new Promise((resolve, reject) => {
        Vvip.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_vvip = (vvipObj) => {
    return new Promise((resolve, reject) => {
        vvipObj['since'] = new Date();
        let vvip = new Vvip(vvipObj);
        vvip.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let update_vvip = (vvipObj) => {
    return new Promise((resolve, reject) => {
        if (error) {
            reject(error);
        } else {
            data.email = vvipObj.email;
            data.password = vvipObj.password;
            data.image = vvipObj.image;

            data.save((error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        }
    })
};

let delete_vvip = (vvipobj_id) => {
    return new Promise((resolve, reject) => {
        Vvip.deleteOne({ _id: vvipobj_id }, (error, data) => {
            if (error) reject(error);
            resolve('Ok! VVIP account has been removed!');
        })
    })
};

let findVVIP = (findemail) => {
    return new Promise((resolve, reject) => {
        Vvip.findOne({ email: findemail }, (error, data) => {
            if (error) reject(error);
            resolve(data)
        })
    })
}

module.exports = {
    all_vvip,
    save_vvip,
    update_vvip,
    delete_vvip,
    findVVIP
}