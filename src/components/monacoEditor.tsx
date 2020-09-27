import React from "react";

// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//     jsx: monaco.languages.typescript.JsxEmit.React,
// });

import MonacoEditor from "react-monaco-editor";

const MonacoEditorComp: React.FC<
  { value: string; changeCode: (code: string) => void }
> = ({ value, changeCode }) =>
  <MonacoEditor
    width="100%"
    height="600"
    language="typescript"
    theme="vs-dark"
    value={value}
    options={{}}
    onChange={(e) => changeCode(e)}
  />;

export default MonacoEditorComp;
