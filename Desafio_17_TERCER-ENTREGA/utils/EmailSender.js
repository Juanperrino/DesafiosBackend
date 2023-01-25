import nodemailer from 'nodemailer';
import logger from '../logs/Loggers.js';

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const enviarMail = async (subject, html) => {
    const opts = {
        from: 'Ecommerce Nodejs',
        to: process.env.EMAIL_USER,
        subject: subject,
        html: html,
        attachments: [
            {
                path: 'https://morethankyounotes.com/wp-content/uploads/2017/02/Customer-Thank-You-Note-1.png'
            },
        ]
    };

    try {
        const result = await transporter.sendMail(opts);
        console.log(result);
    } catch (error) {
        logger.error('error', error);
    }
};
export default enviarMail;
