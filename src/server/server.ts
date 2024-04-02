import { Request, Response, NextFunction } from 'express';
import { Socket } from 'socket.io-client';

const path = require('path');
const ngrok = require('ngrok');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

dotenv.config();

const port: number = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../../build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(cookieParser());

//  TODO: Figure out why previous groups decided to use socket.io
// https://nodejs.org/api/http.html#httpcreateserveroptions-requestlistener
// create a plain Node.JS HTTP server using the request handler functions generated by invoking express()
const server = require('http').createServer(app);

// https://www.npmjs.com/package/socket.io
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

// Generate a new nonce for each request -- Temp
// ? Keeping this for the time being / Research possible backend nonce generation for Electron.js
// app.use((req: Request, res: Response, next: NextFunction) => {
//   const nonce = crypto.randomBytes(16).toString('base64');
//   res.locals.nonce = nonce;
//   res.setHeader(
//     'Content-Security-Policy',
//     `style-src 'self' 'nonce-${nonce}';`
//   );
//   return next();
// });

// if u want to use routers, set socket io then google the rest
// https://stackoverflow.com/questions/47249009/nodejs-socket-io-in-a-router-page
app.set('socketio', io);

io.on('connection', (client: Socket) => {
  console.log('established websocket connection');

  client.on('message', (message: string) => {
    console.log('message received: ', message);
  });
});

app.get('/', (_, res: Response) => res.send('Hello World!'));

app.use(express.static(path.resolve(__dirname, '../../build')));

app.use(cors({ origin: 'http://localhost:8080' }));

