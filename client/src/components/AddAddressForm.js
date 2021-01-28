import React from "react";
import styled from "styled-components";
import { Button, message } from "antd";
import Icon from '@ant-design/icons';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const ButtonGroup = Button.Group;

const Container = styled.div`
  max-width: 80%;
  margin: auto;
`;

const LabelInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
`;

const Wrapper = styled.div`
  margin-left: 35%;
  @media (max-width: 950px) {
    margin-left: 40%;
  }
  @media (max-width: 850px) {
    margin-left: 25%;
  }
  @media (max-width: 500px) {
    margin-left: 20%;
  }
`;

const Input = styled.input`
  flex: 1;
  width: 500px;
  margin-left: 20%;
  @media (max-width: 900px) {
    margin: 0%;
  }
  @media (max-width: 700px) {
    width: 100%;
  }
`;

const Label = styled.section`
  font-size:125%
  flex: 1;
  margin-left:20%;
  @media (max-width: 900px) {
    margin:0%;
  }
`;

class AddressForm extends React.Component {
  state = {
    formValid: false,
    addressLine: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  };

  handleUserInput = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  validateAddress = () => {
    const { addressLine, city, state, zip, country } = this.state;
    if (
      addressLine.trim().length !== 0 &&
      city.trim().length !== 0 &&
      state.trim().length !== 0 &&
      zip.trim().length !== 0 &&
      country.trim().length !== 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  getAddressValues = () => {
    const { addressLine, city, state, zip, country } = this.state;
    return {
      addressLine,
      city,
      state,
      zip,
      country
    };
  };

  submitNewAddress = () => {
    const isValidForm = this.validateAddress();
    const userId = this.props.user.id;
    const values = this.getAddressValues();
    if (isValidForm) {
      this.setState({ formValid: true });
      fetch(`/api/address/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then(response => {
          if (response.status === 201) {
            this.props.history.push("/checkout/address");
          } else {
            message.error("Network error: Address could not be added");
          }
        })
        .catch(error => console.error("Error:", error));
    } else {
      this.setState({ formValid: false });
      message.error("All fields are required");
    }
  };

  render() {
    return (
      <Container>
        <div>
          <br />
          <LabelInputWrapper>
            <Label>Address:</Label>
            <Input name="addressLine" onChange={this.handleUserInput} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>City:</Label>
            <Input name="city" onChange={this.handleUserInput} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>State:</Label>
            <Input name="state" onChange={this.handleUserInput} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>ZIP:</Label>
            <Input name="zip" onChange={this.handleUserInput} />
          </LabelInputWrapper>
          <LabelInputWrapper>
            <Label>Country:</Label>
            <Input name="country" onChange={this.handleUserInput} />
          </LabelInputWrapper>
          <LabelInputWrapper />
        </div>
        <br />
        <Wrapper>
          <ButtonGroup>
            <NavLink to="/checkout/address">
              <Button type="primary">
                <Icon type="left" />Go Back
              </Button>
            </NavLink>
            <Button type="primary" onClick={this.submitNewAddress}>
              Submit
            </Button>
          </ButtonGroup>
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
export default connect(mapStateToProps)(AddressForm);