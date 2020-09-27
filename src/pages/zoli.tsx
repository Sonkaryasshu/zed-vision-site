import * as React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

// import ReactDOM from "react-dom";

// import Prism from "prismjs";

import { hash, unHash } from "../components/utils/sha";
import { transform } from "../components/utils/babel";
import { render } from "../components/utils/renderer";

import ReactDiffViewer from "react-diff-viewer";
import format from "html-format";

const MonacoEditor = React.lazy(() => import("../components/monacoEditor"));

const CodeEditorWithFailBack: React.FC<
  { code: string; changeCode: (code: string) => void }
> = ({ code, changeCode }) =>
  <React.Suspense fallback={<div>Loading...</div>}>
    <MonacoEditor
      value={code}
      changeCode={changeCode}
    />
  </React.Suspense>;

const counter = `
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

const Component: React.FC<Props> = ({ startState, pastEvents, onEvent }) => {
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
        onEvent(action);
        setState({ ...state, pastEvents: [...state.pastEvents, action] });
      },
    };
  }
};



`;

const getComponent = (code: string, props: Props) => {
  try {
    const componentFactory = new Function(
      "props",
      "React",
      `${code}; return Component(props)`,
    );

    const Component: React.FC<Props> = (props) =>
      componentFactory(props, React);
    return Component;
  } catch (e) {
    console.log("ERROR", e);
    return null;
  }
};

type DState = { counter: number };
interface Props {
  startState: DState;
  pastEvents: string[];
  onEvent: (action: string) => void;
}

const defaultProps: Props = {
  startState: { counter: 0 },
  pastEvents: new Array(10).fill("+1"),
  onEvent: (action) => {},
};

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
  if (!code || !renderHash) return <div>Error!</div>;

  const Component = getComponent(code, defaultProps);

  return <div>
    {Component && <Component
      startState={defaultProps.startState}
      pastEvents={defaultProps.pastEvents}
      onEvent={defaultProps.onEvent}
    />}
    <pre>{message}</pre>
  </div>;
};

const ZedZoliPage = () => {
  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
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
      const transformedCode = await unHash(transformedHash);

      const transformedMainCode = await unHash(transformedMainHash);

      const renderedHash = await render(transformedHash, defaultStateHash);
      const renderedMainHash = await render(
        transformedMainHash,
        defaultStateHash,
      );
      const renderedContent = await unHash(renderedHash);
      const renderedContentMain = await unHash(renderedMainHash);

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
    };
    if (typeof window !== "undefined") runner();
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

  return (
    <Layout>
      <SEO title="Test Worker side rendering" />
      {(typeof window !== "undefined") &&
        <CodeEditorWithFailBack code={code} changeCode={changeCode} />}

      {isError && <h1>Error</h1>}
      {!isChangeAvailable && <div>
        <h4>Result</h4>
        <Wrapper
          key={renderedComponent.codeHash}
          renderHash={renderedComponent.renderedHash}
          code={renderedComponent.transformedCode}
          innerHTML={renderedComponent.renderedContent}
          message={`

codeHash      ${renderedComponent.codeHash}
renderedHash      ${renderedComponent.renderedHash}

events        ${renderedComponent.defaultProps.pastEvents}
eventsHash   ${renderedComponent.defaultStateHash}
          `}
          defaultProps={{ ...renderedComponent.defaultProps, onEvent: onEvent }}
        />
      </div>}

      {isChangeAvailable && <div>
        <ReactDiffViewer
          oldValue={format(renderedComponent.renderedContent)}
          newValue={format(renderedComponent.renderedContentMain)}
          showDiffOnly={true}
          // renderContent={highlightSyntax}
          leftTitle={<Wrapper
            key={renderedComponent.codeHash}
            renderHash={renderedComponent.renderedHash}
            code={renderedComponent.transformedCode}
            message={`
codeHash      ${renderedComponent.codeHash}
events        ${renderedComponent.defaultProps.pastEvents}
eventsHash   ${renderedComponent.defaultStateHash}
          `}
            defaultProps={{
              ...renderedComponent.defaultProps,
              onEvent: onEvent,
            }}
          />}
          rightTitle={<Wrapper
            key={renderedComponent.mainCodeHash}
            code={renderedComponent.transformedMainCode}
            renderHash={renderedComponent.renderedMainHash}
            message={`
codeHash      ${renderedComponent.mainCodeHash}
events        ${renderedComponent.defaultProps.pastEvents}
eventsHash   ${renderedComponent.defaultStateHash}
          `}
            defaultProps={{
              ...renderedComponent.defaultProps,
              onEvent: onEvent,
            }}
          />}
          hideLineNumbers={true}
          splitView={true}
        />

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
        <button
          onClick={() => {
            changeCode(renderedComponent.mainCode);
            changeWorkerRenderedComponent({
              ...renderedComponent,
              code: renderedComponent.mainCode,
            });
          }}
        >
          Restore
        </button>
      </div>}
    </Layout>
  );
};

export default ZedZoliPage;
