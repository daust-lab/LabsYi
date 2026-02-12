// Main Lab Dashboard Page - Team 3 Core Interface
'use client';

import React, { useState } from 'react';
import CodeEditor from '@/components/lab/CodeEditor';
import RobotControls from '@/components/lab/RobotControls';
import LogsPanel from '@/components/lab/LogsPanel';
import VideoStream from '@/components/lab/VideoStream';
import { robotAPI } from '@/lib/api/robot';

export default function LabPage() {
    const [code, setCode] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);

    const handleExecuteCode = async () => {
        if (!code.trim()) {
            alert('Please write some code first!');
            return;
        }

        setIsExecuting(true);
        try {
            // In a real implementation, you would create an endpoint to execute custom code
            // For now, we'll use the training endpoint as an example
            console.log('Executing code:', code);

            // Create a temporary file and upload
            const blob = new Blob([code], { type: 'text/plain' });
            const formData = new FormData();
            formData.append('file', blob, 'user_code.py');

            alert('Code execution functionality will be integrated with your backend');
        } catch (error) {
            console.error('Code execution error:', error);
            alert('Error executing code');
        } finally {
            setIsExecuting(false);
        }
    };

    const handleSaveCode = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `robot-code-${new Date().toISOString()}.py`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen gradient-dark p-4">
            {/* Header */}
            <div className="mb-4 glass-dark rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                            Live Lab Dashboard
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Write code, control robots, and watch live execution
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveCode}
                            className="px-4 py-2 glass hover:bg-white/20 rounded-lg transition-colors font-semibold"
                        >
                            💾 Save Code
                        </button>
                        <button
                            onClick={handleExecuteCode}
                            disabled={isExecuting}
                            className="px-6 py-2 gradient-primary text-white rounded-lg font-bold glow transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isExecuting ? '⚙️ Executing...' : '▶️ Execute Code'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Layout: 3-column grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-180px)]">
                {/* Left Column - Video Streams */}
                <div className="lg:col-span-3 space-y-4 overflow-y-auto">
                    <VideoStream cameraLabel="Main Camera" />
                    <VideoStream cameraLabel="Arm Camera" />
                </div>

                {/* Center Column - Code Editor */}
                <div className="lg:col-span-5 glass-dark rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-bold">Code Editor</h2>
                        <div className="flex gap-2">
                            <select className="px-3 py-1 glass rounded text-sm">
                                <option>Python</option>
                                <option>C++</option>
                                <option>JavaScript</option>
                            </select>
                        </div>
                    </div>
                    <div className="h-[calc(100%-40px)]">
                        <CodeEditor value={code} onChange={(value) => setCode(value || '')} />
                    </div>
                </div>

                {/* Right Column - Controls & Logs */}
                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="h-[45%]">
                        <RobotControls />
                    </div>
                    <div className="h-[55%]">
                        <LogsPanel />
                    </div>
                </div>
            </div>
        </div>
    );
}
