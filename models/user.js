const mongodb = require('mongoose');


const userSchema = mongodb.Schema({
  email: {
    type: String,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    minLength: 5
  }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
  if (plainPassword) return cb(null, true)
  else return cb('err: 비번이 없습니다')
}

const User = mongodb.model('User', userSchema);

module.exports = User;