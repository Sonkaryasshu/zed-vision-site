import * as React from "react";
import styled, { css } from "styled-components";
import { hash, unHash } from "../components/utils/sha";
import { transform } from "../components/utils/babel";
import { render } from "../components/utils/renderer";
import ReactDiffViewer from "react-diff-viewer";
import format from "html-format";
import ScopedCssBaseline from "@material-ui/core/ScopedCssBaseline";

import {
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { MonacoEditor } from "react-cdn-monaco-editor";

const Styled = styled.div`
  text-align: center;
  border-radius: 12px;
  width: 200px;
  height: 200px;
  display: flex;
  place-content: center;
  place-items: center;
  margin: 0;
  padding: 0;
  background: rgb(255, 255, 255) none repeat scroll 0% 0%;
  user-select: none;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 3px 0px, rgba(0, 0, 0, 0.06) 0px 10px 15px 0px;
`;

const DivContainer = styled.div`
display: block;
width: 150px;
height: 150px;
overflow: hidden;
`;

let iiiii = 0;

const HtmlReplayer: React.FC<{ htmlArray: string[]; index: number }> = (
  { htmlArray, index },
) => {
  const [html, setHtml] = React.useState("");

  React.useEffect(() => {
    setInterval(async () => {
      const hhtml = await unHash(htmlArray[iiiii++ % htmlArray.length]);
      setHtml(hhtml);
    }, 10);

    setHtml(htmlArray[index]);
  }, []);

  return <DivContainer>
    {index}
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </DivContainer>;
};

export const MyComponent: React.FC<
  {
    htmlArray: string[];
    height?: number;
    width?: number;
    adjust: (x: number, y: number) => void;
  }
> = ({ height = 400, width = 400, adjust, htmlArray }) => {
  const x = useMotionValue(0);

  const background = useTransform(
    x,
    [-100, 0, 100],
    ["#ff008c", "#7700ff", "rgb(230, 255, 0)"],
  );

  return (<>
    <motion.div
      layout
      css={css`position: relative; height: ${height}px; width: ${width}px;`}
      style={{ background }}
    >
    </motion.div>

    <motion.div
      // layout
      drag={true}
      dragElastic={0.5}
      // dragListener={true}
      // onDrag={
      // (event, info) => {if (event.layerX<0) adjust(event.layerX, event.layerY);}
      // }
      dragConstraints={{
        top: 0,
        bottom: height - 100,
        left: 0,
        right: width - 100,
      }}
      style={{ position: "absolute", x }}
    >
      <Styled>
        <ScopedCssBaseline>
          <HtmlReplayer htmlArray={htmlArray} index={x.get()} />
        </ScopedCssBaseline>
      </Styled>
    </motion.div>
  </>);
};

// const Container = styled.div`
//   height: 100vh;
//   width: 100vw;
//   overflow: hidden;
//   text-align: center;
//   display: flex;
//   place-content: center;
//   place-items: center;
//   background: rgba(0, 85, 255, 1);
//   perspective: 1000px;
// `;

const Wrapper: React.FC<
  {
    code: string;
    message?: string;
    renderHash?: string;
    innerHTML: string;
    defaultProps: Props;
    onEvent: (action: string) => void;
  }
> = (
  {
    code,
    innerHTML,
    renderHash,
    message,
    defaultProps,
    onEvent,
  },
) => {
  if (!code || !renderHash) {
    return <div>Loading</div>;
  }
  // <Counter
  //   startState={{ counter: 0 }}
  //   pastEvents={[]}
  //   onEvent={(e) => {
  //     console.log(e);
  //   }}
  // />;

  const getComponent = (code: string, props: Props) => {
    // console.log()''

    try {
      const componentFactory = new Function(
        "props",
        "React",
        `try{${code}; return Counter(props)}catch(e){console.log(e); return ()=>React.createElement("div", null, "Error in render")}`,
      );

      const Component: React.FC<Props> = (props) =>
        componentFactory({ ...props, onEvent }, React);
      return Component;
    } catch (e) {
      console.log("ERROR", e);
      return null;
    }
  };

  const Component = getComponent(code, defaultProps);

  return <div>
    {Component &&
      <Component
        startState={defaultProps.startState}
        pastEvents={defaultProps.pastEvents}
        onEvent={onEvent}
      />}
    <pre>{message}</pre>
  </div>;
};

const StyledContainer = styled.div`
  background: white;
  padding: 12px;
  width: 200px;
  height: 100px;
  margin: auto;
  display: block;
  border: 2px solid red;
`;

const counter = `
import * as React from "react";

type DState = { counter: number}

const actions = {
  "+1": (s: DState) => ({ ...s, counter: s.counter + 1 }),
  "-1": (s: DState) => ({ ...s, counter: s.counter - 1 }),
};

type ActionType = keyof typeof actions;

interface Props {
    startState: DState
    pastEvents: string[]
    onEvent: (action: string)=>void 
}

export const Counter: React.FC<Props> = ({ startState, pastEvents, onEvent }) => {
  const [state, setState] = React.useState({startState, pastEvents});

  const calculatedState = state.pastEvents.reduce(
    (prevValue, currentValue) => actions[currentValue](prevValue),
    startState 
  );

  return <div>
    <button {...update("-1")}>-</button>
    {calculatedState.counter}
    <button {...update("+1")}>+</button>
  </div>;


  function update(action: ActionType) {
    return {
      "data-onclick": String(action),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        onEvent && onEvent(action);
        setState({ ...state, pastEvents: [...state.pastEvents, action] });
      },
    };
  }
};
`;

type DState = { counter: number };
interface Props {
  startState: DState;
  pastEvents: string[];
  onEvent?: (action: string, hash: string) => void;
}

const defaultProps: Props = {
  startState: { counter: 0 },
  pastEvents: new Array(1000).fill("+1"),
};

// defaultProps.pastEvents= defaultProps.pastEvents.map((x)=>Math.random()>0.4?`+1`:`-1`);

export default function Page() {
  if (typeof window === "undefined") return <div>Loading</div>;

  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      isError: false,
      code: ``,
      transformedCode: ``,
      mainCode: ``,
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
  const [code, changeCode] = React.useState(counter);

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
  // const highlightSyntax = (str: string) =>
  //   <pre
  //     style={{ display: "inline" }}
  //     dangerouslySetInnerHTML={{
  //       __html: Prism.highlight((str), Prism.languages["html"], "html"),
  //     }}
  //   />;

  const onEvent = (action: string) =>
    changeWorkerRenderedComponent(
      {
        ...renderedComponent,
        defaultProps: {
          ...renderedComponent.defaultProps,
          pastEvents: [...renderedComponent.defaultProps.pastEvents, action],
        },
      },
    );

  const [htmlArray, setHtmlArray] = React.useState([] as string[]);

  return <div css={css`width: 100%;`}>
    <div css={css`width: 40%; float:left;`}>
      <MonacoEditor
        width="100%"
        height="100vh"
        value={renderdComponent.mainCode}
        language="typescript"
        onChange={changeCode}
      />
    </div>
    <div css={css`width: 40%; float:left;`}>
      <div>
        {isError && <h1>Error</h1>}
        {!isChangeAvailable && <div>
          <h4>Result</h4>
          <StyledContainer>
            <Wrapper
              key={renderedComponent.codeHash}
              renderHash={renderedComponent.renderedHash}
              code={renderedComponent.transformedCode}
              innerHTML={renderedComponent.renderedContent}
              defaultProps={{
                ...renderedComponent.defaultProps,
              }}
              onEvent={onEvent}
            />
          </StyledContainer>
          <pre>
            {`

        codeHash      ${renderedComponent.codeHash}
        renderedHash      ${renderedComponent.renderedHash}
        
        events        ${renderedComponent.defaultProps.pastEvents}
        eventsHash   ${renderedComponent.defaultStateHash}
                  `}
          </pre>
        </div>}

        {isChangeAvailable && <div>
          {/* <MyComponent /> */}

          <ReactDiffViewer
            oldValue={format(renderedComponent.renderedContent)}
            newValue={format(renderedComponent.renderedContentMain)}
            showDiffOnly={true}
            useDarkTheme={true}
            // renderContent={highlightSyntax}
            leftTitle={<>
              <StyledContainer>
                <Wrapper
                  key={renderedComponent.codeHash}
                  renderHash={renderedComponent.renderedHash}
                  innerHTML={renderedComponent.renderedContent}
                  code={renderedComponent.transformedCode}
                  defaultProps={{
                    ...renderedComponent.defaultProps,
                  }}
                  onEvent={onEvent}
                />
              </StyledContainer>
              <pre>
                {`
            codeHash         ${renderedComponent.codeHash}
            events           ${renderedComponent.defaultProps.pastEvents}
            eventsHash       ${renderedComponent.defaultStateHash}
                      `}
              </pre>
              <button
                onClick={() =>
                  changeWorkerRenderedComponent(
                    {
                      ...renderedComponent,
                      mainCodeHash: renderedComponent.codeHash,
                      renderedContentMain: renderedComponent.renderedContent,
                      renderedMainHash: renderedComponent.renderedHash,
                    },
                  )}
              >
                Save change - as main code
              </button>
            </>}
            rightTitle={<>
              <div>
                <StyledContainer>
                  <Wrapper
                    key={renderedComponent.mainCodeHash}
                    code={renderedComponent.transformedMainCode}
                    innerHTML={renderedComponent.renderedContentMain}
                    renderHash={renderedComponent.renderedMainHash}
                    defaultProps={renderedComponent.defaultProps}
                    onEvent={onEvent}
                  />
                </StyledContainer>
                <pre>
                  {`
            codeHash      ${renderedComponent.mainCodeHash}
            events        ${renderedComponent.defaultProps.pastEvents}
            eventsHash   ${renderedComponent.defaultStateHash}
                      `}
                </pre>
              </div>
              <button
                onClick={() => {
                  changeCode(renderedComponent.mainCode);
                  changeWorkerRenderedComponent({
                    ...renderedComponent,
                    code: renderedComponent.mainCode,
                  });
                }}
              >
                Restore the the code to this version
              </button>
            </>}
            hideLineNumbers={true}
            splitView={true}
          />
        </div>}

        <h2>Yooo</h2>
        <button
          onClick={async () => {
            const hashArray = renderedComponent.defaultProps.pastEvents.map((
              i,
              k,
            ) =>
              hash(
                {
                  ...renderedComponent.defaultProps,
                  pastEvents: renderedComponent.defaultProps.pastEvents.slice(
                    0,
                    k,
                  ),
                },
              )
            );

            console.log("WAiting");
            const done = await Promise.all(hashArray);

            console.log("Done", done);

            const rendered = await Promise.all(
              done.map((h) => render(renderedComponent.transformedMainHash, h)),
            );

            setHtmlArray(rendered);
          }}
        >
          Render all the states
        </button>

        {typeof window !== "undefined" && htmlArray.length > 0
          ? <MyComponent
            htmlArray={htmlArray}
            height={300}
            width={300}
            adjust={(x, y) => {
            }}
          />
          : "Loading"}

        <div
          id="player"
          style={{
            display: "block",
            width: "200px",
            height: "200px",
            background: "red",
          }}
        >
        </div>
      </div>
    </div>
    <div css={css`clear:both`} />
  </div>;
}
