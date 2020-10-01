import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import { MonacoEditor } from "react-cdn-monaco-editor";
import { transform } from "../utils/babel";
import { render } from "../utils/renderer";
import { unHash, hash } from "../utils/sha";
import { counterExample, defaultProps } from "./example";
import {
  Container,
  ResultContainer,
  CodeContainer,
  Header,
  ResultBox,
  ResultBoxContainer,
} from "./styledCodeBoxComps";

const HtmlReplayer: React.FC<
  { htmlArray: string[]; index: number; onEvent: (str: string) => {} }
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

const ResultComponent: React.FC<
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
          <HtmlReplayer
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

export const CodeBox: React.FC<{
  live?: boolean;
  toRender?: boolean;
  className?: string;
  title?: string;
}> = ({ live, toRender, className, title }) => {
  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      isError: false,
      code: counterExample,
      transformedCode: ``,
      mainCode: counterExample,
      mainCodeHash: "",
      devCodeHash: "",
      defaultProps,
      defaultStateHash: ``,
      codeHash: ``,
      transformedMainCode: ``,
      transformedHash: ``,
      transformedMainHash: ``,
      renderedHash: ``,
      renderedContent: ``,
      renderedMainHash: ``,
      renderedContentMain: ``,
    },
  );
  const [code, changeCode] = React.useState(counterExample);

  React.useEffect(() => {
    const runner = async () => {
      const runnerHash = await hash(renderedComponent);
      const devCodeHash = await hash(code);
      const codeHash = devCodeHash;
      const mainCode = renderedComponent.mainCode
        ? renderedComponent.mainCode
        : code;
      const mainCodeHash = renderedComponent.mainCodeHash
        ? renderedComponent.mainCodeHash
        : devCodeHash;

      const transformedHash = await transform(codeHash);
      const transformedMainHash = await transform(mainCodeHash);
      const defaultStateHash = await hash(renderedComponent.defaultProps);
      if (!transformedHash) {
        changeWorkerRenderedComponent({ ...renderedComponent, isError: true });
        return;
      }
      const transformedCode = await unHash(transformedHash);

      const transformedMainCode = await unHash(transformedMainHash);

      const renderedHash = await render(transformedHash, defaultStateHash);
      const renderedMainHash = await render(
        transformedMainHash,
        defaultStateHash,
      );
      const renderedContent = await unHash(renderedHash);
      const renderedContentMain = await unHash(renderedMainHash);

      const runnerHash2 = await hash(renderedComponent);

      if (runnerHash === runnerHash2) {
        changeWorkerRenderedComponent(
          {
            ...renderedComponent,
            code,
            devCodeHash,
            mainCode,
            mainCodeHash,
            codeHash,
            transformedHash,
            transformedMainCode,
            transformedMainHash,
            transformedCode,
            defaultStateHash,
            renderedHash,
            renderedContent,
            renderedMainHash,
            renderedContentMain,
          },
        );
      }
    };
    runner();
  }, [code, renderedComponent.defaultProps]);

  const isChangeAvailable = renderedComponent.renderedContent &&
    renderedComponent.renderedMainHash !== renderedComponent.renderedHash;

  const isError = !renderedComponent.renderedContent;

  console.log(renderedComponent.renderedContent);

  return <Container>
    {!!title && <Header>{title}</Header>}
    <CodeContainer>
      <MonacoEditor
        width="100%"
        height="100%"
        value={counterExample}
        onChange={changeCode}
      />
    </CodeContainer>

    <ResultContainer>
      <ResultComponent htmlArray={[renderedComponent.renderedContent]} />
    </ResultContainer>
  </Container>;
};
