import React from "react";
import styled from "styled-components";

const Container = styled.span`
  max-width: 100px;
  overflow-wrap: break-word;
  font-weight: 400;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
`;
const AddressRadio = ({ address }) => {
  return (
    <Container>
      {address.addressLine}
      <br />
        {address.city}
      <br />
      {address.state} - {address.zip} , {address.country}
    </Container>
  );
};

export default AddressRadio;
