const express = require("express");
const app = express();
const path = require('path');
const port = 8001;
const URL = require('./models/url');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const staticRoute = require('./routes/staticRouter')
app.use('/', staticRoute)

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

const { connectToDB } = require('./connection');
const urlRoute = require('./routes/url');

app.get('/', async (req,res) => {
  allUrl = await URL.find({});
  return res.render('home', {
    urls: allUrl,
    name: "Shikhar"
  });
})

app.use("/url", urlRoute);
app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, { $push: {
    visitHis: {
      timestamp: Date.now(),    }
  },});
  res.redirect(entry.redirectURL)
})

connectToDB('mongodb://127.0.0.1:27017/short-url').then(() => console.log('mongo connected'));
app.listen(port, () => console.log("server started"));