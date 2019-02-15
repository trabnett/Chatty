import React, {Component} from 'react';

class Chatbar extends Component {


render(){

  return (
    <footer className="chatbar">
      <input onKeyUp={this.props.userNameUpdater} className="chatbar-username" type="text" placeholder="Your Name (Optional)" />
      <input onKeyPress={this.props.keyPress} className="chatbar-message" type="text" placeholder="Type a message and hit ENTER" />
    </footer>
    );
  }
}

export default Chatbar;

