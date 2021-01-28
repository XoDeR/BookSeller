import React, { Component } from "react";
import BookRow from "../components/BookRow";
import BookModal from "../components/CRUBookModal";
import { message } from "antd";
import { Helmet } from "react-helmet";

class BooksTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: []
    };
  }

  postData = values => {
    fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(() => {
        this.getApi();
        message.success("Book added successfully!");
      })
      .catch(err => console.log("Caught it", err));
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
    const bookRows = this.state.bookList.map(book => {
      return <BookRow key={book.id} book={book} getApi={this.getApi} />;
    });
    return (
      <div className="container">
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Helmet>
        <table className="table table-striped table-bordered">
          <thead className="table-header">
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Price (EUR)</th>
              <th/>
              <th/>
              <th>
                <BookModal
                  btnText="Add book"
                  header="Add a new book"
                  handleData={this.postData}
                  formValid={false}
                />
              </th>
            </tr>
          </thead>
          <tbody>{bookRows}</tbody>
        </table>
      </div>
    );
  }
}

export default BooksTable;