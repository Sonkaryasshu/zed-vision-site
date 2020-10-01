import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import {
  ResultBox,
  ResultBoxContainer,
} from "./styledCodeBoxComps";

export const HtmlPlayer: React.FC<
  { htmlArray: string[]; index: number; onEvent: (str: string) => void }
> = (
  { htmlArray, onEvent = () => {} },
) => {
  const [{ index }, setHtml] = React.useState({ index: 0 });

  React.useEffect(() => {
    console.log(index);
    if (htmlArray.length === 0) return;
    //const handler =
    setTimeout(async () => {
      const newIndex = (index + 1) % htmlArray.length;
      setHtml({ index: newIndex });
    }, 100);

    // return ()=>clearInterval(handler);
  }, [htmlArray.length, setHtml, index]);

  console.log("HTML Array", htmlArray);

  return <ResultBoxContainer>
    <div
      onClick={(e: any) => {
        const clickEvent = e.target.getAttribute("data-onclick");
        if (clickEvent) onEvent(clickEvent);
      }}
      dangerouslySetInnerHTML={{ __html: htmlArray[index] }}
    />
  </ResultBoxContainer>;
};

export const ResultComponent: React.FC<
  {
    htmlArray: string[];
    height?: number;
    width?: number;
  }
> = ({ height = "100%", width = "100%", htmlArray }) => {
  const x = useMotionValue(0);

  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  );

  return (<>
    <motion.div
      layout
      style={{
        background,
        position: "relative",
        height,
        width,
        padding: "10px",
      }}
    >
      <motion.div
        // layout
        drag={true}
        dragElastic={0.1}
        dragMomentum={false}
        // dragListener={true}
        // onDrag={
        // (event, info) => {if (event.layerX<0) adjust(event.layerX, event.layerY);}
        // }

        style={{ position: "absolute", x }}
      >
        <ResultBox>
          <HtmlPlayer
            htmlArray={htmlArray}
            index={x.get()}
            onEvent={(str) => {
              console.log(str);
            }}
          />
        </ResultBox>
      </motion.div>
    </motion.div>
  </>);
};
