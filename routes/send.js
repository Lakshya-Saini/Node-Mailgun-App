const MAILGUN = require("mailgun-js");
const express = require("express");
const config = require("../config/key");
const router = express.Router();

const mailgun = MAILGUN({
  apiKey: config.SECRET,
  domain: config.DOMAIN,
});

router.post("/", (req, res) => {
  const { senderEmail, receiverEmail, subject, message } = req.body;

  if (
    senderEmail === "" ||
    receiverEmail === "" ||
    subject === "" ||
    message === ""
  ) {
    req.flash("error_msg", "All fields are required.");
    res.redirect("/");
  }

  if (senderEmail === receiverEmail) {
    req.flash("error_msg", "Sender & Receiver email should not be same.");
    res.redirect("/");
  }

  const data = {
    from: senderEmail,
    to: receiverEmail,
    subject: subject,
    text: message,
  };

  mailgun.messages().send(data, (err, body) => {
    if (err) {
      req.flash(
        "error_msg",
        "Error in sending email. Check your API credentials."
      );
      res.redirect("/");
    }
    req.flash("success_msg", "Email sent...");
    res.redirect("/");
  });
});

module.exports = router;
