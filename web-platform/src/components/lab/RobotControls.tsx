// Robot Controls Panel Component
'use client';

import React, { useState, useEffect } from 'react';
import { robotAPI } from '@/lib/api/robot';
import { useRobotData } from '@/hooks/useRobotData';

export default function RobotControls() {
    const { jointData, isConnected } = useRobotData();
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState('idle');

    const handleEmergencyStop = async () => {
        try {
            await robotAPI.stopTeleoperation();
            await robotAPI.stopRecording();
            await robotAPI.stopTraining();
            await robotAPI.stopReplay();
            setIsRunning(false);
            setStatus('stopped');
        } catch (error) {
            console.error('Emergency stop error:', error);
        }
    };

    const handleStartTeleoperation = async () => {
        try {
            // Get available configs
            const configs = await robotAPI.getConfigs();

            if (configs.leader_configs?.length > 0 && configs.follower_configs?.length > 0) {
                const result = await robotAPI.startTeleoperation({
                    leader_config: configs.leader_configs[0],
                    follower_config: configs.follower_configs[0],
                });

                if (result.status === 'success') {
                    setIsRunning(true);
                    setStatus('teleoperation');
                }
            }
        } catch (error) {
            console.error('Start teleoperation error:', error);
        }
    };

    return (
        <div className="glass-dark rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Robot Controls</h2>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success-500 glow' : 'bg-danger-500'} animate-pulse`} />
                    <span className="text-sm">{isConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
            </div>

            {/* Emergency Stop */}
            <button
                onClick={handleEmergencyStop}
                className="w-full bg-danger-600 hover:bg-danger-700 text-white font-bold py-4 px-6 rounded-lg transition-all glow transform hover:scale-105"
            >
                🛑 EMERGENCY STOP
            </button>

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleStartTeleoperation}
                    disabled={isRunning}
                    className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all"
                >
                    Start Teleoperation
                </button>
                <button
                    onClick={async () => {
                        await robotAPI.stopTeleoperation();
                        setIsRunning(false);
                    }}
                    disabled={!isRunning}
                    className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all"
                >
                    Stop
                </button>
            </div>

            {/* Status Display */}
            <div className="glass p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Status</h3>
                <p className="text-lg font-mono">{status}</p>
            </div>

            {/* Joint Positions */}
            {jointData && (
                <div className="glass p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-3">Joint Positions</h3>
                    <div className="space-y-2">
                        {Object.entries(jointData.joints || {}).map(([joint, value]) => (
                            <div key={joint} className="flex items-center justify-between">
                                <span className="text-sm font-mono">{joint}</span>
                                <div className="flex items-center gap-3 flex-1 ml-4">
                                    <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-primary-500 h-full transition-all duration-300"
                                            style={{ width: `${Math.abs(value as number) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-mono w-16 text-right">
                                        {typeof value === 'number' ? value.toFixed(2) : value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sensor Data */}
            {jointData && (
                <div className="glass p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Live Data</h3>
                    <div className="text-xs font-mono text-gray-300 max-h-32 overflow-y-auto">
                        <pre>{JSON.stringify(jointData, null, 2)}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}
