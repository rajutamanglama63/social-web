const nodeMailer = require("nodemailer");

// const dotenv = require("dotenv");

// dotenv.config();

exports.sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        // sending email in google for real time application
        // host : process.env.SMPT_HOST,
        // port : process.env.SMPT_PORT,
        // auth : {
        //     user : process.env.SMPT_MAIL,
        //     pass : process.env.SMPT_PASSWORD,
        // },
        // service : process.env.SMPT_SERVICES

        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "229d26c55a4ea7",
            pass: "5ed08385092108"
        }
    });

    const mailOptions = {
        from : "229d26c55a4ea7",
        to : options.email,
        subject : options.subject,
        text : options.message
    }

    await transporter.sendMail(mailOptions);
}