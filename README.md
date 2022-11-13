# nodejs-sendgrid-example

Example of integration of NodeJs API with Sendgrid mail sending service

## Requires

- Node 16+
- [A Sendgrid account](https://sendgrid.com/) (details below)

## Getting Started

Run `npm install` to install the dependencies.

Create a `.env` file based on the [`.env.example`](.env.example) file.

Create a Sendgrid account. You can associate a domain with it or use [unverified emails](https://docs.sendgrid.com/ui/sending-email/sender-verification) (may get refused/blocked by some email providers).\
Get your Sendgrid API key and add it to the `.env` file under the SENDGRID_API_KEY property. Do the same for whatever domain you have chosen.

If you wish to use the `enmails/alert/:recipientEmail` endpoint, you need to create a [dynamic template in Sendgrid](https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-templates) and add its ID to the `.env` file.

## Endpoints

The API runs by default on [localhost:8080](http://localhost:8080).

There are three endpoints total:

- [localhost:8080](http://localhost:8080) - returns a list of endpoints
- [localhost:8080/emails/alert/:recipientEmail](http://localhost:8080/emails/alert/:recipientEmail) - sends a template-based email to the given recipient
- [localhost:8080/emails/custom/:recipientEmail](http://localhost:8080/emails/custom/:recipientEmail) - sends a custom email to the given recipient. Requires a JSON request body with `subject` and `body` properties

## LICENSE

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.
