var {Admin} = require('./../models/admin');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
    
//    console.log("req.header: ", req.header);
    
//    console.log("header-x-auth: ", token);

  Admin.findByToken(token).then((admin) => {
    if (!admin) {
      return Promise.reject();
    }
//    console.log("admin: ", admin);
//    console.log("token: ", token);
    req.admin = admin;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
