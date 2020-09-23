import React from "react";

import ReactDOM from "react-dom";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { ChangeDetector } from "../components/changeDetector";
import { graphql } from "gatsby";
import { hash, unHash } from "../components/utils/sha";

import { transform } from "../components/utils/babel";
import { render } from "../components/utils/renderer";
import MonacoEditor from "react-monaco-editor";
import JSONPretty from "react-json-pretty";

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

const Wrapper = (props: any) => {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const pastEvents = props.pastEvents;
    if (props.code) {
      const cc = new Function(
        "props",
        "React",
        `return (${props.code})(props)`,
      );
      const Counter = (props: any) => cc(props, React);
      ReactDOM.hydrate(<Counter pastEvents={pastEvents} />, ref.current);
    }
  }, [props.innerHTML]);

  return <div
    ref={ref}
    dangerouslySetInnerHTML={{ __html: props.innerHTML }}
  />;
};

const Comp1: React.FC<{ onEvent: (event: string) => void }> = ({ onEvent }) => {
  const [count, setCount] = React.useState(0);

  return (
    <React.Fragment>
      <button
        onClick={() => {
          onEvent("double");
          setCount(count * 2);
        }}
      >
        x 2
      </button>
      <button
        onClick={() => {
          onEvent("inc");
          setCount(count + 1);
        }}
      >
        +
      </button>
      {count}
      <button
        onClick={() => {
          onEvent("dec");
          setCount(count - 1);
        }}
      >
        -
      </button>
    </React.Fragment>
  );
};

const counter = `function Counter(props){
  const actions = {
    decrease: state => ({ counter: state.counter - 1 }),  
    double: state => ({ counter: state.counter * 2 }),
    increase: state => ({ counter: state.counter + 1 }),
  }
  const pastEvents = props.pastEvents || []
  

  const [events, setEvents] = React.useState(pastEvents)

  const state = events
    .map(ev => {
      const text = ev.target
      if (text.includes("-")) return "decrease"
      else if (text.includes("+")) return "increase"
      else if (text.includes("x2")) return "double"
    })
    .reduce((state, ev) => actions[ev](state), { counter: 0 })
    
  const onClick = e =>
    setEvents([...events, { type: "click", target: String(e.target.innerHTML) }])

  return (
    <div>
      <button onClick={e => onClick(e)}>-</button>
      <button onClick={e => onClick(e)}>x2</button>
      CountEEer {props.name}:<span>{state.counter}</span>
      <button onClick={e => onClick(e)}>+</button>
    </div>
  )
}
`;

const pastEvents = new Array(100000).fill({
  target: "+",
  type: "click",
});

const ZedZoliPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title;

  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      code: ``,
      transformedCode: ``,
      pastEvents,
      pastEventsHash: ``,
      codeHash: ``,
      transformedHash: ``,
      renderedHash: ``,
      renderedContent: ``,
    },
  );
  const [code, changeCode] = React.useState(counter);

  React.useEffect(() => {
    const runner = async () => {
      const codeHash = await hash(code);
      const transformedHash = await transform(codeHash);

      const pastEventsHash = await hash(pastEvents);
      const transformedCode = await unHash(transformedHash);
      const renderedHash = await render(transformedHash, pastEventsHash);
      const renderedContent = await unHash(renderedHash);

      changeWorkerRenderedComponent(
        {
          code: code,
          codeHash,
          transformedHash,
          transformedCode: transformedCode,
          pastEvents,
          pastEventsHash,
          renderedHash,
          renderedContent,
        },
      );

    };
    if (typeof window !== "undefined" ) runner();
  }, [code]);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Test Worker side rendering" />
      <MonacoEditor
        width="800"
        height="600"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={{}}
        onChange={changeCode}
      />
      <br />
      <Wrapper
        key={renderedComponent.renderedHash}
        code={renderedComponent.transformedCode}
        pastEvents={renderedComponent.pastEvents}
        innerHTML={renderedComponent.renderedContent}
      />
      <br />

      <JSONPretty
        id="json-pretty"
        data={{
          codeHash: renderedComponent.codeHash,
          transformedHash: renderedComponent.transformedHash,
          pastEventsHash: renderedComponent.pastEventsHash,
          renderedHash: renderedComponent.renderedHash,
        }}
      >
      </JSONPretty>

      <hr />
      <hr />
      <hr />
      <ChangeDetector Comp1={Comp1}></ChangeDetector>
      <p>Worker side rendering</p>
      <div id="zoli"></div>
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
