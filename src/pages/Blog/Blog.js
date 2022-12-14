import styles from "./blogstyle.module.css";
import IDCard from "../../components/IDCard/IDCard";
import sample from "./sample.png";

const Header = () => {
  return (
    <div className={`${styles.header}`} id="header">
      <h1>Welcome</h1>
    </div>
  );
};

const PostCard = () => {
  return (
    <>
      <div className={`${styles.postCard}`}>
        <div className={`${styles.entryImage}`}>
          <a href="">
            <img src={sample}></img>
          </a>
        </div>
        <h1 className={`${styles.entryTitle}`}>
          <a href="">Bayessian Estimation</a>
        </h1>
        <div className={`${styles.entryContent}`}>
          <p>
            In this post I will write about my first impression study Bayess
            theorem in as a tool in estimating an event, and give some tips to
            undestanding behind the theorem
          </p>
          <div className={`${styles.readmoreBt}`}>
            <a>Continue Reading ...</a>
          </div>
        </div>
      </div>
    </>
  );
};

const Blog = () => {
  return (
    <>
      <Header></Header>

      <div className={`${styles.mainContent}`}>
        <PostCard></PostCard>
      </div>
      <IDCard></IDCard>
    </>
  );
};

export default Blog;
