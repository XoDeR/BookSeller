import React, { Component } from "react";
import BookOrderRow from "../components/BookOrderRow";

class BooksOrder extends Component {
  state = {
    bookList: []
  };
  
  getApi = () => {
    fetch("/api/books", {
      cache: "reload",
      method: "GET"
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(data => this.setState({ bookList: data }))
      .catch(err => this.props.history.push("/404"));
  };

  componentDidMount() {
    this.getApi();
  }

  render() {
    const bookOrderRows = this.state.bookList.map(book => {
      return <BookOrderRow key={book.id} book={book} />;
    });
    return (
      <div className="container">
        <table className="table table-striped table-bordered">
          <thead className="table-header">
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Add To Cart</th>
            </tr>
          </thead>
          <tbody>{bookOrderRows}</tbody>
        </table>
      </div>
    );
  }
}

export default BooksOrder;