var mongoose    = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/FaveU');

var option = { user: 'yenuser', pass: 'Myjesus9191!@' };
//var uri = 'mongodb://54.212.247.86:27017/FaveU';
var uri = 'mongodb://54.149.1.134:27017/Yen';
mongoose.Promise = global.Promise;
mongoose.connect(uri, option);

// module.exports = {
//   mongoose: mongoose
// };

module.exports = {mongoose};
