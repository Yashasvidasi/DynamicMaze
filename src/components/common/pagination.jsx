import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";

class Pagination extends Component {
  render() {
    const { items, pageSize, current, onPchange } = this.props;
    const p = Math.ceil(items / pageSize);
    console.log(current);
    var pages = _.range(1, p + 1);
    if (p === 1) {
      pages = [];
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pages.map((page) => (
            <li
              key={page}
              className={page === current ? "page-item active" : "page-item"}
            >
              <a className="page-link" onClick={() => onPchange(page)}>
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
