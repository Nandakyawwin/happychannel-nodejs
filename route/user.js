module.exports = (express) => {
    let router = express.Router();
    let bcrypt = require('../helper/pass');
    let Admin = require('../database/admin');
    let Movie = require('../database/movie');
    let Job = require('../database/job');
    let User = require('../database/user');
    let Ads = require('../database/ads'); b
    let jwt = require('jsonwebtoken'),
        passport = require('passport');

    router.post('/register', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        bcrypt.encrypt(password)
            .then(result => {
                let user = {
                    'email': email,
                    'name': name,
                    'password': result
                };
                User.save_user(user)
                    .then(usera => res.send({ con: true, msg: usera }))
                    .catch(err => res.send({ con: false, msg: err }));

            })
            .catch(err => res.send({ con: false, msg: err }));
    });

    router.post('/login', (req, res) => {

        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;

        User.findUserbyemail(email)
            .then(userE => {
                bcrypt.compare(password, useE.password)
                    .then(result => {
                        if (result) {
                            let payload = { email: userE.email, name: userE.name };
                            let token = jwt.sign(payload, process.env.SECRET);
                            res.send({ con: true, token: token });
                            res.send(result)
                        } else {
                            res.send('password wrong')
                        }
                    }).catch(err => res.send({ con: false, msg: err }));
            })
            .catch(err => res.send({ con: false, msg: err }));
    });

    router.get('/movie/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Movie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    router.get('/job/paginate/:start/:count', (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Job.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });


    router.get('/all/movies', (req, res) => {
        Movie.all_Movies()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    router.get('/all/job', (req, res) => {
        Job.all_Job()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    router.get('/all/ads', (req, res) => {
        Ads.all_ads()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });


    return router;

}