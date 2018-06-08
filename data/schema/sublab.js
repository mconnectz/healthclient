const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let sublab = mongoose.Schema({
  role:{type: String, default:'Lab'},
  username: { type: String },
  password:{ type: String },
  phone:{type:String},
});

sublab.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

sublab.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

sublab.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Sublab', sublab);

