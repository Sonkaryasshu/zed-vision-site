import React from "react";

import {MonacoEditor} from "react-cdn-monaco-editor";

const MonacoEditorComp: React.FC<
  { value: string; changeCode: (code: string) => void }
> = ({ value, changeCode }) =>
  <MonacoEditor
    width="100%"
    height="100vh"
    language="typescript"
    value={value}
    onChange={(e) => changeCode(e)}
  />;

export default MonacoEditorComp;
