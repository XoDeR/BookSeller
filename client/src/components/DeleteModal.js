import React, { Component } from "react";
import { Modal, Button } from "antd";
import PropTypes from "prop-types";

class DeleteModal extends Component {
  state = {
    visible: false,
    confirmLoading: false
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.props.handleData(this.props.id);
    this.setState({
      confirmLoading: true
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
      visible: false
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
        />
      </div>
    );
  }
}

DeleteModal.propTypes = {
  id: PropTypes.number.isRequired,
  btnText: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  handleData: PropTypes.func.isRequired
};

export default DeleteModal;