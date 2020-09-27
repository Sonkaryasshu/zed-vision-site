import React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

import ReactDOM from "react-dom";

import { hash, unHash } from "../components/utils/sha";
import { transform } from "../components/utils/babel";
import { render } from "../components/utils/renderer";

import ReactDiffViewer from "react-diff-viewer";
import format from "html-format";

const MonacoEditor = React.lazy(() => import("../components/monacoEditor"));

const CodeEditorWithFailBack: React.FC<
  { code: string; changeCode: (code: string) => void }
> = ({ code, changeCode }) =>
  <div>
    <React.Suspense fallback={<div>Loading...</div>}>
      <MonacoEditor
        value={code}
        changeCode={(e) => changeCode(e)}
      />
    </React.Suspense>
  </div>;

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
const defaultProps = { startState:{counter: 0}, pastEvents: new Array(10).fill("+1") , onEvent: ()=>{}};
const Wrapper: React.FC<
  {
    code: string;
    innerHTML: string;
    defaultProps: { startState: {counter: number}, pastEvents: string[] };
    changeWorkerRenderedComponent?: any;
    renderedComponent?: any;
  }
> = (
  {
    code,
    innerHTML,
    defaultProps,
    changeWorkerRenderedComponent,
    renderedComponent,
  },
) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!code || !changeWorkerRenderedComponent) return;
  

    const onEvent = (action: string)=>changeWorkerRenderedComponent({
      ...renderedComponent,
      defaultProps: {
        ...renderedComponent.default,
        pastEvents:[...renderedComponent.defaultProps.pastEvents, action]
      }
    });

    const componentFactory = new Function(
      "props",
      "React",
      `${code}; return Component(props)`,
    );
    type DState = { counter: number}
    interface Props {
      startState: DState
      pastEvents: string[]
      onEvent: (action: string)=>void 
  }
    const Component: React.FC<Props>  = (props) => componentFactory( props, React);

    setTimeout(
      () => ReactDOM.hydrate(<Component startState={defaultProps.startState} pastEvents={defaultProps.pastEvents} onEvent={onEvent} />, ref.current),
      10,
    );
  }, [code]);

  return <div
    ref={ref}
    onClick={(e: any) => {
      const action = e.target.getAttribute("data-onclick");
      if (action) {
        changeWorkerRenderedComponent(
          {
            ...renderedComponent,
            defaultProps: {
              ...renderedComponent.defaultProps,
              pastEvents: [
                ...renderedComponent.defaultProps.pastEvents,
                action,
              ],
            },
          },
        );
      }
    }}
    dangerouslySetInnerHTML={{ __html: innerHTML }}
  />;
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

  const isChangeAvailable =
    renderedComponent.renderedMainHash !== renderedComponent.renderedHash;

  return (
    <Layout>
      <SEO title="Test Worker side rendering" />
      {(typeof window !== "undefined") &&
        <CodeEditorWithFailBack code={code} changeCode={changeCode} />}

      {!isChangeAvailable && <div>
        <h4>Result</h4>
        <Wrapper
          key={renderedComponent.renderedMainHash}
          code={renderedComponent.transformedCode}
          defaultProps={renderedComponent.defaultProps}
          innerHTML={renderedComponent.renderedContentMain}
          renderedComponent={renderedComponent}
          changeWorkerRenderedComponent={changeWorkerRenderedComponent}
        />
      </div>}

      {isChangeAvailable && <div>
        <ReactDiffViewer
          oldValue={format(renderedComponent.renderedContent)}
          newValue={format(renderedComponent.renderedContentMain)}
          showDiffOnly={true}
          leftTitle={<Wrapper
            key={renderedComponent.renderedMainHash}
            code={renderedComponent.transformedCode}
            defaultProps={renderedComponent.defaultProps}
            innerHTML={renderedComponent.renderedContentMain}
          />}
          rightTitle={<Wrapper
            key={renderedComponent.renderedHash}
            code={renderedComponent.transformedCode}
            defaultProps={renderedComponent.defaultProps}
            innerHTML={renderedComponent.renderedContent}
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
