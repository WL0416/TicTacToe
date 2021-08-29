import React, { useContext } from "react";
import SetName from "./SetName";
import SetGameType from "./SetGameType";
import GamPlay from "./GamePlay";
import { Context } from "../../../data/context";

const Game = () => {
  const { name, gameStep } = useContext(Context);

  const [nameValue] = name;
  const [gameStepValue] = gameStep;

  //   console.log(gameStepValue, gameBoardValue);

  return (
    <div id="TTT_game">
      <div id="page-container">
        {gameStepValue === "set_name" && (
          <SetName gameStep={gameStep} name={name} />
        )}

        {gameStepValue !== "set_name" && (
          <div>
            <h2>Welcome, {nameValue}</h2>
          </div>
        )}

        {gameStepValue === "set_game_type" && <SetGameType></SetGameType>}

        {gameStepValue === "start_game" && <GamPlay></GamPlay>}
      </div>
    </div>
  );
};

export default Game;
