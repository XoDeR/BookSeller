import React from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions";
import * as ButtonActions from "../actions/button";

class BookOrderRow extends React.Component {
  
  state = {
    isDisabled: {}
  };

  handleAddToCart = () => {
    this.props.buttonActions.disableButton(this.props.book.id);
    this.props.actions.addToCart(this.props.book);
    this.props.actions.initQuantity(this.props.book.id);
  };
  
  render() {
    const { areButtonsDisabled } = this.props;
    const { id, title, author } = this.props.book;
    let isDisabled = false;
    if (
      typeof areButtonsDisabled[id] !== "undefined" &&
      areButtonsDisabled[id]
    ) {
      isDisabled = true;
    }
    return (
      <tr className="table-body">
        <td>{title}</td>
        <td>{author}</td>
        <td>
          <Button
            type="primary"
            disabled={isDisabled}
            onClick={this.handleAddToCart}
          >
            Add To Cart
          </Button>
        </td>
      </tr>
    );
  }
}

BookOrderRow.propTypes = {
  book: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    areButtonsDisabled: state.areButtonsDisabled
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
    buttonActions: bindActionCreators(ButtonActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookOrderRow);