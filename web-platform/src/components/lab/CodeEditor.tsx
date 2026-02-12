// Monaco Code Editor Component
'use client';

import React, { useRef } from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    language?: string;
    readOnly?: boolean;
    height?: string;
}

const pythonTemplate = `# Robot Control Script
# Write your code below to control the robot

def main():
    # Your robot control logic here
    print("Hello, Robot!")
    
    # Example: Move robot arm
    # robot.move_to_position([x, y, z])
    
    pass

if __name__ == "__main__":
    main()
`;

export default function CodeEditor({
    value,
    onChange,
    language = 'python',
    readOnly = false,
    height = '100%',
}: CodeEditorProps) {
    const editorRef = useRef(null);

    function handleEditorDidMount(editor: any) {
        editorRef.current = editor;
    }

    return (
        <div className="w-full h-full rounded-lg overflow-hidden border border-white/10">
            <Editor
                height={height}
                defaultLanguage={language}
                value={value || pythonTemplate}
                onChange={onChange}
                theme="vs-dark"
                options={{
                    readOnly,
                    minimap: { enabled: true },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                }}
                onMount={handleEditorDidMount}
            />
        </div>
    );
}
