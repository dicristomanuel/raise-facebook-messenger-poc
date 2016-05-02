import { Server } from 'hapi';
import Good from 'good';
import GoodConsole from 'good-console';
import Blipp from 'blipp';
import { init } from './mediator';
import { defaultUser } from './constants';
import { connection } from './db/dbConfig';

const server = new Server();
server.connection({
  port: 3001
});

server.register([{
  register: Blipp,
}, {
  register: Good,
  options: {
    reporters: [{
      reporter: GoodConsole,
      events: {
        log: '*',
        response: '*'
      },
    }, ],
  },
}, ], (error) => {
  server.route({
    method: 'POST',
    path: '/webhook/',
    handler(request, reply) {
      const messaging_events = request.payload.entry[0].messaging;
      for (let i = 0; i < messaging_events.length; i++) {
        const event = request.payload.entry[0].messaging[i];
        const sender = event.sender.id;
        if (event.postback) {
          const text = JSON.stringify(event.postback);
          // do something with the postback
        } else if (event.message && event.message.text) {
          const text = event.message.text;
          init({text, sender, userType: defaultUser});
        }
      }
      reply();
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
