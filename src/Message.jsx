import React, {Component} from 'react';

class Message extends Component {


  messageBuilder(message) {
    if (message.type === 'postMessage') {
      console.log('here')
      console.log('message in Message builder incomming', message.type)
      return (
        <div key={message.id} className="message">
            <span className="message-username">{message.user}</span>
            <span className="message-content">{message.content}</span>
        </div>
      );
    }
    else if (message.type === "incomingMessage") {
      console.log('there')
      return (
        <div key={message.id} className="notification">
          <span className="notification-content">{message.previousUser} has changed their name to {message.user}</span>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    console.log("in render")
    return this.messageBuilder(this.props.message)
  }
}


export default Message;

