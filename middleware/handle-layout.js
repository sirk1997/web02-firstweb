module.exports = (req, res, next) => {
    if (req.session.isLogged === undefined) {
      req.session.isLogged = false;
    }

    if (req.session.user === undefined) {
      req.session.user = null;
    }
  
    res.locals.layoutVM = {
      isLogged: req.session.isLogged,
      user: req.session.user,
    };
    next();
  };
  