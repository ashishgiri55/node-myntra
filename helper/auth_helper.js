module.exports = {
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      } else {
        req.flash("errors_msg", "You are not Authorized!");
        res.redirect("/auth/login", 201, {});
      }
    },
  };