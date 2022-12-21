import { useRef, useContext, useState, useEffect } from "react";
import Markdown from "react-remarkable";
import mStyle from "./frn.module.css";
import ImageThumbnail from "./Thumbnail";
import FormContext from "./FormContext";

async function getHash(algorithm, data) {
  const main = async (msgUint8) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // convert bytes to hex string
  };

  if (data instanceof Blob) {
    const arrayBuffer = await data.arrayBuffer();
    const msgUint8 = new Uint8Array(arrayBuffer);
    return await main(msgUint8);
  }
  const encoder = new TextEncoder();
  const msgUint8 = encoder.encode(data);
  return await main(msgUint8);
}

const MarkupEditor = () => {
  const { markdownText, setMarkdownText } = useContext(FormContext);
  const onInputChange = (e) => {
    const newValue = e.currentTarget.value;
    setMarkdownText(newValue);
  };

  return (
    <div
      className={`${mStyle.basicForm} ${mStyle.editor}`}
      style={{ marginBottom: "5px" }}
    >
      <div className={`${mStyle.formHeader}`}>Image Description</div>
      <textarea onChange={onInputChange} defaultValue={markdownText}></textarea>
    </div>
  );
};

const BasicInfo = (props) => {
  const {
    projectName,
    setProjectName,
    imageTitle,
    setImageTitle,
    imageSubtitle,
    setImageSubtitle,
    setReleaseDate,
    NLRSignature,
    setNLRSignature,
    NLR2Signature,
    setNLR2Signature,
    LRSignature,
    setLRSignature,
  } = useContext(FormContext);
  return (
    <div className={`${mStyle.basicInformationForm} ${mStyle.basicForm}`}>
      <div className={mStyle.formHeader}>Basic information</div>
      <table>
        <tbody>
          <tr>
            <th>Project Name</th>
            <td>
              <input
                type="text"
                id="project-name"
                name="project-name"
                defaultValue={projectName}
                onKeyUp={(e) => setProjectName(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>Image Title</th>
            <td>
              <input
                type="text"
                id="image-title"
                name="image-title"
                defaultValue={imageTitle}
                onKeyUp={(e) => setImageTitle(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>Image Subtitle</th>
            <td>
              <input
                type="text"
                id="image-subtitle"
                name="image-subtitle"
                defaultValue={imageSubtitle}
                onKeyUp={(e) => setImageSubtitle(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>Release date</th>
            <td>
              <input
                type="date"
                id="release-date"
                name="release-date"
                onChange={(e) => setReleaseDate(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>NLR Sign.</th>
            <td>
              <input
                type="text"
                id="NLR-signature"
                name="NLR-signature"
                defaultValue={NLRSignature}
                onKeyUp={(e) => setNLRSignature(e.currentTarget.value)}
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
                defaultValue={NLR2Signature}
                onKeyUp={(e) => setNLR2Signature(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
          <tr>
            <th>LR Sign.</th>
            <td>
              <input
                type="text"
                id="LR-signature"
                name="LR-signature"
                defaultValue={LRSignature}
                onKeyUp={(e) => setLRSignature(e.currentTarget.value)}
              ></input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const FileCard = (props) => {
  return (
    <div className={`${mStyle.fileCard}`} id={`${props.idx}`}>
      <div className={`${mStyle.fileCardFilename}`}>{props.file.name}</div>

      <div className={`${mStyle.fileCardFilename}`}>{props.sha256}</div>

      <label htmlFor={`cardTitle_${props.idx}`}>Type </label>
      <select id={`cardTitle_${props.idx}`}>
        <option value="IMFW">IMFW</option>
        <option value="CMFW">CMFW</option>
        <option value="OTA">OTA</option>
        <option value="OTHER">OTHER</option>
      </select>

      <br></br>
      <button
        className={`${mStyle.deleteButton}`}
        onClick={() => props.deleteElement(props.filename, props.idx)}
      >
        Remove
      </button>
    </div>
  );
};
const AttachmentForm = () => {
  const inputRef = useRef();
  const { files, setFiles } = useContext(FormContext); //useContext({ keys: [], list: [] }); // ["keys":["file_<random>", ...],"files":[File, ...]]
  const [SHA256, setSHA256] = useState([]);
  const appendFile = async (fileList) => {
    let _file_keys = [...files.keys];
    let _file_list = [...files.list];
    let sha256 = [...SHA256];

    for (let i = 0; i < Array.from(fileList).length; i++) {
      while (true) {
        const _key = `file_${Math.floor(Math.random() * 999)}`; // Make sure key is unique and update files queue
        if (!files.keys.includes(_key)) {
          _file_keys.push(_key);
          _file_list.push(fileList[i]);
          sha256.push(await getHash("SHA-256", new Blob([fileList[i]])));
          break;
        }
      }
      setFiles({ keys: _file_keys, list: _file_list });
      setSHA256(sha256);
    }
  };

  const handlerDeleteElement = async (fname, fidx) => {
    const _key = [...files.keys].filter((k, idx) => k !== fidx);
    const _list = [...files.list].filter((f) => f.name !== fname);
    let sha256 = [];
    setFiles({ keys: _key, list: _list });

    for (let i = 0; i < _list.length; i++) {
      sha256.push(await getHash("SHA-256", new Blob([_list[i]])));
    }
    setSHA256(sha256);
  };

  return (
    <div className={`${mStyle.attachmentForm} ${mStyle.basicForm}`}>
      <div className={`${mStyle.dropBox}`}>
        <h3>Drag and Drop Files to Upload</h3>
        <h3>Or</h3>
        <input
          type="file"
          accept="application/zip"
          multiple
          onChange={async (event) => appendFile(event.target.files)}
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
        <ul>
          {files.keys.map((_key, idx) => (
            <li key={_key}>
              <FileCard
                sha256={SHA256[idx]}
                file={files.list[idx]}
                deleteElement={handlerDeleteElement}
                idx={_key}
              ></FileCard>
            </li>
          ))}
        </ul>
        <div className={`${mStyle.attachmentContainer}`}></div>
      </div>
    </div>
  );
};

const FormBar = () => {
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
  const [projectName, setProjectName] = useState("Project Name");
  const [imageTitle, setImageTitle] = useState("Image Title");
  const [imageSubtitle, setImageSubtitle] = useState("Image Subtitle");
  const [releaseDate, setReleaseDate] = useState("Release Date");
  const [NLRSignature, setNLRSignature] = useState("NLR Signature");
  const [NLR2Signature, setNLR2Signature] = useState("NLR2 Signature");
  const [LRSignature, setLRSignature] = useState("LR Signature");
  const [selectedFiles, setSelectedFiles] = useState("");
  const [files, setFiles] = useState({ keys: [], list: [] });

  const contextValue = {
    markdownText,
    setMarkdownText,
    projectName,
    setProjectName,
    releaseDate,
    setImageTitle,
    imageTitle,
    setReleaseDate,
    imageSubtitle,
    setImageSubtitle,
    NLRSignature,
    setNLRSignature,
    NLR2Signature,
    setNLR2Signature,
    LRSignature,
    setLRSignature,
    selectedFiles,
    setSelectedFiles,
    files,
    setFiles,
  };

  const thumbnailData = {
    title: imageTitle,
    subtitle: imageSubtitle,
    releaseDate: releaseDate,
    NLR: NLRSignature,
    NLR2: NLR2Signature,
    LR: LRSignature,
  };

  return (
    <FormContext.Provider value={contextValue}>
      <div className={`${mStyle.mainForm}`}>
        <BasicInfo></BasicInfo>
        <AttachmentForm></AttachmentForm>
        <MarkupEditor></MarkupEditor>
        <button>Submit</button>
      </div>
      <div className={`${mStyle.renderedForm}`}>
        <div className={`${mStyle.formHeader}`}>
          <h1>Rendered Image</h1>
        </div>
        <div className={`${mStyle.thumbnailContainer}`}>
          <h2>Rendered Thumbnail</h2>
          <ImageThumbnail
            data={thumbnailData}
            contentSelect={() => {}}
          ></ImageThumbnail>
        </div>
        <div className={`${mStyle.thumbnailContainer}`}>
          <h2>Rendered Image Detail</h2>
          <Markdown source={`${markdownText}`}></Markdown>
        </div>
      </div>
    </FormContext.Provider>
  );
};

export default FormBar;
