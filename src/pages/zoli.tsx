import * as React from "react";
import styled, { css } from "styled-components";
import { hash, unHash } from "../components/utils/sha";
import { transform } from "../components/utils/babel";
import { render } from "../components/utils/renderer";
import ReactDiffViewer from "react-diff-viewer";
import format from "html-format";
import { Counter } from "../components/Counter";

const MonacoEditor = React.lazy(() => import("../components/monacoEditor"));

const Wrapper: React.FC<
  {
    code: string;
    message?: string;
    renderHash?: string;
    innerHTML: string;
    defaultProps: Props;
  }
> = (
  {
    code,
    innerHTML,
    renderHash,
    message,
    defaultProps,
  },
) => {
  if (!code || !renderHash) {
    return <div>Loading</div>;
  }
  <Counter
    startState={{ counter: 0 }}
    pastEvents={[]}
    onEvent={(e) => {
      console.log(e);
    }}
  />;

  const Component = getComponent(code, defaultProps);

  return <div>
    {Component &&
      <Component
        startState={{ counter: 0 }}
        pastEvents={[]}
        onEvent={(e) => {
          console.log(e);
        }}
      />}
    <pre>{message}</pre>
  </div>;
};

const CodeEditorWithFailBack: React.FC<
  { code: string; changeCode: (code: string) => void }
> = ({ code, changeCode }) =>
  <React.Suspense fallback={<div>Loading...</div>}>
    <MonacoEditor
      value={code}
      changeCode={changeCode}
    />
  </React.Suspense>;

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

export const getComponent = (code: string, props: Props) => {
  // console.log()''

  try {
    const componentFactory = new Function(
      "props",
      "React",
      `try{${code}; return Counter(props)}catch(e){console.log(e); return ()=>React.createElement("div", null, "Error in render")}`,
    );

    const Component: React.FC<Props> = (props) =>
      componentFactory({ ...props, onEvent: () => {} }, React);
    return Component;
  } catch (e) {
    console.log("ERROR", e);
    return null;
  }
};

type DState = { counter: number };
export interface Props {
  startState: DState;
  pastEvents: string[];
  onEvent?: (action: string, hash: string) => void;
}

const defaultProps: Props = {
  startState: { counter: 0 },
  pastEvents: new Array(10).fill("+1"),
};

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

  return <div css={css`width: 100%;`}>
    <div css={css`width: 40%; float:left;`}>
      <CodeEditorWithFailBack code={code} changeCode={changeCode} />
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
                    onEvent: onEvent,
                  }}
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
                    defaultProps={{
                      ...renderedComponent.defaultProps,
                      onEvent: onEvent,
                    }}
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
      </div>
    </div>
    <div css={css`clear:both`} />
  </div>;
}
