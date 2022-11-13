import sgMail from "@sendgrid/mail";
import "dotenv/config";
import { Router } from "express";

export const emailsRouter = Router();

emailsRouter.get("/", (req, res) => {
  res.send({
    inviteEmail: "POST /emails/alert/:receipientsEmail",
    customEmail: "POST /emails/custom/:receipientsEmail",
  });
});

/**
 * Send a dynamic template from Sendgrid to specified email address.
 */
emailsRouter.post("/alert/:receipientsEmail", (req, res) => {
  const receiptient = req.params.receipientsEmail;
  // Validate the email
  if (!isEmailValid(receiptient)) {
    res.status(400).send({
      timestamp: new Date().toISOString(),
      status: 400,
      error: "Bad Request",
      message: "Validation failed for the provided email",
      path: "/emails/invite/:receipientsEmail",
    });
    return;
  }

  // Send the actual email
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: receiptient,
    from: process.env.SENDGRID_FROM_DOMAIN,
    templateId: process.env.SENDGRID_ALERT_TEMPLATE_ID,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
    })
    .catch((error) => {
      console.error(error);

      console.error(error.response.body);
    });

  res.status(202).send({
    message: "Sending an email with your custom content",
  });
});

/**
 * Send an email with specified subject and body to the given email address.
 */
emailsRouter.post("/custom/:receipientsEmail", (req, res) => {
  const receiptient = req.params.receipientsEmail;
  const subject = req.body.subject;
  const body = req.body.body;

  // Validate the email
  if (!isEmailValid(receiptient)) {
    res.status(400).send({
      timestamp: new Date().toISOString(),
      status: 400,
      error: "Bad Request",
      message: "Validation failed for the provided email",
      path: "/emails/custom/:receipientsEmail",
    });
    return;
  }

  if (subject === undefined) {
    res.status(400).send({
      timestamp: new Date().toISOString(),
      status: 400,
      error: "Bad Request",
      message: "Request body json needs to contain a subject field (string)",
      path: "/emails/custom/:receipientsEmail",
    });
    return;
  }

  if (body === undefined) {
    res.status(400).send({
      timestamp: new Date().toISOString(),
      status: 400,
      error: "Bad Request",
      message: "Request body json needs to contain a body field (string)",
      path: "/emails/custom/:receipientsEmail",
    });
    return;
  }

  // Send the actual email
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: receiptient,
    from: process.env.SENDGRID_FROM_DOMAIN,
    subject: subject,
    html: body,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
    })
    .catch((error) => {
      console.error(error);

      console.error(error.response.body);
    });

  // Process the email
  res.status(202).send({
    message: "Sending an email with your custom content",
  });
});

/**
 * Check whether the given email is valid.
 * @param {*} email email to validate
 * @returns a boolean
 */
function isEmailValid(email) {
  // TODO - replace with a better regex or Sendgrid email validation API call
  return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
}
