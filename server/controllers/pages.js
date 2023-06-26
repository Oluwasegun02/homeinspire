export const homePage = (req, res) => {
  const token = req.session.token;
  const user = req.session.user;
//   const errors = req.flash("error");
  res.render("home", { title: "Home Inspire", token, user });
};
export const errorPage = (req, res) => {
  const token = req.session.token;
  const user = req.session.user;
//   const errors = req.flash("error");
  res.render("error", { title: "Error", token, user });
};

export const authPage = (req, res) => {
  // const token = req.session.token;
  const errors = req.flash("error");
  const formData = req.flash("formData")[0];
  const success_msg = req.flash("success_msg");
  res.render("auth", { title: "Auth", errors, success_msg, formData});
};

export const detailsPage = (req, res) => {
  const user = req.session.user;
  const token = req.session.token;
//   const errors = req.flash("error");
  res.render("details-page", { title: "House Details", token, user });
};