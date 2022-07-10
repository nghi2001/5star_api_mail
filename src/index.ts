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
        user: 'nghindps16371@fpt.edu.vn',
        pass: 'sxrdocvrhtqlhkks'
    }
})

function sendMail(content:any) {
    
    smtp.sendMail({
        to: 'duynghikhum9@gmail.com',
        from: 'nghindps16371@fpt.edu.vn',
        subject: 'Testing Email Sends',
        html: content,
       })
}
amqplib.connect(`amqp://${RABBIT_USER}:${RABBIT_PASS}@${RABBIT_HOST}:${RABBIT_PORT}`)
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

