const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let subdoctor = mongoose.Schema({
  role:{type: String, default:'Doctor'},
  username: { type: String },
  password:{ type: String },
  photo:{type:String},
  phone:{type:String},
  patient: ['Patient'],
});

subdoctor.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

subdoctor.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

subdoctor.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Subdoctor', subdoctor);

