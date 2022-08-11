const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require('dotenv/config');


const app = express();
app.use(express.json());


const db = mysql.createConnection({
    user: process.env.DBUSER,
    host: process.env.DBHOST,
    password: process.env.DBPASSWORD,
    database: "wp149",
});

if (db) {
    console.log("Connected to DB")
}

// USER


app.get("/allPostsByID/:post_author", (req, res) => {
    const post_author = req.params.post_author

    db.query("SELECT wpgn_posts.ID, wpgn_posts.post_author, wpgn_posts.post_date_gmt, wpgn_posts.post_content, wpgn_posts.post_title, wpgn_posts.post_excerpt, wpgn_posts.post_status, wpgn_posts.post_name, wpgn_posts.post_type, wpgn_users.ID, wpgn_users.display_name, wpgn_users.user_nicename FROM wpgn_posts INNER JOIN wpgn_users ON wpgn_posts.post_author = wpgn_users.ID WHERE post_author = ? AND post_type= 'post' AND post_status = 'publish'",
        post_author
        , (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.get("/allPosts", (req, res) => {
    const post_author = req.params.post_author

    db.query("SELECT wpgn_posts.ID, wpgn_posts.post_author, wpgn_posts.post_date_gmt, wpgn_posts.post_content, wpgn_posts.post_title, wpgn_posts.post_excerpt, wpgn_posts.post_status, wpgn_posts.post_name, wpgn_posts.post_type, wpgn_users.ID, wpgn_users.display_name, wpgn_users.user_nicename FROM wpgn_posts INNER JOIN wpgn_users ON wpgn_posts.post_author = wpgn_users.ID WHERE post_type= 'post' AND post_status = 'publish'",
        post_author
        , (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});

app.get("/allPostsByID/:id", (req, res) => {
    const id = req.params.id

    db.query("SELECT wpgn_posts.ID, wpgn_posts.post_author, wpgn_posts.post_date_gmt, wpgn_posts.post_content, wpgn_posts.post_title, wpgn_posts.post_excerpt, wpgn_posts.post_status, wpgn_posts.post_name, wpgn_posts.post_type, wpgn_users.ID, wpgn_users.display_name, wpgn_users.user_nicename FROM wpgn_posts INNER JOIN wpgn_users ON wpgn_posts.post_author = wpgn_users.ID WHERE ID = ? AND post_type= 'post' AND post_status = 'publish'",
        id
        , (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
});


app.get("/", (req, res) => {

    db.query("SELECT * FROM wpgn_posts",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Hello World, it is working");
            }
        });
});





app.listen(3000, () => {
    console.log("Yey, your server is running on port 3000");
});



