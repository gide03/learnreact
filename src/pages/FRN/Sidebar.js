import { React, useEffect, useContext } from "react";
import ItemGroup from "./Components/ItemGroup";
import styled, { ThemeProvider } from "styled-components";
import axios from "axios";
import SidebarContext from "./Context/SidebarContext";
import ConnSetting from "./Context/ConnSetting";

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
const FRNSidebar = (props) => {
  const { setActiveProject, setProjectList } = useContext(SidebarContext);
  const { BackendAddress, BackendPort } = useContext(ConnSetting);

  const mTheme = {
    width: props.width,
    top: props.top,
  };

  useEffect(() => {
    axios({
      method: "get",
      url: `http://${BackendAddress}:${BackendPort}/frn/projectlist`,
    }).then((response) => {
      setProjectList(response.data.payload);
      setActiveProject(response.data.payload[0]);
    });
  }, [setProjectList, setActiveProject, BackendAddress, BackendPort]);

  return (
    <ThemeProvider theme={mTheme}>
      <SideBarContainer>
        <ItemGroup></ItemGroup>
      </SideBarContainer>
    </ThemeProvider>
  );
};

export default FRNSidebar;
