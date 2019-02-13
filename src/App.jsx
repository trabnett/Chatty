import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx'
import React, {Component} from 'react';

class App extends Component {
  constructor(){
    super();
    this.state = {
      currentUser: "Anonymous",
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    };
    this.keyPress = this.keyPress.bind(this);
    this.userNameUpdater = this.userNameUpdater.bind(this);
  }



  keyPress(e){
      if(e.key === 'Enter'){
        const id = this.state.messages.length + 2;
        const upDate = this.state.messages;
        upDate.push({username: this.state.currentUser, content: e.target.value, id: id})
        this.setState({messages: upDate})
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
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
  }, 3000);
}


  render() {
    return (
      <div>
        <main className="messages">
          <MessageList messages={this.state.messages} currentUser={this.state.currentUser.name}/>
          <Message />
        </main>
        <ChatBar keyPress={this.keyPress} userNameUpdater={this.userNameUpdater}/>
      </div>
    );
  }
}
export default App;
