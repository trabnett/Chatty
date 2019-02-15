
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
      color: null,
      messages: [{type:null,content:{user:null,content:null,id:null,totalUsers:null}}]
    };

    this.keyPress = this.keyPress.bind(this);
    this.userNameUpdater = this.userNameUpdater.bind(this);
  }



  keyPress(e){
      if(e.key === 'Enter'){
        console.log("what?", this.state)
        const content = e.target.value
        this.state.socket.send(JSON.stringify({type: "postMessage", content: {user: this.state.currentUser, content, color: this.state.color}}))
        e.target.value = ""
      }
  }

  userNameUpdater(e){
    if(e.key === 'Enter' && e.target.value !== "") {

      // this.setState({currentUser: e.target.value})
      this.state.socket.send(JSON.stringify({type: "incomingMessage", content:{user: e.target.value, previousUser: this.state.currentUser, color: this.state.color}}))
      this.setState({previousUser: this.state.currentUser,
        currentUser: e.target.value              
        })
      }
  
    } 

  componentDidMount() {
    var socket = new WebSocket("ws://localhost:3001");
    socket.addEventListener('open', function (evt) {
      this.setState({socket : socket})
      this.state.socket.onmessage = evt => {
        const newMessage = JSON.parse(evt.data)
          this.setState({messages: this.state.messages.concat([newMessage])})
        console.log("message commin in!", newMessage)

        if (newMessage.type === "userConnected") {
          if (!this.state.color) {
            this.setState({color: newMessage.content.color})
          }
          this.setState({totalUsers: newMessage.content.totalUsers})
        }else if (newMessage.type === "postMessage" || newMessage.type === "incomingMessage") {
          this.setState({
            totalUsers : newMessage.content.totalUsers,
          })
        }else if (newMessage.type === "userDisconnected") {
          this.setState({totalUsers: newMessage.content.totalUsers})
        }
      };
    }.bind(this));
  }


  render() {
    console.log(this.state, "<====on app.jsx render")
    return (
      <div>
        <NavBar totalUsers={this.state.totalUsers}/>
        <main className="messages">
          <MessageList messages={this.state.messages} currentUser={this.state.currentUser} previousUser={this.state.previousUser} color={this.state.color}/>
        </main>
        <ChatBar keyPress={this.keyPress} userNameUpdater={this.userNameUpdater}/>
      </div>
    );
  }
}
export default App;
