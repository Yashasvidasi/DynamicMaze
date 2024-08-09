import React, { Component } from 'react'
import 'font-awesome/css/font-awesome.css'


class Movies extends Component {

    state={
        val: "fa fa-heart-o"
    }

    onclick=()=>{
        console.log(this.state.val);
        if(this.state.val === "fa fa-heart"){
            this.setState({val:"fa fa-heart-o"});
        }
        else{
            this.setState({val:"fa fa-heart"});
        }
        console.log(this.state.val);
    }
    
    render() { 
        const obj = this.props.movie;
        
        return (
                <tr>
                    <td>{obj.title}</td>
                    <td>{obj.numberInStock}</td>
                    <td>{obj.dailyRentalRate}</td>
                    <td>{obj.genre.name}</td>
                    <td><i className={this.state.val} onClick={this.onclick}></i></td>
                </tr>
            
        );
    }
}
 
export default Movies;
