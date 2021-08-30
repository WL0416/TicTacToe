import React, { useState, useEffect } from "react";
import XMLData from "./ws_conf.xml";
import axios from "axios";
import xml2js from "xml2js";

export const Context = React.createContext();
const Parser = new xml2js.Parser();

const Provider = (props) => {
  const [siteContent, setSiteContent] = useState({});
  const [name, setName] = useState("");
  const [gameStep, setGameStep] = useState("set_name");
  const [gameType, setGameType] = useState("");
  const [gamePlay, setGamePlay] = useState(false);
  const [gameBoard, setGameBoard] = useState({});
  const [nextTurnPlay, setNextTurnPlay] = useState(true);
  const [gameStat, setGameStat] = useState("");
  const [playerType, setPlayerType] = useState("x");
  const [playerSocket, setPlayerSocket] = useState(null);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [gameRoom, setGameRoom] = useState("1");
  const [win, setWin] = useState(false);

  useEffect(() => {
    axios
      .get(XMLData, {
        "Content-Type": "application/xml; charset=utf-8",
      })
      .then((response) => {
        Parser.parseString(response.data, (err, result) => {
          setSiteContent(result);
        });
      });
  }, []);

  return (
    <Context.Provider
      value={{
        siteContent: [siteContent, setSiteContent],
        name: [name, setName],
        gameStep: [gameStep, setGameStep],
        gameType: [gameType, setGameType],
        gameBoard: [gameBoard, setGameBoard],
        gamePlay: [gamePlay, setGamePlay],
        nextTurnPlay: [nextTurnPlay, setNextTurnPlay],
        gameStat: [gameStat, setGameStat],
        playerType: [playerType, setPlayerType],
        playerSocket: [playerSocket, setPlayerSocket],
        playerNumber: [playerNumber, setPlayerNumber],
        gameRoom: [gameRoom, setGameRoom],
        win: [win, setWin],
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
export const Consumer = Context.Consumer;
