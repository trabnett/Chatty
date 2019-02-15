import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {


// Renders each message that is currently stored in state
  render() {
    return(
      <div>{this.props.messages.map((message) => (
        <Message key={message.content.id} message={message} currentUser={this.props.currentUser} previousUser={this.props.previousUser} color={this.props.color}/>
      ))}</div>
    );
  }
}

export default MessageList;