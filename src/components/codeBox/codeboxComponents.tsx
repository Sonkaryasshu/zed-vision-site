import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import {
  ResultBox,
  ResultBoxContainer,
} from "./styledCodeBoxComps";

export const HtmlPlayer: React.FC<
  { htmlArray: string[]; indexToShow: number; onEvent: (str: string) => void }
> = (
  { indexToShow, htmlArray, onEvent = () => {} },
) => {
  const [{ index }, setHtml] = React.useState({ index: indexToShow });

  React.useEffect(() => {
    console.log(index);
    if (htmlArray.length === 0) return;
    //const handler =
    // setTimeout(async () => {
    //   const newIndex = (index + 1) % htmlArray.length;
    //   setHtml({ index: newIndex });
    // }, 100);

    // return ()=>clearInterval(handler);
  }, [htmlArray.length, setHtml, index]);

  console.log("HTML Array", htmlArray);

  return <ResultBoxContainer>
    <p>{indexToShow}</p>
    <div
      onClick={(e: any) => {
        const clickEvent = e.target.getAttribute("data-onclick");
        if (clickEvent) onEvent(clickEvent);
      }}
      dangerouslySetInnerHTML={{ __html: htmlArray[indexToShow] }}
    />
  </ResultBoxContainer>;
};

export const ResultComponent: React.FC<
  {
    htmlArray: string[];
    height?: number;
    width?: number;
    onEvent: (srt: string) => void;
  }
> = ({ height = "100%", width = "100%", htmlArray, onEvent }) => {
  const x = useMotionValue(0);

  const background = useTransform(
    x,
    [0, 300, 600],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  );

  const [indexToShow, setIndexToShow] = React.useState(0);

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
        onDrag={(event: any, info) => {
          // const htmlArray = new Array(100).fill(100);
          // console.log(event.clientX - 200);
          let newIndex = Math.floor(
            (htmlArray.length * (event.clientX - 200)) / 1000,
          );
          if (newIndex < 0) newIndex = 0;
          if (newIndex > htmlArray.length - 1) newIndex = htmlArray.length - 1;
          setIndexToShow(newIndex);
        }}
        // if (event.layerX<0) adjust(event.layerX, event.layerY);}
        // }

        style={{ position: "absolute", x }}
      >
        <ResultBox>
          <HtmlPlayer
            htmlArray={htmlArray}
            indexToShow={indexToShow}
            onEvent={(str) => onEvent(str)}
          />
        </ResultBox>
      </motion.div>
    </motion.div>
  </>);
};
