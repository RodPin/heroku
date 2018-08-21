const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  //parece parecido com o app.get de cima mas é assim mesmo a diferença e que nesse tem codigo no url que faz com que o google reconheca q ele nao esta logando pela primeira vez e sim pedindo pra ele cuidar do login
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send(req.user);
  });
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
