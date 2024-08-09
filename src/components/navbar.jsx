import React, { Component } from 'react'

class Navbar extends Component {
    state = {  } 
    render() { 
        return (
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">{this.props.value === 0? "No movies available": this.props.value}</span>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;