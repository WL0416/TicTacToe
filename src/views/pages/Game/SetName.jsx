import React, { useContext } from "react";
import { Context } from "../../../data/context";

const SetName = () => {
  const { name, gameStep } = useContext(Context);
  // eslint-disable-next-line
  const [gameStepValue, setGameStepValue] = gameStep;
  const [nameValue, setNameValue] = name;

  const saveName = (e) => {
    e.preventDefault();
    if (nameValue.length > 0) setGameStepValue("set_game_type");
    // console.log("save name", gameStepValue, nameValue);
  };

  const onName = (e) => {
    e.preventDefault();
    setNameValue(e.target.value);
  };

  return (
    <div id="SetName">
      <h1>Set Name</h1>
      <form onSubmit={saveName}>
        <div className="input_holder left">
          {" "}
          <label>Name </label>
          <input
            type="text"
            className="input name"
            placeholder="Name"
            onChange={onName}
            required
          />
        </div>
        <button type="submit" className="button">
          <span>
            SAVE <span className="fa fa-caret-right"></span>
          </span>
        </button>
      </form>
    </div>
  );
};

export default SetName;
