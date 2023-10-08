import { Editor } from '@monaco-editor/react';
import './CodeEditor.css';

const AssemblerEditor = () => {
    return <div className="editorshell">
        <Editor height="80vh" defaultLanguage="asm" width="50vw" theme="light" defaultValue="ldi 0x23" />
        </div>;
}

export default AssemblerEditor;