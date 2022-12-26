require('dotenv').config();
let express = require('express'),
    app = express(),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    Admin = require('./database/admin'),
    User = require('./database/user');

let jwtOption = {};

jwtOption.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOption.secretOrKey = process.env.SECRET;

let myS = new JwtStrategy(jwtOption, (payload, done) => {
    let email = payload.email;
    let name = payload.name;
    Admin.findByAdminname(email)
        .then(admin => {
            if (admin.name == name) {
                done(null, admin);
            }
        })
        .catch(err => done(err, null));
})

let userRoute = require('./route/user')(express, jwt, bodyParser);
let adminRoute = require('./route/admin')(express, jwt, passport, bodyParser);
let guestRoute = require('./route/guest')(express, bodyParser);
let path = require('path');

passport.use(myS);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './assets')));

app.use('/user', userRoute);
app.use('/admin', adminRoute);
app.use('/', guestRoute);
let admin = require('./database/admin');


// let adminObj = {
//     email: 'nanda@gmail.com',
//     password: '124123',
//     image: 'admin001.png'
// }

// admin.all_admin()
//     .then(res => console.log(res))
//     .catch(err => console.log(err));


// admin.findByAdminname('koko@gmail.com')
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// // let movieObj = {
//     id: '63a493f25109743e7d6c604e',
//     name: 'Xnxx-Japanese-movie',
//     image: 'happychannel.org/3/kingdom/poster3',
//     Duration: '53min',
//     rating: 4.3,
//     creater: 'Nanda Kyaw Win',
//     discription: 'dsflksdjf;sdfjkl',
//     series: null,
//     trailer: 'happychannel.org/3/kingdom/trao;er',
//     Network: 'Netflix',
//     age_rating: 4.3,
//     weekly_download: 1112,
//     download1: ';sdfsdfsf',
//     download2: 'eeedwww213wwww',
//     download3: 'dwerwrwrdfsdf',
//     download4: 'dsfsfljfsd',
//     download5: 'ddddwwwwwwwwwww'
// }

// let id = {
//     _id: '63a493f25109743e7d6c604e',


// movie.findMovie('dd')
//     .then(res => console.log(res))
//     .catch(err => console.log(err));


// console.log(movieObj)
// movie.save_Movie(movieObj)
//     .then(result => console.log(result))
//     .catch(error => console.log(error))


// movie.save_Movie(movieObj)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))
// movie.all_Movies()
//     .then(res => console.log(res))
//     .catch(err => console.log(err))


// movie.update(movieObj)
//     .then(res => console.log(res))
//     .catch(err => console.log(err));


app.listen(process.env.PORT, _ => {
    console.log(`Server is running at ${process.env.PORT}`);
});