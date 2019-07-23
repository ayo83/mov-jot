module.exports = {
  ensureAuthenticated: (req, res, next)=>{
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Not Authorized, please do Login or Register');
    res.redirect('/users/login');
  }
}