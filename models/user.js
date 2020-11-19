const mongoose = require('mongoose');
const adduser = mongoose.Schema({
    username : { type : String }
})
let user = mongoose.model('user',adduser);
module.exports = user;