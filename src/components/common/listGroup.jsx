import React, { Component } from "react";

class ListGroup extends Component {
  state = {};
  render() {
    return (
      <ul className="list-group">
        <li className="list-group-item" aria-current="true">
          All Genres
        </li>
        {this.props.genres.map((genre) => (
          <li
            key={genre._id}
            className={
              genre === this.props.selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            aria-current="true"
            onClick={() => this.props.onselect(genre)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
