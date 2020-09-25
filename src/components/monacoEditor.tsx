import React from "react";

// monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
//     jsx: monaco.languages.typescript.JsxEmit.React,
// });

import MonacoEditor from "react-monaco-editor";

const MonacoEditorComp: React.FC<
    { value: string; changeCode: (code: string) => void }
> = ({ value, changeCode }) => {
    return <div>
        <MonacoEditor
            width="100%"
            height="600"
            language="javascript"
            theme="vs-dark"
            value={value}

            options={{
            }}
            onChange={(e) => changeCode(e)}
        />
    </div>;
};

export default MonacoEditorComp;
