// Logs Panel Component
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { robotAPI } from '@/lib/api/robot';
import { CheckCircle, AlertTriangle, XCircle, Info, Download, Trash2, MapPin, MapPinned } from 'lucide-react';

interface LogEntry {
    timestamp: string;
    level: 'info' | 'error' | 'warning' | 'success';
    message: string;
}

export default function LogsPanel() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [autoScroll, setAutoScroll] = useState(true);
    const logsEndRef = useRef<HTMLDivElement>(null);

    const addLog = (message: string, level: LogEntry['level'] = 'info') => {
        const newLog: LogEntry = {
            timestamp: new Date().toLocaleTimeString(),
            level,
            message,
        };
        setLogs((prev) => [...prev, newLog].slice(-100)); // Keep last 100 logs
    };

    useEffect(() => {
        // Fetch logs periodically
        const interval = setInterval(async () => {
            try {
                const trainingLogs = await robotAPI.getTrainingLogs();
                if (trainingLogs.logs && trainingLogs.logs.length > 0) {
                    trainingLogs.logs.forEach((log: string) => {
                        addLog(log, 'info');
                    });
                }
            } catch (error) {
                // Silent fail - logs endpoint might not always have data
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (autoScroll && logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs, autoScroll]);

    const clearLogs = () => {
        setLogs([]);
    };

    const downloadLogs = () => {
        const logsText = logs.map(log => `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}`).join('\n');
        const blob = new Blob([logsText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `robot-logs-${new Date().toISOString()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getLevelColor = (level: LogEntry['level']) => {
        switch (level) {
            case 'error':
                return 'text-danger-400';
            case 'warning':
                return 'text-yellow-400';
            case 'success':
                return 'text-success-400';
            default:
                return 'text-gray-300';
        }
    };

    const getLevelIcon = (level: LogEntry['level']) => {
        switch (level) {
            case 'error':
                return <XCircle className="w-4 h-4" />;
            case 'warning':
                return <AlertTriangle className="w-4 h-4" />;
            case 'success':
                return <CheckCircle className="w-4 h-4" />;
            default:
                return <Info className="w-4 h-4" />;
        }
    };

    return (
        <div className="glass-dark rounded-lg p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Execution Logs</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setAutoScroll(!autoScroll)}
                        className={`px-3 py-1 rounded text-sm ${autoScroll ? 'bg-primary-600' : 'bg-gray-700'
                            } hover:opacity-80 transition-opacity`}
                    >
                        {autoScroll ? (
                            <>
                                <MapPinned className="w-4 h-4 inline mr-1" />
                                Auto
                            </>
                        ) : (
                            <>
                                <MapPin className="w-4 h-4 inline mr-1" />
                                Manual
                            </>
                        )}
                    </button>
                    <button
                        onClick={downloadLogs}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                    >
                        <Download className="w-4 h-4 inline mr-1" />
                        Download
                    </button>
                    <button
                        onClick={clearLogs}
                        className="px-3 py-1 bg-danger-600 hover:bg-danger-700 rounded text-sm transition-colors"
                    >
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        Clear
                    </button>
                </div>
            </div>

            <div className="flex-1 glass p-4 rounded-lg overflow-y-auto font-mono text-sm space-y-1">
                {logs.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                        No logs yet. Start executing code to see logs here.
                    </div>
                ) : (
                    logs.map((log, index) => (
                        <div key={index} className={`flex gap-3 hover:bg-white/5 px-2 py-1 rounded ${getLevelColor(log.level)}`}>
                            <span className="text-gray-500 flex-shrink-0">[{log.timestamp}]</span>
                            <span className="flex-shrink-0">{getLevelIcon(log.level)}</span>
                            <span className="flex-1 break-all">{log.message}</span>
                        </div>
                    ))
                )}
                <div ref={logsEndRef} />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{logs.length} log entries</span>
                <span>Last update: {logs[logs.length - 1]?.timestamp || 'N/A'}</span>
            </div>
        </div>
    );
}
