// user.js

function User(id, username, password, email, birthday) {
  this.id = id;
  this.username = username;
  this.password = password;
  this.email = email;
  this.birthday = birthday;
}

module.exports = User;
