const express = require("express");
const app = express();
const path = require('path');
const port = 8001;
const URL = require('./models/url');
const cookieParser = require('cookie-parser')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const { restrictLoggedInUser, checkAuth } = require('./middlewares/auth')

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

app.use('/', checkAuth, staticRoute);
app.use("/url", restrictLoggedInUser, urlRoute);
app.use("/user", userRoute);

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

const { connectToDB } = require('./connection');

app.get('/', async (req,res) => {
  allUrl = await URL.find({});
  return res.render('home', {
    urls: allUrl,
    name: "Shikhar"
  });
})

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, { $push: {
    visitHis: {
      timestamp: Date.now(), }
  },});
  res.redirect(entry.redirectURL)
})

connectToDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log('mongo connected'));
app.listen(port, () => console.log("server started"));