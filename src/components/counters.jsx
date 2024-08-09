import Counter from "./counter";
import React, { Component } from 'react'

class Counters extends Component {

    render() { 
        return (
            <table>
                <tbody>
                    <tr>
                        <th> Item count</th>
                        
                    </tr>
                    {this.props.counters.map(c => (
                        <Counter
                            key={c.id}
                            id={c.id}
                            value={c.value}
                            handleDecrement={() => this.props.onDecreases(c)}
                            handleIncrement={() => this.props.onIncreases(c)}
                            handleDelete={() => this.props.onDeletea(c)}
                        />
                        ))}
                </tbody>
            </table>
        );
    }
}
 
export default Counters;