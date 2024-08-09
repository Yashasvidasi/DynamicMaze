import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Movies from "./movies";
import "font-awesome/css/font-awesome.css";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";

class Movietable extends Component {
  state = {
    movies: getMovies(),
    current: 1,
    page: 4,
    genres: getGenres(),
    currentg: getGenres()[0],
  };

  onSelectHandle = (g) => {
    this.setState({ currentg: g });
  };

  handlePageChange = (page) => {
    this.setState({ current: page });
  };

  render() {
    const mos = Paginate(
      this.state.movies,
      this.state.current,
      this.state.page
    );

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            genres={this.state.genres}
            selectedItem={this.state.currentg}
            onselect={(g) => this.onSelectHandle(g)}
          />
        </div>

        <div className="col">
          <table className="table">
            <tbody>
              <tr>
                <th>Movie Name</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Genre</th>
              </tr>
              {mos.map((c) => (
                <Movies key={c._id} movie={c} />
              ))}
            </tbody>
          </table>
          <Pagination
            items={this.state.movies.length}
            pageSize={this.state.page}
            current={this.state.current}
            onPchange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movietable;
