import { React } from "react";
import ItemGroup from "./Components/ItemGroup";
import styled, { ThemeProvider } from "styled-components";

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  width: 25%;
  max-width: 400px;
  overflow-x: hidden;
`;
SideBarContainer.defaultProps = {
  width: "100%",
  top: "0",
};

/**
 *
 * @param {px} props.width for width
 * @param {px} props.top for margin top
 * @returns component
 */
const FRN_SideBar = (props) => {
  const mTheme = {
    width: props.width,
    top: props.top,
  };

  return (
    <ThemeProvider theme={mTheme}>
      <SideBarContainer>
        <ItemGroup></ItemGroup>
      </SideBarContainer>
    </ThemeProvider>
  );
};

export default FRN_SideBar;
