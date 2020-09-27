import React from "react";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

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
function Counter(){
  const defaultState = { counter: 0, pastEvents: new Array<string>(0) };

  const actions = {
    reset: () => defaultState,
    increment: (s = defaultState) => ({ ...s, counter: s.counter + 1 }),
    decrement: (s = defaultState) => ({ ...s, counter: s.counter - 1 }),
  };

  const [state, setState] = React.useState(defaultState);

  const calculatedState = state.pastEvents.reduce((prevValue,currentValue) => actions[currentValue](prevValue), {...state});

  return <div>
    <button onClick={update("decrement")}>-</button>
    {calculatedState.counter}
    <button onClick={update("increment")}>+</button>
  </div>;

  function update(action: ActionType) {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      setState({...state, pastEvents: [...state.pastEvents, action]});
    };
  }

  type ActionType = keyof typeof actions;
}

`;

const pastEventsDefault = new Array(10).fill({
  target: "+",
  type: "click",
});

const ZedZoliPage = () => {
  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      code: ``,
      transformedCode: ``,
      mainCode: ``,
      mainCodeHash: "",
      devCodeHash: "",
      pastEvents: pastEventsDefault,
      pastEventsHash: ``,
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
      const pastEventsHash = await hash(renderedComponent.pastEvents);
      const transformedCode = await unHash(transformedHash);

      const renderedHash = await render(transformedHash, pastEventsHash);
      const renderedMainHash = await render(
        transformedMainHash,
        pastEventsHash,
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
          pastEventsHash,
          renderedHash,
          renderedContent,
          renderedMainHash,
          renderedContentMain,
        },
      );
    };
    if (typeof window !== "undefined") runner();
  }, [code, renderedComponent.pastEvents]);

  const Wrapper = (props: any) => {
    const ref = React.useRef(null);

    return <div
      ref={ref}
      onClick={(e: any) => {
        if (e.target.type) {
          changeWorkerRenderedComponent(
            {
              ...renderedComponent,
              pastEvents: [
                ...renderedComponent.pastEvents,
                { target: e.target.innerHTML, type: "click" },
              ],
            },
          );
        }
      }}
      dangerouslySetInnerHTML={{ __html: props.innerHTML }}
    />;
  };

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
          pastEvents={renderedComponent.pastEvents}
          innerHTML={renderedComponent.renderedContentMain}
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
            pastEvents={renderedComponent.pastEvents}
            innerHTML={renderedComponent.renderedContentMain}
          />}
          rightTitle={<Wrapper
            key={renderedComponent.renderedHash}
            code={renderedComponent.transformedCode}
            pastEvents={renderedComponent.pastEvents}
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
