const express = require('express');
const bodyParser = require('body-parser');
//import cors kuno 2/27
const cors = require('cors');

const app = express();

//bodyparser 2/27
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,x-Requested-with, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next();
})

//cors 2/27

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/posts',(req, res, next)=>{
    const posts = [
        {
            id : 'jaegai287ag',
            title: 'from server-side-post',
            content: 'coming from server side'
        },
        {
            id: 'ual8i3yauau',
            title: 'second from server-side post',
            content: 'second coming from server side'
        }
    ];

  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;