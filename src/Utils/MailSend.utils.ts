import nodemailer from "nodemailer";
import sendinblue from "nodemailer-sendinblue-transport";
import config from "../config.js";

const transporter = nodemailer.createTransport(new sendinblue({
    apiKey: config.BREVO_API_KEY || ""
}));

const sendMail = async(to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: 'hossainfarshid@gmail.com',
            to: to,
            subject: subject,
            html: html
        });
        return info;
    }
    catch(error) {
        console.error(error);
    }
}

export default sendMail;