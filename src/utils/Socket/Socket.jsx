import { w3cwebsocket as W3CWebSocket } from "websocket";

const Socket = (
  url,
  gamePlay,
  name,
  gameBoard,
  nextTurnPlay,
  gameStat,
  win
) => {
  // eslint-disable-next-line
  const [gamePlayValue, setGamePlayValue] = gamePlay;
  const [nameValue] = name;
  // eslint-disable-next-line
  const [gameBoardValue, setGameBoardValue] = gameBoard;
  // eslint-disable-next-line
  const [nextTurnPlayValue, setNextTurnPlayValue] = nextTurnPlay;
  // eslint-disable-next-line
  const [gameStatValue, setGameStatValue] = gameStat;
  // eslint-disable-next-line
  const [winValue, setWinValue] = win;

  const socket = new W3CWebSocket(url);

  socket.onopen = () => {
    console.log("socket is open");
  };

  socket.onclose = () => {
    console.log("socket is closed");
  };

  socket.onmessage = (message) => {
    const m = JSON.parse(message.data);
    console.log("Message from server", m);
    if (m.name !== nameValue) {
      setGameBoardValue(m.board);
      if (!m.result[0] && !m.result[1]) {
        setGameStatValue("Start Game");
        setGamePlayValue(true);
        setNextTurnPlayValue(nextTurnPlay);
      }

      if (m.result[0]) {
        setGameStatValue("Opponent Wins");
        setWinValue(true);
      } else if (m.result[1]) {
        setGameStatValue("Draw");
        setGamePlayValue(false);
      }
    }
  };

  socket.onerror = (error) => {
    console.log(error);
  };

  return socket;
};

export default Socket;
