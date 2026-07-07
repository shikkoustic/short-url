const { getUser } = require('../service/auth');

async function restrictLoggedInUser(req, res, next){
  const userUid = req.cookies.uid;

  if(!userId) return res.redirect("/login");
  const user = getUser(userUid);

  if(!user) return res.redirect('/login')
  req.user = user;
  next();
}