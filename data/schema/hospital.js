const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let hospital = mongoose.Schema({
  role:{type: String, default:'Admin'},
  username: { type: String },
  password:{ type: String },
  lab: ['Sublab'],
  pharm: ['Subpharm'],
  doctor:['Subdoctor']
});

hospital.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

hospital.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

hospital.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('Hospital', hospital);

