import { Server } from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';
import Blipp from 'blipp';
import Path from 'path';
import Vision from 'vision';
import Inert from 'inert';
import { DefaultUser, MemberService } from './data/constants';
import { Init } from './app/mediator';
// import { SocketInit } from './sockets/main';

const server = new Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  }
});

server.connection({
  port: 3001
});

export const io = require("socket.io")(server.listener);
// SocketInit();

server.register([
  Vision, Inert,
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
            Init({text, sender, userType: DefaultUser})
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
        Init({text, sender, userType: MemberService})
        .then(reply);
      }
    });
  });

  server.start((error) => {
    if (error) {
      console.log(error.message);
      process.exit(1);
    }
    console.log('server is running at localhost:3001');
  });
