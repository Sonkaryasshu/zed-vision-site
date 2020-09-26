import React from "react";

// import ReactDOM from "react-dom";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
// import { ChangeDetector } from "../components/changeDetector";
import { graphql } from "gatsby";

import { hash, unHash } from "../components/utils/sha";
import { transform } from "../components/utils/babel";
import { render } from "../components/utils/renderer";
// import JSONPretty from "react-json-pretty";
import styled from "styled-components";
import ReactDiffViewer from "react-diff-viewer";
import format from "html-format";

const StyledContainer = styled.div`
display: flex;
flex-wrap: nowrap;
flex-direction: row;
justify-content: space-evenly;
`;

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

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  location: Location;
}

// const Comp1: React.FC<{ onEvent: (event: string) => void }> = ({ onEvent }) => {
//   const [count, setCount] = React.useState(0);

//   return (
//     <React.Fragment>
//       <button
//         onClick={() => {
//           onEvent("double");
//           setCount(count * 2);
//         }}
//       >
//         x 2
//       </button>
//       <button
//         onClick={() => {
//           onEvent("inc");
//           setCount(count + 1);
//         }}
//       >
//         +
//       </button>
//       {count}
//       <button
//         onClick={() => {
//           onEvent("dec");
//           setCount(count - 1);
//         }}
//       >
//         -
//       </button>
//     </React.Fragment>
//   );
// };

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

const ZedZoliPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title;

  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      code: ``,
      transformedCode: ``,
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
          mainCodeHash,
          codeHash,
          transformedHash,
          transformedMainHash,
          transformedCode: transformedCode,
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

    // React.useEffect(() => {
    //   const pastEvents = props.pastEvents;
    //   if (props.code) {
    //     const cc = new Function(
    //       "props",
    //       "React",
    //       `return (${props.code})(props)`,
    //     );
    //     const Counter = (props: any) => cc(props, React);
    //     ReactDOM.hydrate(<Counter pastEvents={pastEvents} />, ref.current);
    //   }  
    // }, [props.innerHTML]);

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

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Test Worker side rendering" />
      {(typeof window !== "undefined") &&
        <CodeEditorWithFailBack code={code} changeCode={changeCode} />}
    <>
      {renderedComponent.renderedMainHash === renderedComponent.renderedHash && <div>
          <h4>Result</h4>
          <Wrapper
            key={renderedComponent.renderedMainHash}
            code={renderedComponent.transformedCode}
            pastEvents={renderedComponent.pastEvents}
            innerHTML={renderedComponent.renderedContentMain}
          />
          {/* <JSONPretty
            id="json-pretty"
            data={{
              mainCodeHash: renderedComponent.mainCodeHash,
              transformedHash: renderedComponent.transformedMainHash,
              pastEventsHash: renderedComponent.pastEventsHash,
              renderedHash: renderedComponent.renderedMainHash,
            }} */}
          {/* /> */}
        </div>}
        {renderedComponent.renderedMainHash !==
            renderedComponent.renderedHash && <React.Fragment>
          <div>
          <StyledContainer>
          <div>
          <h4>Previous</h4>
          <Wrapper
            key={renderedComponent.renderedMainHash}
            code={renderedComponent.transformedCode}
            pastEvents={renderedComponent.pastEvents}
            innerHTML={renderedComponent.renderedContentMain}
          />
          {/* <JSONPretty
            id="json-pretty"
            data={{
              mainCodeHash: renderedComponent.mainCodeHash,
              transformedHash: renderedComponent.transformedMainHash,
              pastEventsHash: renderedComponent.pastEventsHash,
              renderedHash: renderedComponent.renderedMainHash,
            }}
          /> */}
        </div>
        <div>
          <h4>Next</h4>
          <Wrapper
            key={renderedComponent.renderedHash}
            code={renderedComponent.transformedCode}
            pastEvents={renderedComponent.pastEvents}
            innerHTML={renderedComponent.renderedContent}
          />
          {/* <JSONPretty
            id="json-pretty"
            data={{
              mainCodeHash: renderedComponent.mainCodeHash,
              transformedHash: renderedComponent.transformedMainHash,
              pastEventsHash: renderedComponent.pastEventsHash,
              renderedHash: renderedComponent.renderedMainHash,
            }}
          /> */}
        </div>
          </StyledContainer>
            <div>
              <ReactDiffViewer
                oldValue={format(renderedComponent.renderedContentMain)}
                newValue={format(renderedComponent.renderedContent)}
                showDiffOnly={true}
                splitView={true}
              />
            </div>
            <div>
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
            </div>
          </div>
        </React.Fragment>}
      </>

      {/* <hr />
      <hr />
      <hr /> */}
      {/* <ChangeDetector Comp1={Comp1}></ChangeDetector> */}
      {/* <p>Worker side rendering</p> */}
      {/* <div id="zoli"></div> */}
    </Layout>
  );
};

export default ZedZoliPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
