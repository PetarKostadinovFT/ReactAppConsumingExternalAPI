import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #000;
  color: white;
  text-align: center;
  padding: 1rem 0;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterText>&copy; 2023 My Article Hub</FooterText>
    </FooterContainer>
  );
}

export default Footer;
