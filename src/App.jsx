
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'
import NavBar from './NavBar.jsx'
import React, {Component} from 'react';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      currentUser: "Anonymous",
      previousUser: "Anonymous",
      totalUsers: 1,
      messages: [{type:null,user:null,content:null,id:null,totalUsers:null},]
    };

    this.keyPress = this.keyPress.bind(this);
    this.userNameUpdater = this.userNameUpdater.bind(this);
  }



  keyPress(e){
      if(e.key === 'Enter'){
        console.log("what?", this.state.socket)
        const content = e.target.value
        this.state.socket.send(JSON.stringify({type: "postMessage", user: this.state.currentUser, content }))
        e.target.value = ""
      }
  }

  userNameUpdater(e){
    console.log('nameUpdater')
    if(e.key === 'Enter' && e.target.value !== "") {

      // this.setState({currentUser: e.target.value})
      this.state.socket.send(JSON.stringify({type: "incomingMessage", user: e.target.value, previousUser: this.state.currentUser}))
      console.log("users Switch =====", this.state.currentUser, this.state.previousUser, "and this is e.target.value==", e.target.value)
      this.setState({previousUser: this.state.currentUser,
        currentUser: e.target.value              
        })
      }
  
    } 

  componentDidMount() {
    console.log('here?')
    var socket = new WebSocket("ws://localhost:3001");
    socket.addEventListener('open', function (evt) {
      this.setState({socket : socket})
      this.state.socket.onmessage = evt => {
        const newMessage = JSON.parse(evt.data)
        console.log(newMessage)
        console.log("message commin in!", newMessage)
        this.setState({
          messages : this.state.messages.concat([newMessage]),
          totalUsers : newMessage.totalUsers
        })
      };
    }.bind(this));
  }


  render() {
    console.log(this.state, "<====on app.jsx render")
    return (
      <div>
        <NavBar totalUsers={this.state.totalUsers}/>
        <main className="messages">
          <MessageList messages={this.state.messages} currentUser={this.state.currentUser} previousUser={this.state.previousUser}/>
        </main>
        <ChatBar keyPress={this.keyPress} userNameUpdater={this.userNameUpdater}/>
      </div>
    );
  }
}
export default App;
