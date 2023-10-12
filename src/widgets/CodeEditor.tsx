import { Editor, useMonaco } from '@monaco-editor/react';
import './CodeEditor.css';
import { useEffect } from 'react';

type AssemblerEditorType = {
    value: string,
}

const AssemblerEditor = ({ value }: AssemblerEditorType) => {
    const monaco = useMonaco()

    useEffect(() => {
        if (monaco) {
            monaco.languages.register({ id: 'asm' })
            monaco.languages.setMonarchTokensProvider('asm', {
                keywords: ['org',],
                tokenizer: {
                    root: [
                        [/^[a-z]+:$/, 'label'],
                        [/^@:$/, 'breakpoint'],
                        [/\/\/.*/, 'comment'],
                        [/0x[0-9a-fA-F]{2,4}/, 'hex'],
                        [/@?[a-zA-Z][\w$]*/, {
                            cases: {
                                '@keywords': 'keyword',
                                '@default': 'mnemonic',
                            }
                        }],
                    ]
                },
            })
            monaco.editor.defineTheme('asm', {
                base: 'vs',
                inherit: true,
                colors: {

                },
                rules: [
                    { token: 'breakpoint', foreground: '#C2274C', fontStyle: 'bold' },
                    { token: 'label', foreground: '#555555' },
                    { token: 'keyword', foreground: '#FF64A2' },
                    { token: 'mnemonic', foreground: '#0D63CD' },
                    { token: 'hex', foreground: '#3B908D' },
                ]
            })
            monaco.editor.setTheme('asm')
        }
    }, [monaco])


    return <div className="editorshell">
        <Editor height="80vh" language="asm" width="40vw" theme="light" value={value} />
    </div>;
}

export default AssemblerEditor;