let multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})
var upload = multer({ storage: storage });
let bcrypt = require('../helper/pass');
let Admin = require('../database/admin');
let Movie = require('../database/movie');
let Job = require('../database/job');
let User = require('../database/user');
let Ads = require('../database/ads');
module.exports = (express, bodyParser) => {
    let router = express.Router();
    let jwt = require('jsonwebtoken'),
        passport = require('passport');

    router.get('/home', passport.authenticate('jwt', { session: false }), (req, res) => {
        res.send('Admin dashboard');
    });

    router.post('/login', (req, res) => {

        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;

        Admin.findByAdminname(email)
            .then(admin => {
                bcrypt.compare(password, admin.password)
                    .then(result => {
                        if (result) {
                            let payload = { email: admin.email, name: admin.name };
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

    router.post('/post/movie', passport.authenticate('jwt', { session: false }), upload.single('image'), (req, res, next) => {
        let movieobj = {
            name: req.body.name,
            image: req.file.filename,
            Duration: req.body.Duration,
            rating: req.body.rating,
            creater: req.body.creater,
            discription: req.body.discription,
            series: req.body.series,
            trailer: req.body.trailer,
            Network: req.body.Network,
            age_rating: req.body.age_rating,
            weekly_download: req.body.weekly_download,
            cast: req.body.cast,
            download1: req.body.download1,
            download2: req.body.download2,
            download3: req.body.download3,
            download4: req.body.download4,
            download5: req.body.download5,
            download6: req.body.download6,
            download7: req.body.download7,
            download8: req.body.download8,
            download9: req.body.download9,
            download10: req.body.download10,

        };
        Movie.save_Movie(movieobj)
            .then(result => res.json({ con: true, msg: movieobj }))
            .catch(err => res.json({ con: false, msg: err }));
    })

    router.post('/post/job', passport.authenticate('jwt', { session: false }), (req, res) => {
        let jobObj = {
            name: req.body.name,
            discription: req.body.discription

        };
        Job.save_Job(jobObj)
        then(result => res.json({ con: true, msg: jobObj }))
            .catch(err => res.json({ con: false, msg: err }));

    });


    router.post('/post/ads', passport.authenticate('jwt', { session: false }), (req, res) => {
        let ads = {
            name: req.body.name,
            discription: req.body.discription

        };
        Ads.save_ads(ads)
        then(result => res.json({ con: true, msg: ads }))
            .catch(err => res.json({ con: false, msg: err }));

    });

    router.post('/register', (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;
        bcrypt.encrypt(password)
            .then(result => {
                let adminobj = {
                    'email': email,
                    'name': name,
                    'password': result
                };
                Admin.save_admin(adminobj)
                    .then(admin => res.send({ con: true, msg: admin }))
                    .catch(err => res.send({ con: false, msg: err }));

            })
            .catch(err => res.send({ con: false, msg: err }));
    });


    router.get('/movie/paginate/:start/:count', passport.authenticate('jwt', { session: false }), (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Movie.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    router.get('/job/paginate/:start/:count', passport.authenticate('jwt', { session: false }), (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        Job.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    });

    router.get('/user/paginate/:start/:count', passport.authenticate('jwt', { session: false }), (req, res) => {
        let start = req.param('start');
        let count = req.param('count');

        User.paginate(Number(start), Number(count))
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));
    })


    router.get('/all/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
        Movie.all_Movies()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    router.get('/all/user', passport.authenticate('jwt', { session: false }), (req, res) => {
        User.all_users()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    router.get('/all/job', passport.authenticate('jwt', { session: false }), (req, res) => {
        Job.all_Job()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });
    router.get('/all/ads', passport.authenticate('jwt', { session: false }), (req, res) => {
        Ads.all_ads()
            .then(result => res.send({ con: true, msg: result }))
            .catch(err => res.send({ con: false, msg: err }));

    });

    return router;

}