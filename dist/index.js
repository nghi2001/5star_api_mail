"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const amqplib_1 = __importDefault(require("amqplib"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const queue = process.env.QUEUE || 'send_mail';
const RABBIT_HOST = process.env.RABBIT_HOST || 'localhost';
const RABBIT_PORT = process.env.RABBIT_PORT || '5672';
const RABBIT_USER = process.env.RABBIT_USERNAME || 'guest';
const RABBIT_PASS = process.env.RABBIT_PASSWORD || 'guest';
const smtp = nodemailer_1.default.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'nghindps16371@fpt.edu.vn',
        pass: 'sxrdocvrhtqlhkks'
    }
});
function sendMail(content) {
    smtp.sendMail({
        to: 'duynghikhum9@gmail.com',
        from: 'nghindps16371@fpt.edu.vn',
        subject: 'Testing Email Sends',
        html: content,
    }).then(data => {
        console.log(data);
    });
}
amqplib_1.default.connect('amqp://guest:guest@localhost:5672')
    .then((conn) => __awaiter(void 0, void 0, void 0, function* () {
    // let chanel: Channel = await conn.createChannel();
    // chanel.assertQueue(queue);
    // chanel.consume(queue, (msg: ConsumeMessage|null) => {
    //     if( msg !== null ) {
    //         console.log(msg!.content.toString());
    //         chanel.ack(msg);
    //     }
    // })
}))
    .catch(error => {
    throw error;
});
