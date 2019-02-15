import React, {Component} from 'react';

class Message extends Component {


  messageBuilder(message) {
    if (message.type === 'postMessage') {
      return (
        <div className="message" style={{color: message.content.color}}>
            <span className="message-username">{message.content.user}</span>
            <span className="message-content">{message.content.content}</span>
        </div>
      );
    }
    else if (message.type === "incomingMessage") {
      return (
        <div className="notification">
          <span className="notification-content">{message.content.previousUser} has changed their name to {message.content.user}</span>
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return this.messageBuilder(this.props.message)
  }
}


export default Message;

