import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'
import React, {Component} from 'react';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      currentUser: "Anonymous",
      messages: []
    };

    this.keyPress = this.keyPress.bind(this);
    this.userNameUpdater = this.userNameUpdater.bind(this);
  }



  keyPress(e){
      if(e.key === 'Enter'){
        const content = e.target.value
        this.state.socket.send(JSON.stringify({user: this.state.currentUser, content }))
        e.target.value = ""
      }
  }

  userNameUpdater(e){
    if(e.target.value.length === 0) {
      this.setState({currentUser: ""})
    } else {
       this.setState({currentUser: e.target.value})
    }
  }

  componentDidMount() {
    var socket = new WebSocket("ws://localhost:3001");
    socket.addEventListener('open', function (evt) {
      this.setState({ socket })
      this.state.socket.onmessage = evt => {
      // add the new message to state
        const newMessage = JSON.parse(evt.data)
        console.log("newMessage:", newMessage)
        this.setState({
        messages : this.state.messages.concat([newMessage])
      })
        console.log("state", this.state)
    };



    }.bind(this));


}


  render() {
    console.log(this.state)
    return (
      <div>
        <main className="messages">
          <MessageList messages={this.state.messages} currentUser={this.state.currentUser}/>
          <Message />
        </main>
        <ChatBar keyPress={this.keyPress} userNameUpdater={this.userNameUpdater}/>
      </div>
    );
  }
}
export default App;
