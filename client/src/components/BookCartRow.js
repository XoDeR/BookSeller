import React from "react";
import { InputNumber } from "antd";
import DeleteModal from "./DeleteModal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import * as ButtonActions from "../actions/button";

class BookCartRow extends React.Component {
  
  onQuantityChange = value => {
    this.props.actions.updateQuantity(this.props.book.id, value);
  };

  removeBook = id => {
    this.props.buttonActions.enableButton(this.props.book.id);
    this.props.actions.removeFromCart(this.props.book.id);
    this.props.actions.updateQuantity(this.props.book.id, 0);
  };

  render() {
    const { price, title, id } = this.props.book;
    const { quantity } = this.props;
    return (
      <tr className="table-body">
        <td>{title}</td>
        <td>
          <InputNumber
            min={1}
            max={10}
            defaultValue={quantity}
            onChange={this.onQuantityChange}
          />
        </td>
        <td>{price * quantity}</td>
        <td>
          <DeleteModal
            id={id}
            btnText="Remove"
            btnType="danger"
            header="Confirm removing book?"
            handleData={this.removeBook}
          />
        </td>
      </tr>
    );
  }
}

BookCartRow.propTypes = {
  book: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    buttonActions: bindActionCreators(ButtonActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(BookCartRow);