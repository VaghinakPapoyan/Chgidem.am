// Import Mailer
import nodemailer from "nodemailer"

// Init Mailer
const transporter = nodemailer.createTransport(
{
    // Take info From https://help.mail.ru/mail/mailer/popsmtp
    host: "smtp.mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: 
    {
        user: "ararat.armenia.02@mail.ru", // Sender mail
        pass: "XBw4QTkhe81RTdbjRbZ8" // Sender mail password
    }
})

// Start sending
// Argument 1: Sender Name
// Argument 2: Receiver Mail
// Argument 3: Message Title
// Argument 4: Message HTML
// Argument 5: Message Text
export default async function mailer(senderUsername, receiverUsername, messageTitle, messageHtml, messageText)
{
    // Settings
    let meassageOptions = 
    {
        from: senderUsername + "<ararat.armenia.02@mail.ru>", // sender address
        to: receiverUsername, // list of receivers
        subject: messageTitle, // Subject line
        text: messageText || "", // plain text body
        html: messageHtml // html body
    }

    // Sending
    let info = await transporter.sendMail(meassageOptions, (err, info) => 
    {
        if(err) return console.log(err)
        return info
    })
}
