import React, { Component } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";
import SingleInput from "./SingleInput";
import SingleBigInput from "./SingleBigInput";

class EmailModal extends Component {
  
  state = {
    visible: false,
    confirmLoading: false,
    subject: "",
    content: ""
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  handleOk = () => {
    let values = {
      subject: this.state.subject,
      content: this.state.content
    };

    this.props.handleData(this.props.id, values);
    this.setState({
      confirmLoading: true,
      subject: "",
      content: ""
    });

    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      subject: "",
      content: ""
    });
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type={this.props.btnType} onClick={this.showModal}>
          {this.props.btnText}
        </Button>
        <Modal
          title={this.props.header}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          To: {this.props.receiver}
          <br/>
          <SingleInput
            header="Subject"
            content={this.state.subject}
            name="subject"
            onChange={this.handleUserInput}
          />
          <SingleBigInput
            header="Content"
            content={this.state.content}
            name="content"
            onChange={this.handleUserInput}
          />
        </Modal>
      </div>
    );
  }
}

EmailModal.propTypes = {
  id: PropTypes.number.isRequired,
  btnText: PropTypes.string.isRequired,
  handleData: PropTypes.func.isRequired
};

export default EmailModal;