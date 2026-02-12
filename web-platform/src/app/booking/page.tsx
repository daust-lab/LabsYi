// Booking Page - Lab Session Scheduler
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface TimeSlot {
    id: string;
    time: string;
    available: boolean;
    robotId?: string;
}

export default function BookingPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

    // Generate time slots for demo
    const timeSlots: TimeSlot[] = Array.from({ length: 12 }, (_, i) => ({
        id: `slot-${i}`,
        time: `${9 + i}:00 - ${10 + i}:00`,
        available: Math.random() > 0.3,
        robotId: `robot-${Math.floor(Math.random() * 3) + 1}`,
    }));

    const handleBooking = () => {
        if (!selectedSlot) return;
        alert(`Booking confirmed for ${selectedSlot.time} on ${selectedDate.toDateString()}`);
    };

    return (
        <div className="min-h-screen gradient-dark p-4">
            {/* Header */}
            <nav className="glass-dark rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="text-2xl">🤖</div>
                            <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                                LeLab
                            </span>
                        </div>
                    </Link>
                    <div className="flex gap-4">
                        <Link href="/lab">
                            <button className="px-4 py-2 glass hover:bg-white/20 rounded-lg transition-colors">
                                Go to Lab
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">
                    Book a <span className="gradient-primary bg-clip-text text-transparent">Lab Session</span>
                </h1>
                <p className="text-gray-400 mb-8">
                    Choose your preferred time slot and get exclusive access to our robots
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calendar */}
                    <div className="lg:col-span-1 glass-dark rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">Select Date</h2>
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => setSelectedDate(new Date(e.target.value))}
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                        />

                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-4 h-4 bg-success-500 rounded" />
                                <span>Available</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-4 h-4 bg-gray-700 rounded" />
                                <span>Booked</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-4 h-4 bg-primary-500 rounded" />
                                <span>Selected</span>
                            </div>
                        </div>
                    </div>

                    {/* Time Slots */}
                    <div className="lg:col-span-2 glass-dark rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Available Time Slots - {selectedDate.toDateString()}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-2">
                            {timeSlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => slot.available && setSelectedSlot(slot)}
                                    disabled={!slot.available}
                                    className={`p-4 rounded-lg text-left transition-all ${selectedSlot?.id === slot.id
                                            ? 'bg-primary-600 glow'
                                            : slot.available
                                                ? 'glass hover:bg-white/20'
                                                : 'bg-gray-800 cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">🕐 {slot.time}</span>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-bold ${slot.available ? 'bg-success-600' : 'bg-gray-700'
                                                }`}
                                        >
                                            {slot.available ? 'Available' : 'Booked'}
                                        </span>
                                    </div>
                                    {slot.available && (
                                        <p className="text-sm text-gray-400">Robot: {slot.robotId}</p>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                {selectedSlot && (
                    <div className="mt-6 glass-dark rounded-lg p-6 glow">
                        <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Date</p>
                                <p className="font-semibold">{selectedDate.toDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Time Slot</p>
                                <p className="font-semibold">{selectedSlot.time}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 mb-1">Robot</p>
                                <p className="font-semibold">{selectedSlot.robotId}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleBooking}
                            className="w-full md:w-auto px-8 py-3 gradient-primary text-white rounded-lg font-bold glow transform hover:scale-105 transition-all"
                        >
                            ✓ Confirm Booking
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
