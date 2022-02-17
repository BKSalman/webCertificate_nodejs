const { Participant } = require("../models/Participant");
const { Admin } = require("../models/Admin");
const bcrypt = require("bcrypt");

const admin =  (req, res, next) => {
    Participant.find({}, (err, participants) => {
      if (err) {
        console.log(err);
      } else {
        res.render("admin", {
          title: "Admin",
          participants: participants,
          user: req.user,
        });
      }
    });
  }

const createAdmin = async (req, res, next) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username: username.toLowerCase(),
      password: hashedPassword,
    });
    admin.save()
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log("error");
        // throw err
      });
    res.redirect("/admin/login");
  }

const adminLoginForm = (req, res, next) => {
    res.render("adminLogin", {
      title: "Admin Login",
    });
}

module.exports = { admin, createAdmin, adminLoginForm };