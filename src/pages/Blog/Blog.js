// import { useState } from "react";
import React from "react";
import styles from "./blogstyle.module.css";
import IDCard from "../../components/IDCard/IDCard";
import sample from "./sample.png";
import { ReactP5Wrapper } from "react-p5-wrapper";

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
          <a href="/">
            <img src={sample} alt="sample"></img>
          </a>
        </div>
        <h1 className={`${styles.entryTitle}`}>
          <a href="/">Bayessian Estimation</a>
        </h1>
        <div className={`${styles.entryContent}`}>
          <p>
            In this post I will write about my first impression study Bayess
            theorem in as a tool in estimating an event, and give some tips to
            undestanding behind the theorem
          </p>
          <div style={{ width: "100%", display: "flex" }}>
            <a href="/" className={`${styles.readmoreBt}`}>
              Continue Reading ...
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const FindPhi_1 = (s) => {
  let num_of_greens = 0;
  // let num_of_reds = 0;
  let num_of_points = 0;

  s.setup = () => {
    s.createCanvas(400, 400);
    s.background(0);
  };

  s.draw = () => {
    s.noFill();
    s.stroke(0, 200, 200);
    // circle(200,200,width);
    s.circle(0, 0, s.width * 2);

    s.fill(0);
    s.stroke(200, 200, 0);
    s.rect(8, s.height - 50, 264, 35);
    s.noStroke();
    s.fill(255);
    s.textSize(16);
    num_of_points++;
    s.text(
      `Estimate phi: ${(4 * num_of_greens) / num_of_points}`,
      12,
      s.height - 25
    );

    let _x = Math.floor(Math.random() * s.width);
    let _y = Math.floor(Math.random() * s.height);
    s.noStroke();

    let _z = Math.sqrt(_x ** 2 + _y ** 2);
    if (_z <= s.width) {
      s.fill(0, 255, 0);
      num_of_greens++;
    } else {
      s.fill(255, 0, 0);
      // num_of_reds++;
    }
    s.circle(_x, _y, 5);
  };
};

const Blog = () => {
  return (
    <>
      <Header></Header>

      <div className={`${styles.mainContent}`}>
        <PostCard></PostCard>
      </div>
      <div>
        {/* <ReactP5Wrapper id="find-phi" sketch={FindPhi_1}></ReactP5Wrapper> */}
      </div>
      <IDCard></IDCard>
    </>
  );
};

export default Blog;
