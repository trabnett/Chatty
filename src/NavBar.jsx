import React, {Component} from 'react';

class NavBar extends Component {
render(){
    return (
        <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a><a className="total-users">Chatty Users Currently Online: {this.props.totalUsers}</a>
        </nav>
        );
    }
}

export default NavBar;