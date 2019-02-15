import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {



  render() {

    return(
      <div>{this.props.messages.map((message) => (
        <Message message={message} currentUser={this.props.currentUser} previousUser={this.props.previousUser}/>
      ))}</div>
    );
  }
}

export default MessageList;