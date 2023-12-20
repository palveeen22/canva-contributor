import React from "react";
import Canvas from "../../components/canva";
import Toolbox from "../../components/userinputs";

const Paint = () => {
  return (
    <>
      <section className="w-full flex justify-between gap-4 bg-[#d3d2cd] paddingX paddingYShorter3 pb-10">
        <div className="w-[30%] gap-4 rounded-xl bg-[#e6e7e1] paddingXShorter paddingYShorter flex flex-col items-center">
          <Toolbox />
        </div>
        {/* canvas here */}
        <div className="w-[70%] rounded-xl bg-[#e6e7e1] paddingXShorter paddingYShorter">
          <Canvas />
        </div>
      </section>
    </>
  );
};

export default Paint;
