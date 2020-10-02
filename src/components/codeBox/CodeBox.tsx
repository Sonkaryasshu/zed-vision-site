import React from "react";
import { MonacoEditor } from "react-cdn-monaco-editor";
import { transform } from "../utils/babel";
import { render } from "../utils/renderer";
import { unHash, hash } from "../utils/sha";
import { counterExample, defaultProps } from "./example";
import {
  Container,
  ResultContainer,
  ErrorContainer,
  CodeContainer,
  Header,
} from "./styledCodeBoxComps";
import { ResultComponent } from "./codeboxComponents";

export const CodeBox: React.FC<{
  live?: boolean;
  toRender?: boolean;
  className?: string;
  title?: string;
}> = ({ live, toRender, className, title, children }) => {
  const starterCode = children?.toString().trim() || counterExample;
  if (typeof window === undefined) return <pre>Loading</pre>;
  const [renderedComponent, changeWorkerRenderedComponent] = React.useState(
    {
      isError: false,
      errorMessage: ``,
      code: starterCode,
      transformedCode: ``,
      mainCode: starterCode,
      mainCodeHash: "",
      devCodeHash: "",
      startState: defaultProps.startState,
      pastEvents: defaultProps.pastEvents,
      codeHash: ``,
      transformedMainCode: ``,
      transformedHash: ``,
      transformedMainHash: ``,
      renderedHash: ``,
      defaultStateHash: ``,
      renderedContent: ``,
      renderedMainHash: ``,
      renderedContentMain: ``,
    },
  );
  const [code, changeCode] = React.useState(starterCode);

  React.useEffect(() => {
    const runner = async () => {
      const runnerHash = await hash(renderedComponent);
      const devCodeHash = await hash(code);
      const codeHash = devCodeHash;
      const mainCode = renderedComponent.mainCode
        ? renderedComponent.mainCode
        : code;
      const mainCodeHash = renderedComponent.mainCodeHash
        ? renderedComponent.mainCodeHash
        : devCodeHash;

      let transformedHash;

      try {
        transformedHash = await transform(codeHash);
      } catch (e) {
        const errorMessage = await unHash(e);
        changeWorkerRenderedComponent(
          { ...renderedComponent, isError: true, errorMessage },
        );

        return;
      }
      const transformedMainHash = await transform(mainCodeHash);
      const defaultStateHash = await hash(
        {
          startState: renderedComponent.startState,
          pastEvents: renderedComponent.pastEvents,
        },
      );
      if (!transformedHash) {
        changeWorkerRenderedComponent({ ...renderedComponent, isError: true });
        return;
      }
      const transformedCode = await unHash(transformedHash);

      const transformedMainCode = await unHash(transformedMainHash);

      const renderedHash = await render(transformedHash, defaultStateHash);
      const renderedMainHash = await render(
        transformedMainHash,
        defaultStateHash,
      );
      const renderedContent = await unHash(renderedHash);
      const renderedContentMain = await unHash(renderedMainHash);

      const runnerHash2 = await hash(renderedComponent);

      if (runnerHash === runnerHash2) {
        changeWorkerRenderedComponent(
          {
            ...renderedComponent,
            isError: false,
            errorMessage: "",
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
      }
      if (renderedComponent.renderedContent !== htmlArray[0]) {
        setHtmlArray([renderedComponent.renderedContent, ...htmlArray]);
      }
    };
    runner();
  }, [code, renderedComponent.pastEvents]);

  const [htmlArray, setHtmlArray] = React.useState(
    [renderedComponent.renderedContent],
  );
  // const isChangeAvailable = renderedComponent.renderedContent &&
  // renderedComponent.renderedMainHash !== renderedComponent.renderedHash;

  return <Container>
    {!!title && <Header>{title}</Header>}
    <CodeContainer>
      <MonacoEditor
        width="100%"
        height="100%"
        value={code}
        onChange={changeCode}
      />
    </CodeContainer>
    {renderedComponent.isError && <ErrorContainer>
      <pre>
        {renderedComponent.errorMessage.toString()}
      </pre>
      <button
        onClick={async () => {
          const code = await unHash(renderedComponent.codeHash);
          changeCode(code);
        }}
      >
        Restore to the last working version
      </button>
    </ErrorContainer>}

    {!renderedComponent.isError && <ResultContainer>
      <ResultComponent
        htmlArray={htmlArray}
        onEvent={(ev: string) => {
          changeWorkerRenderedComponent(
            {
              ...renderedComponent,
              pastEvents: [...renderedComponent.pastEvents, ev],
            },
          );
        }}
      />
    </ResultContainer>}
  </Container>;
};
