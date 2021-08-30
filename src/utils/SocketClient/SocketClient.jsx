import Socket from "../Socket";
import info from "../../data/info.json";

const SocketClient = (
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
) => {
  const [playerTypeValue, setPlayerTypeValue] = playerType;
  const [playerNumberValue, setPlayerNumberValue] = playerNumber;
  const [gamePlayValue, setGamePlayValue] = gamePlay;
  const [gameRoomValue, setGameRoomValue] = gameRoom;

  const wslen = clients.length;
  let socket;
  if (wslen > 0) {
    if (clients[wslen - 1].length > 1) {
      // new room
      const roomNumber = (wslen + 1).toString();
      socket = Socket(
        `${info.prefixWS}${roomNumber}`,
        gamePlay,
        name,
        gameBoard,
        nextTurnPlay,
        gameStat,
        win
      );
      setGameRoomValue(roomNumber);
      setPlayerNumberValue(playerNumberValue + wslen + 1);
    } else {
      // same room
      const roomNumber = wslen.toString();
      socket = Socket(
        `${info.prefixWS}${wslen.toString()}`,
        gamePlay,
        name,
        gameBoard,
        nextTurnPlay,
        gameStat,
        win
      );
      setGameRoomValue(roomNumber);
      playerTypeValue && setPlayerTypeValue("o");
      setPlayerNumberValue(playerNumberValue + wslen + 1);
      setGamePlayValue(!gamePlayValue);
    }
  } else {
    // first room
    socket = Socket(
      `${info.prefixWS}${gameRoomValue}`,
      gamePlay,
      name,
      gameBoard,
      nextTurnPlay,
      gameStat,
      win
    );
    setPlayerNumberValue(1);
  }

  return socket;
};

export default SocketClient;
