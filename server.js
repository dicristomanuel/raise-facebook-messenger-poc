import { Server } from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';
import Blipp from 'blipp';
import Inert from 'inert';
import Path from 'path';
import { init } from './app/mediator';
import { defaultUser, memberService } from './data/constants';
import socketInit from './sockets/main';

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

const io = require("socket.io")(server.listener);
socketInit(io);

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
  }], () => {
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
            init({text, sender, userType: defaultUser})
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
        init({text, sender, userType: memberService})
        .then(reply);
      }
    });

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true
        }
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
