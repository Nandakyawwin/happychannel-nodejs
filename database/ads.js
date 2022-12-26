let db = require('./db');

let Ads = db.Ads;

let all_ads = () => {
    return new Promise((resolve, reject) => {
        Ads.find({}, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let save_ads = (adsObj) => {
    return new Promise((resolve, reject) => {
        adsObj['since'] = new Date();
        let ads = new Vvip(adsObj);
        ads.save((error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
};

let update_ads = (vvipObj) => {
    return new Promise((resolve, reject) => {
        if (error) {
            reject(error);
        } else {
            data.image = vvipObj.image;
            data.save((error, data) => {
                if (error) reject(error);
                resolve(data);
            })
        }
    })
};

let delete_ads = (ads_id) => {
    return new Promise((resolve, reject) => {
        Vvip.deleteOne({ _id: ads_id }, (error, data) => {
            if (error) reject(error);
            resolve('Ok!Ads has been removed!');
        })
    })
};

let find_ads = (ads_img) => {
    return new Promise((resolve, reject) => {
        Ads.findOne({ image: ads_img }, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

module.exports = {
    all_ads,
    save_ads,
    find_ads,
    update_ads,
    delete_ads
}