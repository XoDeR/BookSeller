import React from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import styled from "styled-components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as OrderActions from "../actions/order";
import {v4 as uuidv4} from 'uuid';

const Container = styled.div`
  max-width: 80%;
  margin: auto;
`;

const Div = styled.div`
  margin: 5%;
`;

const Label = styled.section`
  font-size:125%
  flex: 1;
  margin-left:20%;
  @media (max-width: 900px) {
    margin:0%;
  }
`;

const CardElementWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20%;
  @media (max-width: 900px) {
    margin: 0%;
  }
`;

const Button = styled.button`
  width: 300px;
  margin-left: 20%;
  color: #fff;
  border-radius: 4px;
  padding: 4px 15px;
  display: inline-block;
  background-color: #108ee9;
  @media (max-width: 700px) {
    width: 100%;
    margin: 0%;
  }
  @media (min-width: 950px) {
    margin-left: 15%;
  }
  @media (min-width: 950px) {
    margin-left: 10%;
  }
`;

class CheckoutForm extends React.Component {
  state = {
    complete: false,
    customerStripeId: "",
    idemKey: uuidv4()
  };

  handleSubmit = e => {
    e.preventDefault();
    this.handlePayment();
  };

  createOrder = (chargeId, status) => {
    const { bookQuantity } = this.props;
    const userId = this.props.user.id;
    const { price, addressId } = this.props.order;
    fetch(`/api/order/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        bookQuantity,
        totalAmount: price,
        status,
        addressId,
        chargeId
      })
    })
      .then(response => {
        if (response.status === 201) {
          this.setState({ complete: true });
          this.props.orderActions.orderComplete();
        }
      })
      .catch(error => console.error("Error:", error));
  };

  createCharge = () => {
    const { customerStripeId, idemKey } = this.state;
    console.log(idemKey);
    const amountInCents = this.props.order.price * 100;
    fetch("/api/charge", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerStripeId, amount: amountInCents, idemKey })
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        const chargeId = response.id;
        let orderStatus;
        if (response.captured) {
          orderStatus = "paid";
        } else {
          orderStatus = "created";
        }
        this.createOrder(chargeId, orderStatus);
      })
      .catch(err => {
        console.log("Payment was unsuccessful", err);
      });
  };

  createOrRetrieveStripeCustomer = () => {
    const { email, lastName } = this.props.user;
    this.props.stripe
      .createToken({
        name: lastName,
        email: email
      })
      .then(({ token }) => {
        fetch("/api/customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: token.id, email: email })
        })
          .then(res => {
            return res.json();
          })
          .then(response => {
            this.setState({ customerStripeId: response.customerStripeId }, () =>
              this.createCharge()
            );
          });
      })
      .catch(err => {
        console.log("Payment was unsuccessful", err);
      });
  };
  handlePayment = () => {
    this.createOrRetrieveStripeCustomer();
  };

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <Container>
        <Div>
          <Label>PAYMENT INFORMATION</Label>
          <br/>
          <CardElementWrap>
            <CardElement/>
            <Button onClick={this.handleSubmit}>Pay</Button>
          </CardElementWrap>
        </Div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookQuantity: state.bookQuantity,
    user: state.user.userData,
    order: state.orderDetails
  };
}

function mapDispatchToProps(dispatch) {
  return {
    orderActions: bindActionCreators(OrderActions, dispatch)
  };
}

export default injectStripe(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
);