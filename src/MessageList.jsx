import React, {Component} from 'react';

class MessageList extends Component {



  render() {
    return(
      <div>{this.props.messages.map((message) => (
        <div key={message.id} className="message">
          <span className="message-username">{message.user}</span>
          <span className="message-content">{message.content}</span>
        </div>))}</div>
      );
  }
}

export default MessageList;