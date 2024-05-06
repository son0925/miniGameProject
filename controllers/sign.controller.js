

function getSignInPage (req, res) {
  res.render('signin')
}

function getSignUpPage (req, res) {
  res.render('signup')
}



module.exports = {
  getSignInPage,
  getSignUpPage
}