import nodemailer from 'nodemailer';
import amqplib from 'amqplib';
import dotenv from 'dotenv';
import {Connection, Channel, ConsumeMessage} from 'amqplib'

dotenv.config()

const queue = process.env.QUEUE || 'send_mail';
const RABBIT_HOST = process.env.RABBIT_HOST || 'localhost';
const RABBIT_PORT = process.env.RABBIT_PORT || '5672';
const RABBIT_USER = process.env.RABBIT_USERNAME || 'guest';
const RABBIT_PASS = process.env.RABBIT_PASSWORD || 'guest';
const smtp = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: `${process.env.MAIL}`,
        pass: `${process.env.MAIL_PASS}`
    }
})

function sendMail(content:any) {
    content = JSON.parse(content.toString());

    try{smtp.sendMail({
        to: `${content.mail}`,
        from: `${process.env.MAIL}`,
        subject: `Confirm Mail`,
        html: content.content,
       })} catch (err) {
        console.log(err);
        
       }
}
amqplib.connect(`${process.env.RABBIT_URL}`)
.then( async (conn: Connection) => {

        let chanel: Channel = await conn.createChannel();
        chanel.assertQueue(queue);
        chanel.consume(queue, (msg: ConsumeMessage|null) => {
            if( msg !== null ) {
                
                sendMail(msg.content.toString())
            }
            let nullmsg : ConsumeMessage = (msg) as ConsumeMessage
            chanel.ack(nullmsg);
        })
})
.catch( err => {
    throw err
})

