require('dotenv').config();

const express = require('express');
const liveReload = require('livereload');
const connectLivereload = require("connect-livereload");
const session = require('express-session');

const apiKeys = [
    'SYMteIEfrWMvg7Ac',
    'NqSRzkvlJR5jtxh7'
];

const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const liveReloadServer = liveReload.createServer();
liveReloadServer.watch(__dirname+"/public");
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

function error(status, msg) {
    var err = new Error(msg);
    err.status = status;
    return err;
  }

app.use(express.urlencoded({extended:false}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET || ""
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', function(req,res,next){
    let key = req.query['apiKeys'];
    if(!key) return next(error(400,'unauthorized'));
    if (!~apiKeys.indexOf(key)) return next(error(401, 'unauthorized'));
    req.key = key;
    next();
});
app.use(connectLivereload({
    port: 35729
}));

app.get('/api/')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});