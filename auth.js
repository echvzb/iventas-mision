const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const { getUser, getUserLogin } = require("./db");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    const u = await getUser(id);
    done(null, u);
  });
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        const u = await getUserLogin(email);
        if (!u) return done(null, false);
        else if (password !== u.password) return done(null, false);
        return done(null, u);
      }
    )
  );
};
