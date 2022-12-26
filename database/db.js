const mongoose = require('mongoose')
paginate = require('mongoose-paginate');
let url = 'mongodb://127.0.0.1:27017/happychannelDatabase';
const connect = mongoose.connect(url, { useNewUrlParser: true });
mongoose.set('strictQuery', true);

let Schema = mongoose.Schema;

// let user;
// let admin;
// let job;
// let comment;
// let ads;

let MovieScheme = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    Duration: { type: String, required: true },
    rating: { type: Number, required: true },
    creater: { type: String },
    discription: { type: String, required: true },
    series: { type: Number },
    trailer: { type: String, required: true },
    Network: { type: String, required: true },
    age_rating: { type: Number, required: true },
    weekly_download: { type: Number, required: true },
    cast: { type: String },
    download1: { type: String, required: true },
    download2: { type: String, required: true },
    download3: { type: String, required: true },
    download4: { type: String, required: true },
    download5: { type: String, required: true },
    download6: { type: String },
    download7: { type: String },
    download8: { type: String },
    download9: { type: String },
    download10: { type: String },
    since: { type: Date, required: true },

});

let UserScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String },
    password: { type: String, required: true },
    since: { type: Date, required: true }

});
let AdminScheme = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    since: { type: Date, required: true },

});

let VvipScheme = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    since: { type: Date, required: true },

});
let commentScheme = new Schema({
    value: { type: String, required: true },
    since: { type: Date, required: true }
});

let adsScheme = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    since: { type: Date, required: true }
})

let jobScheme = new Schema({
    discription: { type: String, required: true },
    name: { type: String, required: true },
    since: { type: Date, required: true }
})

MovieScheme.plugin(paginate);
let Movie = mongoose.model('movie', MovieScheme);
UserScheme.plugin(paginate);
let User = mongoose.model('user', UserScheme);
AdminScheme.plugin(paginate);
let Admin = mongoose.model('admin', AdminScheme);
VvipScheme.plugin(paginate);
let Vvip = mongoose.model('vvip', VvipScheme);
jobScheme.plugin(paginate);
let Job = mongoose.model('job', jobScheme);
let Comment = mongoose.model('comment', commentScheme);
let Ads = mongoose.model('ads', adsScheme);


module.exports = {
    Movie,
    User,
    Admin,
    Vvip,
    Comment,
    Ads,
    Job
}