const requiresLogin = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isLoggedIn = true;
    return next();
  }
  if (req.method === "POST") {
    if (!req.body.path) {
      req.session.returnTo = req.headers.referer;
      return res.redirect("/admin/login");
    }
    req.session.returnTo = req.body.path;
    res.locals.isLoggedIn = false;
    return res.redirect("/admin/login");
  } else {
    req.session.returnTo = req.originalUrl;
    req.body.path = undefined;
    res.locals.isLoggedIn = false;
    res.redirect("/admin/login");
  }
};

const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) return next();
  res.redirect("/admin");
};

module.exports = { requiresLogin, isLoggedIn };
