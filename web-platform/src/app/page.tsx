// Landing Page - Premium Design
'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-accent-500/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-500/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <nav className="relative glass-dark border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="text-2xl">🤖</div>
                <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                  LeLab
                </span>
              </div>
              <div className="flex gap-4">
                <Link href="/auth/login">
                  <button className="px-4 py-2 glass hover:bg-white/20 rounded-lg transition-colors font-semibold">
                    Login
                  </button>
                </Link>
                <Link href="/auth/signup">
                  <button className="px-6 py-2 gradient-primary text-white rounded-lg font-bold glow transform hover:scale-105 transition-all">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fadeIn">
            <span className="gradient-primary bg-clip-text text-transparent">
              Learn Robotics
            </span>
            <br />
            <span className="text-white">From Anywhere</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fadeIn">
            A global platform where anyone can create an account, book lab sessions,
            write code, and execute it on real robots - all from your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
            <Link href="/auth/signup">
              <button className="px-8 py-4 gradient-primary text-white rounded-lg font-bold text-lg glow transform hover:scale-105 transition-all">
                🚀 Start Learning Now
              </button>
            </Link>
            <Link href="/lab">
              <button className="px-8 py-4 glass hover:bg-white/20 rounded-lg font-bold text-lg transition-all">
                📹 View Live Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">
          Everything You Need to <span className="gradient-primary bg-clip-text text-transparent">Master Robotics</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-dark p-6 rounded-lg hover:glow transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">
          How It <span className="gradient-primary bg-clip-text text-transparent">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 glass-dark rounded-full flex items-center justify-center text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                {index + 1}
              </div>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="glass-dark rounded-2xl p-12 text-center glow">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your <span className="gradient-primary bg-clip-text text-transparent">Robotics Journey</span>?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of learners worldwide coding on real robots
          </p>
          <Link href="/auth/signup">
            <button className="px-10 py-4 gradient-primary text-white rounded-lg font-bold text-lg glow transform hover:scale-105 transition-all">
              Create Free Account
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-dark border-t border-white/10 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2026 LeLab. Built for robotics learners worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: '🌍',
    title: 'Learn From Anywhere',
    description: 'Access real robots from anywhere in the world. No hardware required.',
  },
  {
    icon: '📅',
    title: 'Book Lab Sessions',
    description: 'Schedule your own time slots and get dedicated access to robots.',
  },
  {
    icon: '💻',
    title: 'Write Real Code',
    description: 'Use our powerful code editor with syntax highlighting and templates.',
  },
  {
    icon: '▶️',
    title: 'Execute on Robots',
    description: 'Watch your code run on real robots in real-time with live video feeds.',
  },
  {
    icon: '📊',
    title: 'Get Instant Feedback',
    description: 'See execution logs, sensor data, and results immediately.',
  },
  {
    icon: '🎓',
    title: 'Learn & Improve',
    description: 'Access tutorials, documentation, and improve with each session.',
  },
];

const steps = [
  {
    title: 'Create Account',
    description: 'Sign up in seconds with email or Google',
  },
  {
    title: 'Book Session',
    description: 'Choose your time slot from the calendar',
  },
  {
    title: 'Write Code',
    description: 'Use our powerful editor to write robot code',
  },
  {
    title: 'Watch Live',
    description: 'See your code execute on real robots',
  },
];
