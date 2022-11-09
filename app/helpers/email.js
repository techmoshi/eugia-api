const nodemailer = require("nodemailer");
const { mailTemplates } = require("./constants");
const anyonecanapply = require("./mailTemplates/anyonecanapply");
const applyjob = require("./mailTemplates/applyjob");
const contactUs = require("./mailTemplates/contactUs");
const enquiry = require("./mailTemplates/enquiry");
const intern = require("./mailTemplates/intern");
const joinUs = require("./mailTemplates/joinUs");

const getNewTransportObject = () => {
  const smtpTransport = nodemailer.createTransport({
    host: "125.17.120.139",
    port: 25,
  });

  return smtpTransport;
};

const getEmailData = (data, template) => {
  let mailData = {
    from: `Eugia <${data.from}>`,
    to: data.to,
  };

  switch (template) {
    case mailTemplates.joinUs:
      mailData = {
        ...mailData,
        subject: "Investor join request",
        html: joinUs(data),
      };
      break;
    case mailTemplates.enquiry:
      mailData = {
        ...mailData,
        subject: "Enquiry request",
        html: enquiry(data),
      };
      break;
    case mailTemplates.contactUs:
      mailData = {
        ...mailData,
        subject: "Contact request",
        html: contactUs(data),
      };
      break;
    case mailTemplates.anyonecanapply:
      mailData = {
        ...mailData,
        subject: "Anyone can apply request",
        html: anyonecanapply(data),
        attachments: data.attachments,
      };
      break;
    case mailTemplates.intern:
      mailData = {
        ...mailData,
        subject: "Intern request",
        html: intern(data),
        attachments: data.attachments,
      };
      break;
    case mailTemplates.applyjob:
      mailData = {
        ...mailData,
        subject: "Apply job request",
        html: applyjob(data),
        attachments: data.attachments,
      };
      break;
    default:
      mailData;
  }

  return mailData;
};

const sendEmail = (data, template, cb) => {
  const smtpTransport = getNewTransportObject();

  const mail = getEmailData(data, template);

  smtpTransport.sendMail(mail, (err) => {
    if (err) {
      console.log(err);
      smtpTransport.close();
      if (cb) return cb(err);
    }
    console.log("sent");
    smtpTransport.close();
    if (cb) cb(null);
  });
};

const sendEmails = async (dataList, template, cb) => {
  const smtpTransport = getNewTransportObject();

  await Promise.all(
    dataList.map((data) => {
      const mail = getEmailData(data, template);
      console.log("Sent");
      return smtpTransport.sendMail(mail);
    })
  ).catch((err) => {
    console.log(err);
    smtpTransport.close();
    if (cb) return cb(err);
  });

  smtpTransport.close();
  if (cb) return cb(null);
};

const sendEmailWithAttachment = async (data, template, cb) => {
  const smtpTransport = getNewTransportObject();

  const mail = getEmailData(data, template);

  smtpTransport.sendMail(mail, (err) => {
    if (err) console.log(err);
    else console.log("sent");
    smtpTransport.close();
    if (cb) return cb();
  });
};

module.exports = { sendEmail, sendEmails, sendEmailWithAttachment };
