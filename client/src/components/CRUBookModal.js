import React, { Component } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import SingleInput from "./SingleInput";
import FormErrors from "./FormErrors";

class BookModal extends Component {
  
  state = {
    visible: false,
    confirmLoading: false,
    title: this.props.title || "",
    author: this.props.author || "",
    email: this.props.email || "",
    price: this.props.price || "",
    id: this.props.id || "",
    
    formErrors: {
      title: "field is empty",
      author: "field is empty",
      email: "field is invalid",
      price: "field is empty"
    },
    
    titleValid: this.props.formValid,
    authorValid: this.props.formValid,
    emailValid: this.props.formValid,
    priceValid: this.props.formValid,
    formValid: this.props.formValid,
    showErrors: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  validateField(fieldName, value) {
    let {
      formErrors,
      titleValid,
      emailValid,
      authorValid,
      priceValid
    } = this.state;
    let emailMatch;

    switch (fieldName) {
      case "title":
        titleValid = value.length > 0;
        formErrors.title = titleValid ? "" : "field is empty";
        break;
      case "author":
        authorValid = value.length > 0;
        formErrors.author = authorValid ? "" : "field is empty";
        break;
      case "email":
        emailMatch = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        emailValid = emailMatch === null ? false : true;
        formErrors.email = emailValid ? "" : "field is invalid";
        break;
      case "price":
        priceValid = value.length > 0 && !isNaN(Number(value));
        formErrors.price = priceValid ? "" : "field is invalid";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors,
        titleValid,
        authorValid,
        emailValid,
        priceValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.titleValid &&
        this.state.authorValid &&
        this.state.emailValid &&
        this.state.priceValid
    });
  }

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleOk = () => {
    if (this.state.formValid) {
      let values = {
        title: this.state.title,
        author: this.state.author,
        email: this.state.email,
        price: this.state.price,
        id: this.state.id
      };
      
      this.props.handleData(values);
      this.setState({
        confirmLoading: true,
        showErrors: false
      });

      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false
        });
      }, 2000);
    } else {
      this.setState({ showErrors: true });
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      showErrors: false
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    const showErrors = this.state.showErrors;
    const formError = showErrors ? (
      <FormErrors formErrors={this.state.formErrors} />
    ) : (
      <div />
    );
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          {this.props.btnText}
        </Button>
        <Modal
          title={this.props.header}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {formError}
          <SingleInput
            header="Book title:"
            content={this.state.title}
            name="title"
            onChange={this.handleUserInput}
          />
          <SingleInput
            header="Book author:"
            content={this.state.author}
            name="author"
            onChange={this.handleUserInput}
          />
          <SingleInput
            header="Author Email:"
            content={this.state.email}
            name="email"
            onChange={this.handleUserInput}
          />
          <SingleInput
            header="Book Price (AUD)"
            content={this.state.price}
            name="price"
            onChange={this.handleUserInput}
          />
        </Modal>
      </div>
    );
  }
}

BookModal.propTypes = {
  btnText: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  handleData: PropTypes.func.isRequired
};

export default BookModal;