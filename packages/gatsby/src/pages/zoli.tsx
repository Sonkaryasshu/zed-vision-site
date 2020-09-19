import Layout from "../components/layout";
import React from "react";
import SEO from "../components/seo";
import { ChangeDetector } from "../components/changeDetector";
import { graphql } from "gatsby";
import { register } from "../components/utils/testWorker";
import { sha256, unHash } from "../components/utils/sha256";

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

const Wrapper = (props: any) => (
  <div dangerouslySetInnerHTML={{ __html: props.innerHTML }} />
);

const Comp1: React.FC<{ onEvent: (event: string) => void }> = ({ onEvent }) => {
  const [count, setCount] = React.useState(0);

  return (
    <>
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
    </>
  );
};

const renderedOutside = register();

const ZedZoliPage = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata.title;

  let rr = renderedOutside();
  const [rrrrr, setRR] = React.useState({ ...rr });

  React.useEffect(() => {
    const runner = async () => {
      const res = await sha256("ello world");
      const val = await unHash(res);
      console.log("ELLO world", val);
    };
    runner();

    setRR({ ...rr });
  }, [rr.innerHTML]);

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Test Worker side rendering" />
      <h1 onClick={() => setRR({ ...rr })}>Not Found!!!</h1>
      <Wrapper key={rrrrr.innerHTML} innerHTML={rrrrr.innerHTML}></Wrapper>
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
