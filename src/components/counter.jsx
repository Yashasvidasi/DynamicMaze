import React, { Component } from 'react'

class Counter extends Component {

    render() { 
        return (
            <tr>
                <td key={this.props.id}> {this.props.value}</td>
                <td><button onClick={this.props.handleIncrement}>+</button></td>
                <td><button onClick={this.props.handleDecrement}>-</button></td>
                <td><button onClick={this.props.handleDelete}>x</button></td>
            </tr>
        );
    }
}
 
export default Counter;