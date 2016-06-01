import { Server } from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';
import Blipp from 'blipp';
import Inert from 'inert';
import Joi from 'joi';
import { Consumer, MemberService } from './data/appConstants';
import { FromConsumer, FromMemberService, GetChats, UpdateStatus, GetMessages } from './app/mediator';
import Parser from './app/parser';

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
      path: '/webhook',
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
            Parser({io, sender, text, userType: Consumer});
            reply();
          }
        }
      }
    });
    // TODO: check error - Unhandled rejection Error: reply interface called twice - cause then(reply)
    server.route({
      method: 'POST',
      path: '/member-service',
      handler(request, reply) {
        const data = request.payload;
        Parser({...data, io, userType: MemberService});
        reply();
      }
    });

    server.route({
      method: 'GET',
      path: '/get-chats',
      handler(request, reply) {
        GetChats().then(reply);
      }
    });

    server.route({
      method: 'GET',
      path: '/get-messages/{id}',
      handler(request, reply) {
        const id = request.params.id;
        GetMessages(id).then(reply);
      }
    });

    server.route({
      method: 'PUT',
      path: '/update-chat',
      config: {
        validate: {
          payload: {
            chatId: Joi.number().required(),
            key: Joi.required(),
            value: Joi.required(),
          },
        },
      },
      handler(request, reply) {
        UpdateStatus(io, request.payload);
        reply();
      }
    });
  });
  // MAKE THESE AVAILABLE IN PARSER ?

  server.start((error) => {
    if (error) {
      console.log(error.message);
      process.exit(1);
    }
    console.log(`server is running on port ${PORT}`);
  });

  // TODO: divide packages to -dev
