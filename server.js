import { Server } from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';
import Blipp from 'blipp';
import Inert from 'inert';
import Joi from 'joi';
import { DefaultUser, MemberService } from './data/constants';
import { Init, getChats, updateStatus } from './app/mediator';

const server = new Server();
const PORT = process.env.PORT || 3001;

server.connection({
  port: PORT
});

const io = require('socket.io')(server.listener);

io.on('connection', (socket) => {
  socket.emit('new_connection', 'connected');
});

server.register([
  Inert,
  { register: Blipp },
  { register: Good,
    options: {
      reporters: [{
        reporter: GoodConsole,
        events: { log: '*', response: '*' }
      }]
    },
  }], (err) => {
    if (err)
    throw err;

    // TODO: catch all for react browserHistory

    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: {
        directory: {
          path: './public',
          listing: false,
          index: true
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/webhook/',
      handler(request, reply) {
        const messaging_events = request.payload.entry[0].messaging;
        for (let i = 0; i < messaging_events.length; i++) {
          const event = request.payload.entry[0].messaging[i];
          const sender = event.sender.id;
          if (event.postback) {
            // const text = JSON.stringify(event.postback);
            // do something with the postback
          } else if (event.message && event.message.text) {
            const text = event.message.text;
            Init(io, {text, sender, userType: DefaultUser})
            .then(reply);
          }
        }
      }
    });
    // TODO: check error - Unhandled rejection Error: reply interface called twice - cause then(reply)
    server.route({
      method: 'POST',
      path: '/member-service/',
      handler(request, reply) {
        const data = request.payload;
        const { text, sender } = data;
        Init(io, {text, sender, userType: MemberService})
        .then(reply);
      }
    });

    server.route({
      method: 'GET',
      path: '/getChats',
      handler(request, reply) {
        getChats().then(reply);
      }
    });

    server.route({
      method: 'PUT',
      path: '/update-status',
      config: {
        validate: {
          payload: {
            chatId: Joi.number().required(),
            status: Joi.string().required(),
          },
        },
      },
      handler(request, reply) {
        updateStatus(request.payload);
        reply();
      }
    });
  });

  server.start((error) => {
    if (error) {
      console.log(error.message);
      process.exit(1);
    }
    console.log(`server is running on port ${PORT}`);
  });

  // TODO: divide packages to -dev
