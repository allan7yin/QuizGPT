import { Container } from "@mui/system";
import styled from "styled-components";

const LeftContainer = styled(Container)`
  flex: 0 0 50%;
  box-sizing: border-box;
  background-color: white;
  padding-top: 7%;
`;

const RightContainer = styled(Container)`
  flex: 0 0 50%;
  box-sizing: border-box;
  background-color: #f7f6f0;
  color: #f7f6f0;
  padding: 9%;
`;

const Content = styled.div`
  color: #f7f6f0;
`;

const CustomImage = styled("img")({
  maxWidth: "70%",
  maxHeight: "70%",
  OObjectPosition: "cover",
});

const EncapsulatingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  min-height: 100vh;
`;

const Form = styled("form")({
  float: "none",
  marginLeft: "15%",
  width: "70%",
  justifyContent: "center",
});

export {
  Content,
  CustomImage,
  EncapsulatingContainer,
  Form,
  LeftContainer,
  RightContainer,
};
