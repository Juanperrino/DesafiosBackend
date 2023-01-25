import twilio from 'twilio';

const accountSid = process.env.TWILIO_SID,
    authToken = process.env.TWILIO_TOKEN,
    twilioNumber = process.env.TWILIO_NUMBER,
    whatsappNumber = process.env.WSAPP_NUMBER


export async function sendWhatsapp(mensaje, target) {

    const client = twilio(accountSid, authToken);

    client.messages
        .create({
            from: whatsappNumber,
            body: mensaje,
            to: `whatsapp:${target}`,
        })
        .then((message) => logger.info(message.sid));
}



export async function sendSms(mensaje, target) {
    const client = twilio(accountSid, authToken);
    client.messages
        .create({
            body: mensaje,
            from: twilioNumber,
            to: target
        })
        .then((message) => logger.info(message.sid));
}
