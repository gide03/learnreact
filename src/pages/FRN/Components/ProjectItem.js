import styled from "styled-components";

/**
 * Expected to placed inside side bar
 */
const Item = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  margin-bottom: 2px;
  font-size: 0.7rem;
  transition: all 0.4s;
  height: 2.5rem;
  padding: 0px 10px 0px 10px;

  :hover {
    background-color: #efefef;
    cursor: pointer;
  }

  div {
    margin-right: 10px;
  }
`;

/**
 *
 * @param {projectname, iconpath} props
 * @returns
 */
const ProjectItem = (props) => {
  return (
    <Item>
      <div>X</div>
      <div>{props.projectname}</div>
    </Item>
  );
};

export default ProjectItem;
