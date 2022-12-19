import mStyle from "./frn.module.css";

const ImageThumbnail = (props) => {
  const data = props.data;
  return (
    <div
      className={mStyle.imageCard}
      onClick={() => props.contentSelect(props.data)}
    >
      {/* <a href="#"> */}
      <div className={mStyle.imageCardContent}>
        <div>
          <h1>{data.title}</h1>
          <p className={`${mStyle.subtitle}`}>{data.subtitle}</p>

          <table style={{ marginLeft: "20px" }}>
            <tbody>
              <tr>
                <th>NLR</th>
                <td>lkasjdlkajskldjaskldjalksjdklasdklasjdlkasjdlkajslkdsja</td>
              </tr>
              <tr>
                <th>NLR2</th>
                <td>lkasjdlkajskldjaskldjalksjdklasdklasjdlkasjdlkajslkdsja</td>
              </tr>
              <tr>
                <th>LR</th>
                <td>lkasjdlkajskldjaskldjalksjdklasdklasjdlkasjdlkajslkdsja</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={`${mStyle.releaseDate}`}>{data.releaseDate}</p>
      </div>
      {/* </a> */}
    </div>
  );
};

export default ImageThumbnail;
