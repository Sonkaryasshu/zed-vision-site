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


const counter = `function Counter(props){
  const actions = {
    decrease: state => ({ counter: state.counter - 1 }),  
    double: state => ({ counter: state.counter * 2 }),
    increase: state => ({ counter: state.counter + 1 }),
    reset: state => ({ counter: 0 }),
    sum: (state, index)=> ({ counter: index }),
    _skip: state => ({ counter: state.counter }),
  }
  const pastEvents = props.pastEvents || []
  

  const [events, setEvents] = React.useState(pastEvents)

  const state = events
    .map(ev => {
      const text = ev.target
      if (text.includes("-")) return "decrease"
      else if (text.includes("Reset")) return "reset"
      else if (text.includes("SUM")) return "sum"
      else if (text.includes("+")) return "increase"
      else if (text.includes("x2")) return "double"
      else return "_skip"
    })
    .reduce((state, ev, index) => actions[ev](state, index), { counter: 0 })
    
  const onClick = e =>
    setEvents([...events, { type: "click", target: String(e.target.innerHTML) }])

  return (
    <div>
      {state.counter!==0 && <><button onClick={e => onClick(e)}>Reset</button><br/></>}
      {state.counter===0 && <><button onClick={e => onClick(e)}>Jump to all SUM!</button><br/></>}
      <button onClick={e => onClick(e)}>-</button>
      Counter {props.name}:<span>{state.counter}</span>
      <button onClick={e => onClick(e)}>+</button>
    </div>
  )
}
`;

const pastEventsDefault = new Array(10).fill({
  target: "+",
  type: "click",
});

const ZedZoliPage = ( ) => {

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

  const isChangeAvailable = renderedComponent.renderedMainHash !==renderedComponent.renderedHash ;

  return (
    <Layout>
      <SEO title="Test Worker side rendering" />
      {(typeof window !== "undefined") &&
        <CodeEditorWithFailBack code={code} changeCode={changeCode} />}
    
        {!isChangeAvailable&& <div>
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

