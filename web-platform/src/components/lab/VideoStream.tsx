// Video Stream Component for Live Lab Feed
'use client';

import React, { useEffect, useRef, useState } from 'react';

interface VideoStreamProps {
    streamUrl?: string;
    cameraLabel?: string;
}

export default function VideoStream({ streamUrl, cameraLabel = 'Lab Camera' }: VideoStreamProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // For now, show placeholder
        // In production, integrate WebRTC or HLS stream
        setIsLoading(false);
    }, [streamUrl]);

    const toggleFullscreen = () => {
        if (!videoRef.current) return;

        if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <div className="glass-dark rounded-lg p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold">{cameraLabel}</h3>
                <div className="flex items-center gap-2">
                    <div className="px-2 py-1 bg-danger-600 rounded text-xs font-semibold animate-pulse">
                        ● LIVE
                    </div>
                    <button
                        onClick={toggleFullscreen}
                        className="px-2 py-1 glass hover:bg-white/20 rounded text-xs transition-colors"
                    >
                        {isFullscreen ? '📥 Exit' : '📺 Fullscreen'}
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
                    </div>
                ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center text-danger-400">
                        <div className="text-center">
                            <p className="text-xl mb-2">❌ Stream Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Placeholder - Replace with actual video stream */}
                        <div className="text-center text-gray-500">
                            <div className="text-6xl mb-4">📹</div>
                            <p className="text-lg font-semibold mb-2">Live Camera Feed</p>
                            <p className="text-sm">WebRTC stream will appear here</p>
                            <p className="text-xs mt-2 text-gray-600">Connect to the robot to start streaming</p>
                        </div>

                        {/* Hidden video element for future WebRTC integration */}
                        <video
                            ref={videoRef}
                            className="hidden w-full h-full object-contain"
                            autoPlay
                            playsInline
                            muted
                        />
                    </div>
                )}
            </div>

            {/* Stream Controls */}
            <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-2">
                    <button className="px-3 py-1 glass hover:bg-white/20 rounded text-xs transition-colors">
                        📸 Snapshot
                    </button>
                    <button className="px-3 py-1 glass hover:bg-white/20 rounded text-xs transition-colors">
                        🎥 Record
                    </button>
                </div>
                <div className="text-xs text-gray-500">
                    Quality: <span className="text-white">HD</span>
                </div>
            </div>
        </div>
    );
}
