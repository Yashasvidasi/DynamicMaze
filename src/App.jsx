import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file
import playerImg2 from "./download8.gif";
import playerImg1 from "./download9.gif";
import playerImg3 from "./download10.gif";
import ded from "./ded.png";
import ded2 from "./ded2.png";
import ded3 from "./ded3.png";

import exitImg from "./exit1.png";
import ghostImg1 from "./download3.gif";
import ghostImg2 from "./download4.gif";
import ghostImg3 from "./download5.gif";
import ghostImg4 from "./download7.gif";
import logo from "./logo.png";
import arrow from "./arrow.png";
import { motion } from "framer-motion";

const imageStyle = {
  width: "55px", // Adjust the width as per your requirement
  height: "55px", // Maintain aspect ratio
};

// Define component function
function App() {
  let solution = [];
  const [factd, setfactd] = useState(false);
  const [facta, setfacta] = useState(false);
  const [factb, setfactb] = useState(false);
  const [errortext, seterrortext] = useState("");
  const [result1, setresult1] = useState(false);
  const [result2, setresult2] = useState(false);
  const [result3, setresult3] = useState(false);
  const [buttontext, setbuttontext] = useState("RESET");
  const [submit, setsubmit] = useState(false);
  const [sol, setsol] = useState([]);
  const [sol2, setsol2] = useState([]);
  const [fullghost, setfullghost] = useState([]);
  const [sol3, setsol3] = useState([]);
  const [playerLoc1, setplayerLoc1] = useState([]);
  const [playerLoc2, setplayerLoc2] = useState([]);
  const [playerLoc3, setplayerLoc3] = useState([]);
  const [max_steps1, setmax_steps1] = useState("");
  const [max_steps2, setmax_steps2] = useState("");
  const [max_steps3, setmax_steps3] = useState("");
  const [exitLoc, setExitLoc] = useState([]);
  const [ghostsHorizontal, setGhostsHorizontal] = useState([]);
  const [ghostsDiagonalTopRight, setGhostsDiagonalTopRight] = useState([]);
  const [ghostsDiagonalBottomRight, setGhostsDiagonalBottomRight] = useState(
    []
  );
  const [counter, setCounter] = useState(0);
  const [ghostsVertical, setGhostsVertical] = useState([]);
  const [input, setInput] = useState(0);
  const [insertText, setInsertText] = useState("Insert Players Location");
  const [maxt, setmaxt] = useState(0);

  const checker_player = (a, b) => {
    let x = playerLoc1[0];
    let y = playerLoc1[1];
    var minX = x - 1;
    var maxX = x + 1;
    var minY = y - 1;
    var maxY = y + 1;

    if (a >= minX && a <= maxX && b >= minY && b <= maxY) {
      seterrortext("ERROR: A ghost cannot start adjacent to player");
      return true;
    } else {
      return false;
    }
  };

  const checker_exit = (a, b) => {
    let x = exitLoc[0];
    let y = exitLoc[1];
    var minX = x - 1;
    var maxX = x + 1;
    var minY = y - 1;
    var maxY = y + 1;

    if (a >= minX && a <= maxX && b >= minY && b <= maxY) {
      seterrortext("ERROR: A ghost cannot start adjacent to exit");
      return true;
    } else {
      return false;
    }
  };

  const handleClick = (x, y) => {
    if (input === 0) {
      setplayerLoc1([x, y]);
      setplayerLoc2([x, y]);
      setplayerLoc3([x, y]);
      setInsertText("Insert Exit location");
      seterrortext("");
    } else if (input === 1) {
      if (checker_player(x, y)) {
        seterrortext("ERROR: Exit cannot be adjacent to the player");
        return;
      }
      setExitLoc([x, y]);
      setInsertText(`Insert ${3 - input + 1} VERTICAL Ghosts Location`);
      seterrortext("");
    } else if (input < 4) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        return;
      }
      setInsertText(`Insert ${3 - input + 1} VERTICAL Ghosts Location`);
      setGhostsHorizontal([...ghostsHorizontal, [x, y]]);
      seterrortext("");
    } else if (input === 4) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        return;
      }
      setInsertText(`Insert ${7 - input} HORIZONTAL Ghosts Location`);
      setGhostsHorizontal([...ghostsHorizontal, [x, y]]);
      seterrortext("");
    } else if (input < 7) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        return;
      }
      setInsertText(`Insert ${7 - input} HORIZONTAL Ghosts Location`);
      setGhostsVertical([...ghostsVertical, [x, y]]);
      seterrortext("");
    } else if (input === 7) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        return;
      }
      seterrortext("");
      setInsertText(`Insert ${10 - input} DIAGONAL Ghosts Location`);
      setGhostsVertical([...ghostsVertical, [x, y]]);
    } else if (input < 10) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        return;
      }
      setInsertText(`Insert ${10 - input} DIAGONAL Ghosts Location`);
      setGhostsDiagonalTopRight([...ghostsDiagonalTopRight, [x, y]]);
      seterrortext("");
    } else if (input === 10) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        return;
      }
      setInsertText(`Insert ${13 - input} OPPOSITE DIAGONAL Ghosts Location`);
      setGhostsDiagonalTopRight([...ghostsDiagonalTopRight, [x, y]]);
      seterrortext("");
    } else if (input < 13) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        s;
        return;
      }
      setInsertText(`Insert ${13 - input} OPPOSITE DIAGONAL Ghosts Location`);
      setGhostsDiagonalBottomRight([...ghostsDiagonalBottomRight, [x, y]]);
      seterrortext("");
    } else if (input === 13) {
      if (checker_player(x, y) || checker_exit(x, y)) {
        return;
      }
      setbuttontext("START");
      setInsertText("Press START");
      setGhostsDiagonalBottomRight([...ghostsDiagonalBottomRight, [x, y]]);
      seterrortext("");
    }
    setInput(input + 1);
    console.log(ghostsHorizontal, ghostsVertical, playerLoc1, exitLoc);
    seterrortext("");
  };

  // Function to render the grid
  const renderGrid = () => {
    const grid = [];
    let c = 0;
    // Create grid of labels
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let contents = [];

        if (playerLoc1[0] === x && playerLoc1[1] === y) {
          contents.push(
            <img
              key="player1"
              src={playerImg1}
              alt="player"
              style={imageStyle}
            />
          );
        }
        if (playerLoc2[0] === x && playerLoc2[1] === y) {
          contents.push(
            <img
              key="player2"
              src={playerImg2}
              alt="player"
              style={imageStyle}
            />
          );
        }
        if (playerLoc3[0] === x && playerLoc3[1] === y) {
          contents.push(
            <img
              key="player3"
              src={playerImg3}
              alt="player"
              style={imageStyle}
            />
          );
        }
        if (exitLoc[0] === x && exitLoc[1] === y) {
          contents.push(<img key="exit" src={exitImg} alt="exit" />);
        }
        ghostsHorizontal.forEach((ghost) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <img
                key={`horizontal-${x}-${y}-${c}`}
                src={ghostImg1}
                alt="ghost"
                style={imageStyle}
              />
            );
          }
          c += 1;
        });
        ghostsVertical.forEach((ghost) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <img
                key={`vertical-${x}-${y}-${c}`}
                src={ghostImg2}
                alt="ghost"
                style={imageStyle}
              />
            );
          }
          c += 1;
        });
        ghostsDiagonalTopRight.forEach((ghost) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <img
                key={`diagonal-top-right-${x}-${y}-${c}`}
                src={ghostImg3}
                alt="ghost"
                style={imageStyle}
              />
            );
          }
          c += 1;
        });
        ghostsDiagonalBottomRight.forEach((ghost) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <img
                key={`diagonal-bottom-right-${x}-${y}-${c}`}
                src={ghostImg4}
                alt="ghost"
                style={imageStyle}
              />
            );
          }
          c += 1;
        });

        grid.push(
          <div
            key={`${x}-${y}`}
            className="grid-item"
            onClick={() => handleClick(x, y)}
          >
            {contents}
          </div>
        );
      }
    }
    return grid;
  };

  /*const show_solution = async (sol) => {
    sol.forEach((item, i) => {
      setTimeout(() => {
        setCounter((prevCounter) => prevCounter + 1);
        setplayerLoc1(item[0]);
        setGhostsHorizontal(item[1][0]);
        setGhostsVertical(item[1][1]);
        setGhostsDiagonalTopRight(item[1][2]);
        setGhostsDiagonalBottomRight(item[1][3]);
      }, i * 1000);
    });
  };*/

  const teleportPlayer = (playerIndex, newX, newY) => {
    // Update the player location based on the index
    switch (playerIndex) {
      case 0:
        setplayerLoc1([newX, newY]);

        break;
      case 1:
        setplayerLoc2([newX, newY]);
        break;
      case 2:
        setplayerLoc3([newX, newY]);
        break;
      default:
        break;
    }
    renderGrid();
  };

  const [animationComplete1, setAnimationComplete1] = useState(false);
  const [animationComplete2, setAnimationComplete2] = useState(false);
  const [animationComplete3, setAnimationComplete3] = useState(false);

  const handleAnimationComplete1 = () => {
    setAnimationComplete1(true);
  };
  const handleAnimationComplete2 = () => {
    setAnimationComplete2(true);
  };
  const handleAnimationComplete3 = () => {
    setAnimationComplete3(true);
  };

  const final_solution = () => {
    const maxLength = Math.max(
      sol[0].length - 1,
      sol2[0].length - 1,
      sol3[0].length - 1,
      20
    );

    // Calculate the transition duration for each player based on the ratio of their array lengths to the maximum length
    const transitionDuration1 =
      ((sol[0].length - 1) / maxLength) * (maxLength - 5);
    const transitionDuration2 =
      ((sol2[0].length - 1) / maxLength) * (maxLength - 5);
    const transitionDuration3 =
      ((sol3[0].length - 1) / maxLength) * (maxLength - 5);
    const transitionDuration4 =
      ((fullghost[2][0][1].length - 1) / maxLength) * (maxLength - 5);
    //setmaxt();
    startTimer1(transitionDuration1);
    startTimer2(transitionDuration2);
    startTimer3(transitionDuration3);
    const grid = [];
    let c = 0;
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        let contents = [];
        if (playerLoc1[0] === x && playerLoc1[1] === y) {
          contents.push(
            <motion.img
              key="player"
              src={
                facta ? (animationComplete1 ? ded2 : playerImg1) : playerImg1
              }
              alt="player"
              style={
                facta
                  ? animationComplete1
                    ? { zIndex: 11, height: "40px" }
                    : imageStyle
                  : animationComplete1
                  ? { display: "none" }
                  : imageStyle
              }
              animate={{ x: sol[0], y: sol[1] }}
              transition={{
                duration: transitionDuration1,
                ease: "easeInOut",
              }}
              onAnimationComplete={handleAnimationComplete1}
            />
          );
        }
        if (playerLoc2[0] === x && playerLoc2[1] === y) {
          console.log(sol2);
          contents.push(
            <motion.img
              key="player2"
              src={factd ? (animationComplete2 ? ded : playerImg2) : playerImg2}
              style={
                factd
                  ? animationComplete2
                    ? { zIndex: 11, height: "40px" }
                    : imageStyle
                  : animationComplete2
                  ? { display: "none" }
                  : imageStyle
              }
              alt="player"
              onAnimationComplete={handleAnimationComplete2}
              animate={{ x: sol2[0], y: sol2[1] }}
              transition={{
                duration: factd ? transitionDuration2 : transitionDuration2,
                ease: "easeInOut",
              }}
            />
          );
        }
        if (playerLoc3[0] === x && playerLoc3[1] === y) {
          contents.push(
            <motion.img
              key="player3"
              src={
                factb ? (animationComplete3 ? ded3 : playerImg3) : playerImg3
              }
              alt="player"
              style={
                factb
                  ? animationComplete3
                    ? { zIndex: 11, height: "40px" }
                    : imageStyle
                  : animationComplete3
                  ? { display: "none" }
                  : imageStyle
              }
              animate={{ x: sol3[0], y: sol3[1] }}
              onAnimationComplete={handleAnimationComplete3}
              transition={{
                duration: transitionDuration3,
                ease: "easeInOut",
              }}
            />
          );
        }
        if (exitLoc[0] === x && exitLoc[1] === y) {
          contents.push(<img key="exit" src={exitImg} alt="exit" />);
        }
        ghostsHorizontal.forEach((ghost, index) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <motion.img
                key={`horizontal-${x}-${y}-${c}`}
                src={ghostImg1}
                style={imageStyle}
                alt="ghost"
                animate={{
                  x: fullghost[2][0][index],
                  y: fullghost[2][1][index],
                }}
                transition={{
                  duration: factd ? transitionDuration4 : transitionDuration4,
                  ease: "easeInOut",
                }}
              />
            );
          }
          c += 1;
        });
        ghostsVertical.forEach((ghost, index) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <motion.img
                key={`vertical-${x}-${y}-${c}`}
                src={ghostImg2}
                style={imageStyle}
                alt="ghost"
                animate={{
                  x: fullghost[3][0][index],
                  y: fullghost[3][1][index],
                }}
                transition={{
                  duration: factd ? transitionDuration4 : transitionDuration4,
                  ease: "easeInOut",
                }}
              />
            );
          }
          c += 1;
        });
        ghostsDiagonalTopRight.forEach((ghost, index) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <motion.img
                key={`diagonal-top-right-${x}-${y}-${c}`}
                src={ghostImg3}
                style={imageStyle}
                alt="ghost"
                animate={{
                  x: fullghost[4][0][index],
                  y: fullghost[4][1][index],
                }}
                transition={{
                  duration: factd ? transitionDuration4 : transitionDuration4,
                  ease: "easeInOut",
                }}
              />
            );
          }
          c += 1;
        });
        ghostsDiagonalBottomRight.forEach((ghost, index) => {
          if (ghost[0] === x && ghost[1] === y) {
            contents.push(
              <motion.img
                key={`diagonal-bottom-right-${x}-${y}-${c}`}
                src={ghostImg4}
                style={imageStyle}
                alt="ghost"
                animate={{
                  x: fullghost[5][0][index],
                  y: fullghost[5][1][index],
                }}
                transition={{
                  duration: factd ? transitionDuration4 : transitionDuration4,
                  ease: "easeInOut",
                }}
              />
            );
          }
          c += 1;
        });

        grid.push(
          <div
            key={`${x}-${y}`}
            className="grid-item"
            onClick={() => handleClick(x, y)}
          >
            {contents}
          </div>
        );
      }
    }
    return grid;
  };

  const handleAddition = async () => {
    if (buttontext === "RESET") {
      window.location.reload();
    }
    try {
      const response = await fetch("http://localhost:5000/add-numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          num1: playerLoc1,
          num2: exitLoc,
          array1: ghostsHorizontal,
          array2: ghostsVertical,
          array3: ghostsDiagonalTopRight,
          array4: ghostsDiagonalBottomRight,
        }),
      });
      const data = await response.json();
      if (response.status === 500) {
        console.log("NO SOLUTION");
        setInsertText("CONGRATULATIONS YOU WON!!\n\nPRESS RESET TO PLAY AGAIN");
        setbuttontext("RESET");

        return;
      }
      console.log("where");
      console.log(data.sol);
      setsol(data.sol);
      if (data.sol2 === "none") {
        console.log("none");
      } else {
        setsol2(data.sol2);
      }

      setsol3(data.sol3);
      setfullghost(data.ghosts);

      if (data.dedd === "True") {
        setfactd(true);
      } else {
        setfactd(false);
      }

      if (data.deda === "True") {
        setfacta(true);
      } else {
        setfacta(false);
      }

      if (data.dedb === "True") {
        setfactb(true);
      } else {
        setfactb(false);
      }
      console.log(data.ghosts);
      if (
        data.dedd === "True" &&
        data.dedb === "True" &&
        data.deda === "True"
      ) {
        setInsertText("No Solution Exisits");
      } else {
        setInsertText("Solution Exists");
      }
    } catch (error) {
      console.error("Error ", error);
    }

    setsubmit(true);

    setbuttontext("RESET");
  };

  const startTimer1 = (x) => {
    setTimeout(() => {
      setresult1(true);
      setmax_steps1(sol[0].length);
    }, x * 1000); // 10000 milliseconds = 10 seconds
  };
  const startTimer2 = (x) => {
    setTimeout(() => {
      setresult2(true);
      setmax_steps2(sol2[0].length);
    }, x * 1000); // 10000 milliseconds = 10 seconds
  };
  const startTimer3 = (x) => {
    setTimeout(() => {
      setresult3(true);
      setmax_steps3(sol3[0].length);
    }, x * 1000); // 10000 milliseconds = 10 seconds
  };

  return (
    <div className="App">
      <div className="insert-container" style={{ flex: "1", order: 2 }}>
        <p
          style={{
            color: insertText === "Solution Exists" ? "green" : "white",
          }}
        >
          <br />
          {insertText}
        </p>
        <img
          key={`${input}vv`}
          src={
            input < 1
              ? playerImg1
              : input < 2
              ? exitImg
              : input < 5
              ? ghostImg1
              : input < 8
              ? ghostImg2
              : input < 11
              ? ghostImg3
              : input < 14
              ? ghostImg4
              : ""
          }
          alt=""
        />
        <img
          className={
            input < 2
              ? ""
              : input < 5
              ? "vertical"
              : input < 8
              ? "horizontal"
              : input < 11
              ? "diagonal1"
              : input < 14
              ? "diagonal2"
              : ""
          }
          key={`${input}va`}
          src={
            input < 2
              ? ""
              : input < 5
              ? arrow
              : input < 8
              ? arrow
              : input < 11
              ? arrow
              : input < 14
              ? arrow
              : ""
          }
          alt=""
        />
      </div>

      <div className="info-container">
        <img src={logo} alt="HAUNTED HOUSE" />
      </div>
      <div className="grid-container">
        {submit ? final_solution() : renderGrid()}
        <button className="btnn" onClick={handleAddition}>
          {buttontext}
        </button>
      </div>

      <div className="error-container">
        <p>{errortext}</p>
      </div>
      <div className="name-container">
        <p>By Yashasvi and Shlok</p>
      </div>
      <div className="result-container">
        {result1 ? (
          <div>
            <img src={playerImg1} />
            <p>A* {facta ? "Failed" : "Steps Taken"}</p>
            <div> {facta ? "" : max_steps1}</div>
          </div>
        ) : (
          <div></div>
        )}
        {result2 ? (
          <div>
            <img src={playerImg2} />
            <p>DFS {factd ? "Failed" : "Steps Taken"}</p>
            <div> {factd ? "" : max_steps2}</div>
          </div>
        ) : (
          <div></div>
        )}
        {result3 ? (
          <div>
            <img src={playerImg3} />
            <p>BFS {factb ? "Failed" : "Steps Taken"}</p>
            <div> {factb ? "" : max_steps3}</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {submit ? (
        <div></div>
      ) : (
        <div className="tess">
          <p>Rule 1: Exit cannot be adjacent to players</p>
          <p>Rule 2: Ghosts cannot start adjacent to players</p>
          <p>Rule 3: Every Turn players and ghosts have to move</p>
        </div>
      )}
    </div>
  );
}

export default App;
