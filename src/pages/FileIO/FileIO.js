import styles from "./FileIO.module.css";
import uploadIco from "./logo192.png";
import { useState, useRef } from "react";
// import crossico from "./cross_ico.svg";
// import zipico from "./zip_ico.svg";

const FileCard = (props) => {
  // console.log(props);
  return (
    <div className={`${styles.fileCard}`} id={`${props.idx}`}>
      <div style={{ width: "calc(100% - 40px)" }}>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <td>
                {/* <input type="text" placeholder=""></input> */}
                <select id={`cardTitle_${props.idx}`}>
                  <option value="IMFW">IMFW</option>
                  <option value="CMFW">CMFW</option>
                  <option value="OTA">OTA</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>Filename</th>
              <td id={`cardFilename_${props.idx}`}>{props.filename}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                <textarea id={`cardDescription_${props.idx}`}></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <button onClick={whoAmI}>Who am I</button> */}
      <button
        className={`${styles.deleteButton}`}
        onClick={() => props.deleteElement(props.filename, props.idx)}
      >
        <div className={`${styles.deleteIcon}`}>
          <span></span>
          <span></span>
        </div>
      </button>
    </div>
  );
};

const FileIO = () => {
  const [files, setFiles] = useState({ keys: [], list: [] }); // ["keys":["file_<random>", ...],"files":[File, ...]]
  const inputRef = useRef();

  document.title = "File IO";

  const handleDrop = (event) => {
    event.preventDefault();
    appendFile(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

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

  const handlerDeleteElement = (fname, fidx) => {
    const _key = [...files.keys].filter((k, idx) => k !== fidx);
    const _list = [...files.list].filter((f) => f.name !== fname);
    setFiles({ keys: _key, list: _list });
  };

  //POST AJAX FORM
  const uploadForm = async (m_form) => {
    // const response = await fetch("http://localhost:5000/frn/file/upload", {
    //   method: "post",
    //   body: m_form,
    // });
    // console.log(response);

    // For reference
    let ajax = new XMLHttpRequest();
    // ajax.upload.addEventListener('progress')
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("load", completeHandler, false);
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", "http://localhost:5000/frn/file/upload");
    ajax.send(m_form);
  };

  const progressHandler = (event) => {
    _("loaded_n_total").innerHTML =
      "Uploaded " + event.loaded + " bytes of " + event.total;
    var percent = (event.loaded / event.total) * 100;
    _("progressBar").value = Math.round(percent);
    _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
  };

  const completeHandler = (event) => {
    _("status").innerHTML = event.target.responseText;
    _("progressBar").value = 0; //wil clear progress bar after successful upload
  };

  const errorHandler = (event) => {
    _("status").innerHTML = "Upload Failed";
  };

  const abortHandler = (event) => {
    _("status").innerHTML = "Upload Aborted";
  };

  const _ = (el) => {
    return document.getElementById(el);
  };

  const handlerUploadData = () => {
    let projectName = document.getElementById("input-project-name").value;
    let m_form = new FormData();
    let dummyPayload = {
      Title: {
        VERSION: "08.26",
        NLR: "08.26",
        NLR2: "08.24",
        LR: "08.24",
      },

      Table: {
        "Release Date": "2 January 1997",
        Signatures: {
          NLR: "Click here for NLR",
          NLR2: "Click here for NLR2",
          LR: "Click here for LR",
        },
        Notes: "Install via USB",
      },
    };

    m_form.append("FRN", JSON.stringify(dummyPayload));
    m_form.append("Project Name", projectName);
    m_form.append("Pulblisher", "Anonym");

    // If File attached
    if (files.keys.length > 0) {
      // Fill images information
      let imageInformation = [];
      for (let i = 0; i < files.keys.length; i++) {
        let _key = files.keys[i];
        let cardTitleSelection = document.getElementById(
          `cardTitle_${_key}`
        ).value;
        let cardFilename = document.getElementById(
          `cardFilename_${_key}`
        ).textContent;
        let cardDescription = document.getElementById(
          `cardDescription_${_key}`
        ).value;
        console.log(cardTitleSelection);
        console.log(cardFilename);
        console.log(cardDescription);

        imageInformation.push({
          cardTitle: cardTitleSelection,
          cardFilename: cardFilename,
          cardDescription: cardDescription,
        });
      }

      // m_form.append("ImagesInformation", JSON.stringify(imageInformation));

      for (let i = 0; i < files.list.length; i++) {
        // console.log(`add form #${i}`);
        m_form.append("file", files.list[i]);
      }
    }

    uploadForm(m_form);
  };

  return (
    <>
      <div className={`${styles.MainContainer}`}>
        {/* {!files && ( */}
        <div
          className={`${styles.FileIOContainer}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <img
            alt="uploadicon"
            src={uploadIco}
            width="50px"
            height="50px"
          ></img>
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

        <div className={`${styles.fileCardWrapper}`}>
          <div className={`${styles.cardWrapperPanel}`}>
            <div>
              <label htmlFor="">Project Name </label>
              <input
                id="input-project-name"
                type="text"
                placeholder="Project Name"
              ></input>
            </div>
            <button className={`${styles.closeButton}`}>Clear</button>
          </div>
          <ul>
            {files.keys.map((_key, idx) => (
              <li key={_key}>
                <FileCard
                  filename={files.list[idx].name}
                  deleteElement={handlerDeleteElement}
                  idx={_key}
                ></FileCard>
              </li>
            ))}
          </ul>

          <button
            className={`${styles.btSubmit}`}
            onClick={() => handlerUploadData()}
          >
            Submit
          </button>
        </div>
      </div>

      <div className={`${styles.progressBar} ${styles.hide}`}>
        <progress
          id="progressBar"
          value="0"
          max="100"
          style={{ width: "300px" }}
        ></progress>
        <br></br>
        <h3 id="status"> </h3>
        <p id="loaded_n_total"></p>
      </div>
    </>
  );
};

export default FileIO;
