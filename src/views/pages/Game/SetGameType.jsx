import React, { useContext } from "react";
import { Context } from "../../../data/context";

const SetGameType = () => {
  const { gameType, gameStep } = useContext(Context);

  // eslint-disable-next-line
  const [gameTypeValue, setGameTypeValue] = gameType;
  // eslint-disable-next-line
  const [gameStepValue, setGameStepValue] = gameStep;

  //   console.log(gameTypeValue);

  const setGameLive = () => {
    setGameTypeValue("live");
    setGameStepValue("start_game");
  };

  const setGameComp = () => {
    setGameTypeValue("comp");
    setGameStepValue("start_game");
  };

  return (
    <div id="SetGameType">
      <h1>Choose game type</h1>
      <button type="button" onClick={setGameLive} className="button long">
        <span>
          Live against another player{" "}
          <span className="fa fa-caret-right"></span>
        </span>
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" onClick={setGameComp} className="button long">
        <span>
          Against a computer <span className="fa fa-caret-right"></span>
        </span>
      </button>
    </div>
  );
};

export default SetGameType;
