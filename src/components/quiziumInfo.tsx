import React from "react";
import { TextAnimate } from "./magicui/text-animate";

import { NeonGradientCard } from "./magicui/neon-gradient-card";

const quiziumInfo = () => {
  return (
    <div>
      <NeonGradientCard className="rounded-xl p-[2px] max-w-xl mx-auto shadow-[0_0_20px_#a07cfe66] z-1 h-fit">
        <div className=" flex justify-center items-center  ">
          <div className="rounded-lg w-xl">
            <div className="flex justify-center items-center">
              <TextAnimate
                animation="fadeIn"
                by="line"
                as="p"
                className="font-josefin-sans text-xl w-2xl text-center py-20 my-auto h-full"
              >
                {`Quizium isn't just another quiz app \n\n it's your intelligent challenger. Powered by AI \n\n it adapts to your level, sharpens your thinking, \n\n and pushes you to outsmart every question. \n\n  Because it's not just about answering... \n\n it's about conquering.`}
              </TextAnimate>
            </div>
          </div>
        </div>
      </NeonGradientCard>
    </div>
  );
};

export default quiziumInfo;
