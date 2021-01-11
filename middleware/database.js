var mongoose = require('mongoose');

//===== db connection =====

//Thiết lập một kết nối mongoose mặc định
var mongoDB =  process.env.MONGOURLocal || 'mongodb+srv://hung:hung123@cluster0.upovm.mongodb.net/Booking';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, 
  useFindAndModify: false
  // autoIndex: false, // Don't build indexes
  // poolSize: 10, // Maintain up to 10 socket connections
  // serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
  // useMongoClient: true
};


mongoose.connect(mongoDB, options).then(
  () => { 
      console.log("connect mongodb success!")
   },
  err => { 
    console.log("connect mongodb fail!", err)
   }
);

module.exports = mongoose