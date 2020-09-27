import React from "react";
import { CounterTS } from "../components/Counter";
import { Layout } from "../components/layout";
import { SEO } from "../components/seo";

const ZPage = () =>
  <Layout>
    <SEO title="404: Not Found" />

    <h1>lll</h1>
    <CounterTS startState={{ counter: 0}} pastEvents = {[]} onEvent={(action)=>console.log(action)}  />
  </Layout>;

export default ZPage;
