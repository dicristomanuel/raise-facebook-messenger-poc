## Raise Facebook Messenger - POC
##### watch the [screencast](https://vimeo.com/190501367)

This project is a proof of concept for a bot service that takes care of customers basic requests in the outstanding marketplace world which Raise.com created for selling and buying gift cards. This is a tool that can be used for any website/service that offers customer service.

The bot knows when the user is saying hi, asking to browse gift cards, requesting inventory availability for a specific category or even learn about discounts in a specific city.

When the bot won't be able to take care of the customer's needs will alert the member service department of an active conversation that needs to be assigned to a real person.

The color palette is the only minimal but clear indicator of every chat's status.

##### Gray - the chat is inactive or it's interacting with the bot

##### Green - the chat is active and in need of a real person to take care of it

##### Blue - the chat is assigned to the member service user who is viewing the page

##### Yellow - the chat currently assigned to another member service user

###### Main page
![M+R1](https://github.com/dicristomanuel/assets/blob/master/raise-facebook-messenger-poc/R+M1.png?raw=true)

###### Single chat page
![M+R2](https://github.com/dicristomanuel/assets/blob/master/raise-facebook-messenger-poc/R+M2.png?raw=true)

## Stack:

- Node
- Hapi
- React
- Redux
- Socket.io
- [Prism](https://github.com/dicristomanuel/prism)

###### Why Hapi ?
I chose to use hapi for this project because I wanted to try it out. This is only a proof of concept so it gave me the possibility to test out this alternative web application framework that I didn't use before. For smaller application I usually go with express since it's lighter and it comes with less built in tools.

###### Why React, Redux, Socket.io ?
Obviously React is a great choice for high interactive applications and the usage of Redux in this case was necessary to keep track of the complex changing state. Another great advantage of using React is the reusability of the components that once build they become legacy that you can apply to different pages, in different sections without having to rewrite the same code over and over. Socket.io was a light and needed choice to make the back-end talk to the front-end real time.

###### Why [Prism](https://github.com/dicristomanuel/prism) ?
What I love about React is the reusability of the components and the predictability of the application's state. I wanted to bring the same concept to the back-end by building this finite state machine called [Prism](https://github.com/dicristomanuel/prism) that allows you to define 'screenshots' of specific states in which the application can find itself in. Once aware of all the possible scenarios you can customize the app's behavior by hooking into the Prism lifecycle events and building functions for each case. No surprises, no endless and complex if statements.
