const sessionidTouserMap = new Map();

function setUser(id, user){
  sessionidTouserMap.set(id, user);
}

function getUser(id){
  return sessionidTouserMap.get(id);
}

module.exports = {
  setUser, getUser, 
}