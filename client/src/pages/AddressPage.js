import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import AddressList from "../components/AddressList";
import { Button, Icon, message } from "antd";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import * as OrderActions from "../actions/order";

const Container = styled.div`
  margin-top: 5%;
  padding-left: 20%;
  @media (max-width: 900px) {
    padding-left: 10%;
  }
`;
const Wrapper = styled.section`
  padding-left: 10%;
  @media (max-width: 600px) {
    padding-left: 0%;
  }
`;
const Label = styled.section`
  font-size:125%
  flex: 1;
  margin-left:10%;
  @media (max-width: 600px) {
    margin:0%;
  }
`;

class AddressPage extends React.Component {
  state = {
    addressList: [],
    addressId: -1
  };

  handlePaymentBtnClick = () => {
    if (this.state.addressId === -1) {
      message.error("Delivery address needs to be selected");
    } else {
      this.props.orderActions.addOrderAddressId(this.state.addressId);
      this.props.history.push("/checkout/pay");
    }
  };

  changeSelectedAddressId = id => {
    this.setState({ addressId: id });
  };

  getUserAdresses = () => {
    const userId = this.props.user.id;
    fetch(`/api/address/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ addressList: data });
      })
      .catch(error => this.props.history.push("/404"));
  };
  
  componentDidMount() {
    this.getUserAdresses();
  }
  
  render() {
    let existingAddress;
    if (this.state.addressList.length !== 0) {
      existingAddress = (
        <AddressList
          addressIdSelected={this.changeSelectedAddressId}
          addressList={this.state.addressList}
        />
      );
    } else {
      existingAddress = <div>No Existing address added</div>;
    }
    return (
      <Container>
        <Label>SELECT ADDRESS FOR DELIVERY</Label>
        {existingAddress}
        <Wrapper>
          
          <NavLink to="/checkout/address/add">
            <Button type="primary">
              <Icon type="plus-circle-o" />
              Add new Address
            </Button>
          </NavLink>

          <Button type="primary" onClick={this.handlePaymentBtnClick}>
            Go to Payment
          </Button>
          
        </Wrapper>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.userData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(OrderActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressPage);