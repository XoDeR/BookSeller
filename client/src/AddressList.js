import React from "react";
import styled from "styled-components";
import { Radio } from "antd";
import AddressRadio from "./AddressRadio";

const RadioGroup = Radio.Group;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 50%;
  margin-left: 10%;
`;

const Div = styled.div`
  margin: 5%;
`;

class AddressList extends React.Component {
  state = {
    value: 0
  };

  onChange = e => {
    this.setState({
      value: e.target.value
    });
    this.props.addressIdSelected(e.target.value);
  };
  
  render() {
    const renderAddress = this.props.addressList.map((address, i) => {
      return (
        <Div key={i}>
          <Radio value={address.id}>
            <AddressRadio address={address} />
          </Radio>
        </Div>
      );
    });

    return (
      <Container>
        <RadioGroup onChange={this.onChange} value={this.state.value}>
          {renderAddress}
        </RadioGroup>
      </Container>
    );
  }
}

export default AddressList;