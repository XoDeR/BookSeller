import React, { Component } from "react";
import { Button } from "antd";
import Icon from '@ant-design/icons';
import BookCartRow from "../components/BookCartRow";
import { Divider } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrderActions from "../actions/order";

class BooksCart extends Component {
  state = {
    totalPrice: 0
  };

  completeOrderClicked = () => {
    this.props.orderActions.updateOrderTotalPrice(this.state.totalPrice);
    this.props.history.push("/checkout/address");
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.bookQuantity !== this.props.bookQuantity) {
      let totalPrice = 0;
      this.props.cartItems.forEach(book => {
        totalPrice += book.price * nextProps.bookQuantity[book.id];
      });
      this.setState({ totalPrice });
    }
  }

  componentDidMount() {
    let totalPrice = 0;
    this.props.cartItems.forEach(book => {
      totalPrice += book.price * this.props.bookQuantity[book.id];
    });
    this.setState({ totalPrice });
  }

  render() {
    const { bookQuantity, cartItems } = this.props;
    const bookCartRows =
      !Array.isArray(cartItems) || cartItems.length === 0 ? (
        <tr>
          <td>Cart</td>
          <td>is</td>
          <td>Empty</td>
        </tr>
      ) : (
        cartItems.map(book => {
          return (
            <BookCartRow
              key={book.id}
              book={book}
              quantity={bookQuantity[book.id]}
            />
          );
        })
      );
    return (
      <div className="container">
        <table className="table table-striped table-bordered">
          <thead className="table-header">
            <tr>
              <th>Book Title</th>
              <th>Quantity</th>
              <th>Price (EUR)</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>{bookCartRows}</tbody>
        </table>
        <Divider />
        <div>Total: {this.state.totalPrice} AUD</div>
        <Button type="primary" onClick={this.completeOrderClicked}>
          Complete Order<Icon type="right" />
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.cartItems,
    bookQuantity: state.bookQuantity,
    totalPrice: state.totalPrice
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(OrderActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksCart);