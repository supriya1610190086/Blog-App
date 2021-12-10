const db = require("../create_database")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        user: "root",
        password: "Nav@gur1",
        database: "userdetail",
    },
});
create_User = (req, res) => {
    const user = req.body;
    bcrypt.hash(user.password, 10).then((hash) => {
        knex("registration").insert({
                email: user.email,
                password: hash,
            })
            .then((result) => {
                res.send({ sucess: result })
            })
            .catch((err) => {
                if (err) {
                    console.log(err);
                    res.status(400).send({ error: err })
                }
            })
    })
}
login_User = (req, res) => {
    const user = req.body;
    knex.from("registration").select("*").where("email", user.email)
        .then((data) => {
            if (data.length > 0) {
                for (d of data)
                    userPassword = d['password']
                const verified = bcrypt.compareSync(user.password, userPassword.toString());
                if (verified) {
                    jwt.sign({ email: user.email }, "thisissecretkey", (err, token) => {
                        if (token) {
                            res.json({ message: "Loged in", token: token })
                        }
                    })
                } else {
                    res.send("password is not correct")
                }
            } else {
                res.status(403).send("user doen't exists")
            }
        })
}
verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        var decoded = jwt.decode(bearerToken);
        req.data = decoded
        next();
    } else {
        res.status(403).send("user is not authenticated")
    }
}
create_Posts = (req, res) => {
    newdata = req.body
    jwt.verify(req.token, 'thisissecretkey', (err, authData) => {
        if (authData) {
            knex("postData").insert({
                    user_email: req.data.email,
                    title: newdata.title,
                    text: newdata.text
                })
                .then((result) => {
                    console.log(result);
                    res.send({ sucess: "your posts is succesfuly inserted." })
                })
                .catch((err) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ error: err })
                    }
                })

        } else {
            console.log(err);
        }
    })

}
get_All_Posts = (req, res) => {
    knex.from('postData').select("*")
        .then((rows) => {
            res.send(rows)

        })
}
get_Likes_Dislikes_By_Id = (req, res) => {
    knex('options').select("user_email", "likes", "dislikes").where('post_id', req.params.post_id)
        .then((rows) => {
            if (rows.length > 0) {
                likes = 0
                dislikes = 0
                for (i of rows) {
                    likes += i['likes']
                    dislikes += i['dislikes']
                }
                res.send({ likes: likes, dislikes: dislikes, rows })
            } else {
                res.status(403).send(`post with the ${req.params.post_id} id is not exists`)
            }
        })
}
likes_dislikes = (req, res) => {
    knex.from('postData').select('title').where('post_id', req.body.post_id).then((info) => {
        if (info.length == 0) {
            res.status(403).send("post is not found")
        } else {
            jwt.verify(req.token, 'thisissecretkey', (err, authData) => {
                if (authData) {
                    knex("options").select("*").where({ post_id: req.body.post_id, user_email: req.data.email })
                        .then((result) => {
                            console.log(result);
                            if (result.length > 0) {
                                res.send('u have already liked/dislike post')
                            } else {
                                knex('options').insert({ post_id: req.body.post_id, user_email: req.data.email, likes: req.body.likes, dislikes: req.body.dislikes })
                                    .then((result) => {
                                        res.send({ sucess: "added" })
                                    })
                                    .catch((err) => {
                                        if (err) throw err;
                                        res.status(403).send({ error: err });
                                    })
                            }
                        })
                } else {
                    res.status(403).send("user is not authenticated")
                }
            })
        }
    })
}
get_All_Likes_Dislike = (req, res) => {
    knex('postData').innerJoin('options', 'postData.post_id', '=', 'options.post_id').select('postData.title', 'options.likes', 'options.dislikes', 'options.user_email')
        .then((rows) => {
            res.send(rows)
        }).catch((err) => {
            if (err)
                res.status(403).send(`post with the ${req.params.post_id} id is not exists`)
        })
}
module.exports = {
    create_User,
    login_User,
    verifyToken,
    create_Posts,
    get_All_Posts,
    likes_dislikes,
    get_All_Likes_Dislike,
    get_Likes_Dislikes_By_Id

}