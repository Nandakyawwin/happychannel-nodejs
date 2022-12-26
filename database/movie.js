let db = require('./db');

let Movie = db.Movie;

let all_Movies = () => {
    return new Promise((resolve, reject) => {
        Movie.find({}, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
};

let save_Movie = (movieObj) => {
    return new Promise((resolve, reject) => {
        movieObj['since'] = new Date();
        let movie = new Movie(movieObj);
        movie.save((err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    })
};

let update = (movieobj) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({ name: movieobj_id }, (error, data) => {
            if (error) {
                reject(error);
            } else {
                data.name = movieobj.name;
                data.image = movieobj.image;
                data.Duration = movieobj.Duration;
                data.rating = movieobj.rating;
                data.creater = movieobj.creater;
                data.discription = movieobj.discription;
                data.series = movieobj.series;
                data.trailer = movieobj.trailer;
                data.Network = movieobj.Network;
                data.age_rating = movieobj.age_rating;
                data.weekly_download = movieobj.weekly_download;
                data.download1 = movieobj.download1;
                data.download2 = movieobj.download2;
                data.download3 = movieobj.download3;
                data.download4 = movieobj.download4;
                data.download5 = movieobj.download5;

                data.save((err, res) => {
                    if (err) reject(err);
                    resolve(res);
                })
            }
        })
    })
};

let destroy = (movieobj_id) => {
    return new Promise((resolve, reject) => {
        Movie.deleteOne({ name: movieobj_id }, (error, data) => {
            if (error) reject(error);
            resolve('Deleted.')
        })
    })
}

let paginate = (start, count) => {
    let paginateObj = {
        sort: { _id: 1 },
        lean: true,
        page: start,
        limit: count
    };
    console.log(`Start ${start} and Count is ${count}`);
    return new Promise((resolve, reject) => {
        Movie.paginate({}, paginateObj, (error, data) => {
            if (error) reject(error);
            resolve(data);
        })
    })
}

let findMovie = (movieName) => {
    return new Promise((resolve, reject) => {
        Movie.findOne({ name: movieName }, (error, data) => {
            if (data == null) {
                reject(`Movie not found! ${error}`);
            } else {
                resolve(data);
            }
        })
    })
}
module.exports = {
    all_Movies,
    save_Movie,
    update,
    destroy,
    paginate,
    findMovie
}



// let edit_movieName = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve()
//         })
//     })
// };

// let edit_movieImage = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.image = movieobj.image);
//         })
//     })
// };

// let edit_Duration = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.Duration = movieobj.Duration);
//         })
//     })
// };

// let edit_rating = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.rating = movieobj.rating);
//         })
//     })
// };

// let creater = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.creater = movieobj.creater);
//         })
//     })
// };

// let discription = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.discription = movieobj.discription);
//         })
//     })
// };

// let series = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.series, (error, data) => {
//             if (error) reject(error);
//             resolve(data.series = movieobj.series);
//         })
//     })
// };

// let trailer = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.trailer = movieobj.trailer);
//         })
//     })
// };

// let network = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error)
//             resolve(data.network = movieobj.network);
//         })
//     })
// };

// let age_rating = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.age_rating = movieobj.age_rating);
//         })
//     })
// };

// let weekly_download = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.weekly_download = movieobj.weekly_download);
//         })
//     })
// };

// let download1 = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.download1 = movieobj.download1);
//         })
//     })
// };
// let download2 = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.download2 = movieobj.download2);
//         })
//     })
// };
// let download3 = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.download3 = movieobj.download3);
//         })
//     })
// };
// let download4 = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.download4 = movieobj.download4);
//         })
//     })
// };
// let download5 = (movieobj) => {
//     return new Promise((resolve, reject) => {
//         Movie.findById(movieobj.id, (error, data) => {
//             if (error) reject(error);
//             resolve(data.download5 = movieobj.download5);
//         })
//     })
// };