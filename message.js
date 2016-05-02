export class Message {
  constructor(text, sender, userType) {
    this.sender = sender;
    this.text = text;
    this.userType = userType;
    this.firstName = null;
    this.answer = null;
    this.send = sendInit(this.userType);
  }

  get Sender() {
    return this.sender;
  }

  get Text() {
    return this.text;
  }

  get UserType() {
    return this.userType;
  }

  get FirstName() {
    return this.firstName;
  }

  set FirstName(name) {
    this.name = name;
  }

  get Answer() {
    return this.answer;
  }

  set Answer(answer) {
    this.answer = answer;
  }

  get Send() {
    return this.send;
  }

  set Send(send) {
    this.send = send;
  }
}

const sendInit = (userType) => {
  const send = userType === 'member_service' ? true : false;
  return send;
};
