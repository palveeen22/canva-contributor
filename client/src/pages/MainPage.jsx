import React from "react";
import Toolbox from "../components/userinputs";
import Canvas from "../components/canva";

const MainPage = () => {
  return (
    <section>
      <div className="toolbox1">
        <Toolbox />
      </div>
      <div className="App">
        <Canvas Bcolor="red" />
      </div>
    </section>
  );
};

export default MainPage;
