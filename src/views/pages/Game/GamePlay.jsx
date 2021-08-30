import React, { useRef, useContext, useEffect } from "react";
// import io from "socket.io-client";
import rand_arr_elem from "../../../utils/rand_arr_elem";
// import rand_to_fro from "../../../utils/rand_to_fro";
import { Context } from "../../../data/context";
import gsap from "gsap";
import axios from "axios";
import info from "../../../data/info.json";
import SocketClient from "../../../utils/SocketClient";
import simplePost from "../../../utils/simplePost";

const GamePlay = () => {
  const winSets = [
    ["c1", "c2", "c3"],
    ["c4", "c5", "c6"],
    ["c7", "c8", "c9"],

    ["c1", "c4", "c7"],
    ["c2", "c5", "c8"],
    ["c3", "c6", "c9"],

    ["c1", "c5", "c9"],
    ["c3", "c5", "c7"],
  ];

  const c1 = useRef();
  const c2 = useRef();
  const c3 = useRef();
  const c4 = useRef();
  const c5 = useRef();
  const c6 = useRef();
  const c7 = useRef();
  const c8 = useRef();
  const c9 = useRef();
  let refsGroup = [c1, c2, c3, c4, c5, c6, c7, c8, c9];

  const {
    name,
    gameType,
    gameStep,
    gameBoard,
    gamePlay,
    nextTurnPlay,
    gameStat,
    playerType,
    playerSocket,
    playerNumber,
    gameRoom,
    win,
  } = useContext(Context);

  const [nameValue, setNameValue] = name;

  const [gameTypeValue, setGameTypeValue] = gameType;
  // eslint-disable-next-line
  const [gameStepValue, setGameStepValue] = gameStep;
  const [gameBoardValue, setGameBoardValue] = gameBoard;
  const [gamePlayValue, setGamePlayValue] = gamePlay;
  const [nextTurnPlayValue, setNextTurnPlayValue] = nextTurnPlay;
  const [gameStatValue, setGameStatValue] = gameStat;
  const [playerTypeValue] = playerType;
  const [playerSocketValue, setPlayerSocketValue] = playerSocket;
  const [playerNumberValue, setPlayerNumberValue] = playerNumber;
  const [gameRoomValue, setGameRoomValue] = gameRoom;
  const [winValue, setWinValue] = win;

  /* eslint-disable */
  useEffect(() => {
    if (gameTypeValue !== "live") {
      setGamePlayValue(!gamePlayValue);
      if (!gameStatValue) setGameStatValue("Start Game");
      checkWin(
        winSets,
        gameBoardValue,
        setGameStatValue,
        setGamePlayValue,
        renderWinGrid,
        playerTypeValue
      );
    } else {
      if (!playerSocketValue) {
        setGameStatValue("Connecting...");
        setGamePlayValue(false);
        setGameStatValue("Waiting...");
        axios
          .get(info.getWebSocketClients)
          .then((response) => {
            const clients = Object.values(response.data);
            setPlayerSocketValue(
              SocketClient(
                clients,
                playerType,
                playerNumber,
                gamePlay,
                gameBoard,
                gameRoom,
                name,
                nextTurnPlay,
                gameStat,
                win
              )
            );
          })
          .catch((err) => {
            setGameStatValue("Something went wrong...");
            console.log(err);
          });
      }
    }

    gsap.from("#game_stat", {
      duration: 1,
      display: "none",
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: "power4.in",
    });

    gsap.from("#game_board", {
      duration: 1,
      display: "none",
      opacity: 0,
      x: -200,
      y: -200,
      scaleX: 0,
      scaleY: 0,
      ease: "power4.in",
    });
  }, []);

  useEffect(() => {
    if (winValue) {
      checkWin(
        winSets,
        gameBoardValue,
        setGameStatValue,
        setGamePlayValue,
        renderWinGrid,
        playerTypeValue
      );
    }
  }, [nextTurnPlayValue, playerNumberValue, winValue]);
  /* eslint-disable */

  const clickCell = (e) => {
    if (!nextTurnPlayValue || !gamePlayValue) return;

    const cellId = e.target.id.substr(11);

    if (gameBoardValue[cellId] || !cellId) return;

    playerTurn(cellId);
    setNextTurnPlayValue(false);

    if (gameTypeValue === "live") {
      liveCheckTurn();
    } else {
      checkTurn();
    }
  };

  const liveCheckTurn = () => {
    const result = checkWin(
      winSets,
      gameBoardValue,
      setGameStatValue,
      setGamePlayValue,
      renderWinGrid,
      playerTypeValue
    );
    console.log(result);

    if (result[0]) {
      setGameStatValue("Opponent Wins");
      setWinValue(true);
    } else if (result[1]) {
      setGameStatValue("Draw");
      setGamePlayValue(false);
    }

    simplePost(info.exchangeData, {
      name: nameValue,
      board: gameBoardValue,
      result,
      to: gameRoomValue,
    });
  };

  const endGame = () => {
    setNameValue("");
    setGameTypeValue("");
    setGameStepValue("set_name");
    setGamePlayValue(false);
    setGameBoardValue({});
    setNextTurnPlayValue(true);
    setGameStatValue("");
    if (gameTypeValue === "live") {
      playerSocketValue.close();
      setPlayerSocketValue(null);
      setPlayerNumberValue(0);
      setGameRoomValue(1);
      setWinValue(false);
    }
  };

  const playerTurn = (cellId) => {
    gameBoardValue[cellId] = playerTypeValue;

    gsap.from(`#game_board-${cellId}`, {
      duration: 0.3,
      display: "none",
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: "power4.out",
    });
  };

  const compTurn = () => {
    let empty_cells_arr = [];
    for (let i = 1; i <= 9; i++) {
      !gameBoardValue["c" + i] && empty_cells_arr.push("c" + i);
    }

    const c = rand_arr_elem(empty_cells_arr);
    gameBoardValue[c] = "o";

    gsap.from(`#game_board-${c}`, {
      duration: 0.3,
      display: "none",
      opacity: 0,
      scaleX: 0,
      scaleY: 0,
      ease: "power4.out",
    });

    setNextTurnPlayValue(true);
    checkWin(
      winSets,
      gameBoardValue,
      setGameStatValue,
      setGamePlayValue,
      renderWinGrid,
      playerTypeValue
    );
  };

  const renderWinGrid = (set) => {
    for (let each of set) {
      refsGroup.forEach((r) => {
        if (each === r.current.id.substr(11)) {
          r.current.className += " win";
        }
      });
    }
  };

  const checkTurn = () => {
    const [win, fin] = checkWin(
      winSets,
      gameBoardValue,
      setGameStatValue,
      setGamePlayValue,
      renderWinGrid,
      playerTypeValue
    );
    // console.log(win);
    setTimeout(() => {
      if (!win && !fin) {
        gameTypeValue !== "live" && nextTurnPlayValue && compTurn();
      }
    }, 500);
  };

  const cellCont = (c) => {
    return (
      <div>
        {gameBoardValue[c] === "x" && (
          <i className="fa fa-times fa-5x player"></i>
        )}
        {gameBoardValue[c] === "o" && (
          <i className="fa fa-circle-o fa-5x notplayer"></i>
        )}
      </div>
    );
  };

  return (
    <div id="GameMain">
      <h1>Play {gameTypeValue}</h1>

      <div id="game_stat">
        <div id="game_stat_msg">{gameStatValue}</div>
        {gamePlayValue && (
          <div id="game_turn_msg">
            {nextTurnPlayValue ? "Your turn" : "Opponent turn"}
          </div>
        )}
      </div>

      <div id="game_board">
        <table>
          <tbody>
            <tr>
              <td id="game_board-c1" ref={refsGroup[0]} onClick={clickCell}>
                {" "}
                {cellCont("c1")}{" "}
              </td>
              <td
                id="game_board-c2"
                ref={refsGroup[1]}
                className="vbrd"
                onClick={clickCell}
              >
                {" "}
                {cellCont("c2")}{" "}
              </td>
              <td id="game_board-c3" ref={refsGroup[2]} onClick={clickCell}>
                {" "}
                {cellCont("c3")}{" "}
              </td>
            </tr>
            <tr>
              <td
                id="game_board-c4"
                ref={refsGroup[3]}
                onClick={clickCell}
                className="hbrd"
              >
                {" "}
                {cellCont("c4")}{" "}
              </td>
              <td
                id="game_board-c5"
                ref={refsGroup[4]}
                onClick={clickCell}
                className="vbrd hbrd"
              >
                {" "}
                {cellCont("c5")}{" "}
              </td>
              <td
                id="game_board-c6"
                ref={refsGroup[5]}
                onClick={clickCell}
                className="hbrd"
              >
                {" "}
                {cellCont("c6")}{" "}
              </td>
            </tr>
            <tr>
              <td id="game_board-c7" ref={refsGroup[6]} onClick={clickCell}>
                {" "}
                {cellCont("c7")}{" "}
              </td>
              <td
                id="game_board-c8"
                ref={refsGroup[7]}
                onClick={clickCell}
                className="vbrd"
              >
                {" "}
                {cellCont("c8")}{" "}
              </td>
              <td id="game_board-c9" ref={refsGroup[8]} onClick={clickCell}>
                {" "}
                {cellCont("c9")}{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button type="submit" onClick={endGame} className="button">
        <span>
          End Game <span className="fa fa-caret-right"></span>
        </span>
      </button>
    </div>
  );
};

export default GamePlay;

export const checkWin = (
  winSets,
  gameBoardValue,
  setGameStatValue,
  setGamePlayValue,
  renderWinGrid,
  playerTypeValue
) => {
  let set;
  let win = false;
  let fin = true;
  for (let i = 0; !win && i < winSets.length; i++) {
    set = winSets[i];

    if (
      gameBoardValue[set[0]] &&
      gameBoardValue[set[0]] === gameBoardValue[set[1]] &&
      gameBoardValue[set[0]] === gameBoardValue[set[2]]
    )
      win = true;
  }

  for (let i = 1; i <= 9; i++) !gameBoardValue["c" + i] && (fin = false);

  if (win) {
    setGameStatValue(
      (gameBoardValue[set[0]] === playerTypeValue ? "You" : "Opponent") + " win"
    );
    setGamePlayValue(false);
    renderWinGrid(set);
  } else if (fin) {
    setGameStatValue("Draw");
    setGamePlayValue(false);
  }

  return [win, fin];
};
