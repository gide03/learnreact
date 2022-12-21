import styled, { ThemeProvider } from "styled-components";
import SidebarContext from "../Context/SidebarContext";
import { useContext } from "react";

/**
 * Expected to placed inside side bar
 */
const Item = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  height: 1.75rem;
  padding-left: 0.5em;
  user-select: none;
  background-color: ${(props) =>
    props.theme.isActive ? "#026dd9" : "#9f9f9f"};

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding-left: 0.2em;
    transition: all 0.2s;
    background-color: ${(props) =>
      props.theme.isActive ? "#bfbfbf" : "#cfcfcf"};
  }
  div:hover {
    background-color: ${(props) =>
      props.theme.isActive ? "#bfbfbf" : "#afafaf"};
  }
  :hover {
    background-color: ${(props) =>
      props.theme.isActive ? "#026dd9" : "#9f9f9f;"};
    cursor: pointer;
  }
`;
Item.defaultProps = {
  isActive: false,
};

/**
 *
 * @param {projectname, iconpath} props
 * @returns
 */
const ProjectItem = (props) => {
  const { activeProject, setActiveProject } = useContext(SidebarContext);

  const mTheme = {
    isActive: activeProject === props.projectname,
  };
  return (
    <ThemeProvider theme={mTheme}>
      <Item onClick={() => setActiveProject(props.projectname)}>
        <div>
          <span style={{ width: "100%" }}>{props.projectname}</span>
        </div>
      </Item>
    </ThemeProvider>
  );
};

export default ProjectItem;
