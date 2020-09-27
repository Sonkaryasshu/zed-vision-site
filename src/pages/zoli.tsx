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
type DState = { counter: number; pastEvents: string[] };

const actions = {
  "+1": (s: DState) => ({ ...s, counter: s.counter + 1 }),
  "-1": (s: DState) => ({ ...s, counter: s.counter - 1 }),
};

const Component: React.FC<{ defaultState: DState }> = ({ defaultState }) => {
  const [state, setState] = React.useState(defaultState);

  const calculatedState = state.pastEvents.reduce(
    (prevValue, currentValue) => actions[currentValue](prevValue),
    { ...state },
  );

  return <div>
    <button {...update("-1")}>-</button>
    {calculatedState.counter}
    <button {...update("+1")}>+</button>
  </div>;

  type ActionType = keyof typeof actions;

  function update(action: ActionType) {
    return {
      "data-onclick": String(action),
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setState({ ...state, pastEvents: [...state.pastEvents, action] });
      },
    };
  }
};

`;

const defaultState = { counter: 57, pastEvents: new Array(10).fill("+1") };

const ZedZoliPage = () => {
  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      code: ``,
      transformedCode: ``,
      mainCode: ``,
      mainCodeHash: "",
      devCodeHash: "",
      defaultState: defaultState,
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
      const defaultStateHash = await hash(renderedComponent.defaultState);
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
  }, [code, renderedComponent.defaultState]);

  const Wrapper = (props: any) => {
    const ref = React.useRef(null);

    return <div
      ref={ref}
      onClick={(e: any) => {
        const action = e.target.getAttribute("data-onclick");
        console.log(action, renderedComponent.defaultState);
        if (action) {
          changeWorkerRenderedComponent(
            {
              ...renderedComponent,
              defaultState: {
                ...renderedComponent.defaultState,
                pastEvents: [
                  ...renderedComponent.defaultState.pastEvents,
                  action,
                ],
              },
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
          defaultState={renderedComponent.defaultState}
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
            defaultState={renderedComponent.defaultState}
            innerHTML={renderedComponent.renderedContentMain}
          />}
          rightTitle={<Wrapper
            key={renderedComponent.renderedHash}
            code={renderedComponent.transformedCode}
            defaultState={renderedComponent.defaultState}
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
