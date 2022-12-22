import mStyle from "./frn.module.css";
import styled from "styled-components";
import FormBasicInfo from "./Components/FormBasicInfo";
import FormAttachment from "./Components/FormAttachment";
import FormImageDesc from "./Components/FormImageDesc";

const Bar = styled.div`
  width: 40%;
  height: 100%;
  flex-direction: column;
  background-color: #efefef;
  display: flex;
  align-items: center;

  overflow-x: hidden;
`;

const FormBar = () => {
  return (
    <Bar className={mStyle.slideIn}>
      <FormBasicInfo></FormBasicInfo>
      <FormAttachment></FormAttachment>
      <FormImageDesc></FormImageDesc>
      <button onClick={() => console.log("submit form")}>Submit</button>
    </Bar>
  );
};

export default FormBar;
