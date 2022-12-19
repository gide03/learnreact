import { useRef, useContext, useState } from "react";
import EditorContext from "./EditorContext";
import Markdown from "react-remarkable";
import mStyle from "./frn.module.css";
import ImageThumbnail from "./Thumbnail";
import FormContext from "./FormContext";

const MarkInput = () => {
  const { markdownText, setMarkdownText } = useContext(EditorContext);
  const { basicInfo, setBasicInfo } = useContext(FormContext);
  const onInputChange = (e) => {
    // console.log("hi");
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
    console.log(markdownText);
  };

  const textAreaDefaultValue = `
  # Image Description
  ...
  
  # Signatures
  |Type|Signature|
  |----|---------|
  |NLR |...|
  |NLR2|...|
  |LR  |...|
  
  # Release Note
  ...
  
  # Changes Log
  1.
  2.`;

  return (
    <div
      className={`${mStyle.container} ${mStyle.editor}`}
      style={{ marginBottom: "5px" }}
    >
      <div>Image Description</div>
      <textarea
        onChange={onInputChange}
        defaultValue={textAreaDefaultValue}
      ></textarea>
    </div>
  );
};

const MarkResult = () => {
  // const { markDowntext } = useContext(EditorContext);
  const { markdownText, setMarkdownText } = useContext(EditorContext);

  return (
    <div
      className={`${mStyle.container} ${mStyle.result}`}
      style={{ marginBottom: "5px" }}
    >
      <Markdown source={`${markdownText}`}></Markdown>
    </div>
  );
};

const BasicInfo = (props) => {
  return (
    <div className={`${mStyle.basicInformationForm}`}>
      <div className={mStyle.formHeader}>Basic information</div>
      <table>
        <tbody>
          <tr>
            <th>Project Name</th>
            <td>
              <input type="text" id="project-name" name="project-name"></input>
            </td>
          </tr>
          <tr>
            <th>Image Title</th>
            <td>
              <input type="text" id="image-title" name="image-title"></input>
            </td>
          </tr>
          <tr>
            <th>Image Title</th>
            <td>
              <input type="date" id="release-data" name="release-date"></input>
            </td>
          </tr>
          <tr>
            <th>NLR Sign.</th>
            <td>
              <input
                type="text"
                id="NLR-signature"
                name="NLR-signature"
              ></input>
            </td>
          </tr>
          <tr>
            <th>NLR2 Sign.</th>
            <td>
              <input
                type="text"
                id="NLR2-signature"
                name="NLR2-signature"
              ></input>
            </td>
          </tr>
          <tr>
            <th>LR Sign.</th>
            <td>
              <input type="text" id="LR-signature" name="LR-signature"></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const AttachmentForm = () => {
  // const contextBasicInfor = {
  //   basicInfo,
  //   setBasicInfo,
  // };

  const inputRef = useRef();
  const [files, setFiles] = useState({ keys: [], list: [] }); // ["keys":["file_<random>", ...],"files":[File, ...]]
  const appendFile = (fileList) => {
    let _file_keys = [...files.keys];
    let _file_list = [...files.list];

    for (let i = 0; i < Array.from(fileList).length; i++) {
      while (true) {
        const _key = `file_${Math.floor(Math.random() * 999)}`; // Make sure key is unique and update files queue
        if (!files.keys.includes(_key)) {
          _file_keys.push(_key);
          _file_list.push(fileList[i]);
          break;
        }
      }
      setFiles({ keys: _file_keys, list: _file_list });
    }
  };

  return (
    <div className={`${mStyle.attachmentForm}`}>
      <div className={`${mStyle.dropBox}`}>
        <h3>Drag and Drop Files to Upload</h3>
        <h3>Or</h3>
        <input
          type="file"
          accept="application/zip"
          multiple
          onChange={(event) => appendFile(event.target.files)}
          hidden
          ref={inputRef}
        ></input>
        <button onClick={() => inputRef.current.click()}>Select Files</button>
      </div>
      <div className={`${mStyle.fileList}`} id="file-list">
        <div className={`${mStyle.fileListToolBar}`}>
          File List
          <button>Clear</button>
        </div>
        <div className={`${mStyle.attachmentContainer}`}></div>
      </div>
    </div>
  );
};

const FRNForm = (props) => {
  const [markdownText, setMarkdownText] = useState(`
  # Image Description
  ...
  
  # Signatures
  |Type|Signature|
  |----|---------|
  |NLR |...|
  |NLR2|...|
  |LR  |...|
  
  # Release Note
  ...
  
  # Changes Log
  1.
  2.
    `);
  const contextValue = {
    markdownText,
    setMarkdownText,
  };

  const dummyData = {
    title: "DUMMY TITLE",
    subtitle: "Dummy subtitle",
    releasedate: "Dummy release date",
  };

  return (
    <>
      <div className={`${mStyle.mainForm}`}>
        <BasicInfo></BasicInfo>
        <AttachmentForm></AttachmentForm>
        <MarkInput></MarkInput>
        <button>Submit</button>
      </div>
      <div className={`${mStyle.renderedForm}`}>
        <div className={`${mStyle.formHeader}`}>
          <h1>Rendered Image</h1>
        </div>
        <div className={`${mStyle.thumbnailContainer}`}>
          <h2>Rendered Thumbnail</h2>
          <ImageThumbnail
            data={dummyData}
            contentSelect={() => {}}
          ></ImageThumbnail>
        </div>
        <div className={`${mStyle.thumbnailContainer}`}>
          <h2>Rendered Image Detail</h2>
          <Markdown source={`${markdownText}`}></Markdown>
        </div>
      </div>
    </>
  );
};

export default FRNForm;
