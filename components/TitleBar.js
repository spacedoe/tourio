import Link from "next/link";
import styled from "styled-components";
import { StyledLink } from "./StyledLink";

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  margin: 0;
  padding: 20px 0;
  text-align: center;
  z-index: 1;
  display: flex;
`;

const InnerHeader = styled.div`
  margin: auto;
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  justify-content: space-between;
  margin: auto;
  width: 100%;
  align-items: center;
  width: 100%;
  padding: 0 20px;
`;

export default function TitleBar() {
  return (
    <Header>
      <InnerHeader>
        <div style={{ flex: "1" }}></div>
        <h1 style={{ flex: "1" }}>Tourio</h1>
        <div style={{ flex: "1" }}>
          <StyledLink href="/create" passHref legacyBehavior>
            + place
          </StyledLink>
        </div>
      </InnerHeader>
    </Header>
  );
}
