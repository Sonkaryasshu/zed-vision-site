import React from "react";

import ReactDOM from "react-dom";

import { Layout } from "../components/layout";
import { SEO } from "../components/seo";
import { ChangeDetector } from "../components/changeDetector";
import { graphql } from "gatsby";
import { register } from "../components/utils/testWorker";
import { hash, unHash } from "../components/utils/sha";
// import { sha256W, unhash } from "../components/utils/sha";

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

const renderedOutside = register(counter);

const ZedZoliPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title;

  let workerRenderedComponent = renderedOutside();

  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    { ...workerRenderedComponent, outside: workerRenderedComponent },
  );
  const [code, changeCode] = React.useState(counter);
  const [sha, changeSha] = React.useState("");

  React.useEffect(() => {
    const runner = async () => {
      // if (!sha256W) return;
      const res = await hash("ello world");
      changeSha(res);
      const val = await unHash(res);
      console.log("ELLO world", val);
    };
    runner();

    const renderedOutside = register(code);
    let workerRenderedComponent = renderedOutside();

    changeWorkerRenderedComponent(
      { ...workerRenderedComponent, outside: workerRenderedComponent },
    );
  }, [renderedComponent.outside.innerHTML]);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Test Worker side rendering" />
      <textarea value={code} onChange={(e) => changeCode(e.target.value)}>
      </textarea>
      {sha}
      <h1
        onClick={() =>
          changeWorkerRenderedComponent(
            { ...workerRenderedComponent, outside: renderedComponent.outside },
          )}
      >
        Not Found!!!
      </h1>

      <Wrapper
        key={renderedComponent.innerHTML}
        code={renderedComponent.compiledCode}
        pastEvents={renderedComponent.pastEvents}
        innerHTML={renderedComponent.innerHTML}
      >
      </Wrapper>
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
