import { useContext } from "react";
import mStyle from "./frn.module.css";
import styled from "styled-components";
import FormBasicInfo from "./Components/FormBasicInfo";
import FormAttachment from "./Components/FormAttachment";
import FormImageDesc from "./Components/FormImageDesc";
import FormContext from "./FormContext";
import ConnSetting from "./Context/ConnSetting";
import axios from "axios";

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
  const {
    markdownText,
    projectName,
    releaseDate,
    imageTitle,
    imageSubtitle,
    NLRSignature,
    NLR2Signature,
    LRSignature,
    files,
  } = useContext(FormContext);

  const { BackendAddress, BackendPort } = useContext(ConnSetting);

  const saveImage = () => {
    console.log("Save Image");
    let form = new FormData();
    let basicInformation = {
      projectName: projectName,
      releaseDate: releaseDate,
      imageTitle: imageTitle,
      imageSubtitle: imageSubtitle,
      NLRSignature: NLRSignature,
      NLR2Signature: NLR2Signature,
      LRSignature: LRSignature,
    };
    form.append("Release Description", markdownText);
    form.append("Basic Information", JSON.stringify(basicInformation));
    for (let i = 0; i < files.list.length; i++) {
      form.append("files", files.list[i]);
    }

    axios({
      method: "post",
      headers: {
        "Content-Type": "",
        "Access-Control-Allow-Origin": "*",
      },
      url: `http://${BackendAddress}:${BackendPort}/frn/addimage`,
      data: form,
    }).then((response) => {
      console.log(response);
    });
  };

  console.log(`http://${BackendAddress}:${BackendPort}/frn/addimage`);

  return (
    <Bar className={mStyle.slideIn}>
      <FormBasicInfo></FormBasicInfo>
      <FormAttachment></FormAttachment>
      <FormImageDesc></FormImageDesc>
      <button onClick={() => saveImage()}>Submit</button>
    </Bar>
  );
};
export default FormBar;
