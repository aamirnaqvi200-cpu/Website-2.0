import React, { useEffect, useState } from 'react';
import { Play, Film, Video, Edit3 } from 'lucide-react';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  const loadingSteps = [
    { text: 'Loading assets...', duration: 800 },
    { text: 'Preparing videos...', duration: 1000 },
    { text: 'Optimizing experience...', duration: 600 },
    { text: 'Almost ready...', duration: 400 }
  ];

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;
    
    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        const stepProgress = 100 / loadingSteps.length;
        const targetProgress = (currentStep + 1) * stepProgress;
        
        const progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
              setTimeout(updateProgress, 100);
            } else {
              // Complete loading
              setTimeout(() => {
                setProgress(100);
                setLoadingText('Ready!');
                setTimeout(onLoadComplete, 500);
              }, 200);
            }
          }
        }, step.duration / (stepProgress / 2));
      }
    };

    // Start loading sequence
    setTimeout(updateProgress, 500);
  }, [onLoadComplete]);

  const icons = [Play, Film, Video, Edit3];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#1a1a2e] flex items-center justify-center overflow-hidden">
      {/* Sophisticated Grid Background */}
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loadingGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5"/>
            </pattern>
            <filter id="loadingGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#loadingGrid)" filter="url(#loadingGlow)" opacity="0.3" />
        </svg>
      </div>

      {/* Animated Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1e40af]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7c3aed]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#3730a3]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating Icons Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {icons.map((Icon, index) => (
          <div
            key={index}
            className="absolute animate-bounce opacity-20"
            style={{
              top: `${20 + (index * 15)}%`,
              left: `${10 + (index * 20)}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: '3s'
            }}
          >
            <Icon className="w-8 h-8 text-blue-400" />
          </div>
        ))}
        {icons.map((Icon, index) => (
          <div
            key={`right-${index}`}
            className="absolute animate-bounce opacity-20"
            style={{
              top: `${30 + (index * 15)}%`,
              right: `${10 + (index * 15)}%`,
              animationDelay: `${(index * 0.5) + 1.5}s`,
              animationDuration: '3s'
            }}
          >
            <Icon className="w-6 h-6 text-purple-400" />
          </div>
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-glow-purple mb-4">
            Aamir Naqvi
          </h1>
          <p className="text-gray-300 text-lg text-glow-gray">
            Video Editor Portfolio
          </p>
        </div>

        {/* Animated Loading Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full animate-spin border-t-blue-500"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 rounded-full animate-spin border-t-purple-500" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <Play className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white animate-pulse" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-800/50 rounded-full h-2 backdrop-blur-sm border border-white/10">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-400">
            <span>{Math.round(progress)}%</span>
            <span className="text-glow-gray">{loadingText}</span>
          </div>
        </div>

        {/* Loading Message */}
        <p className="text-gray-400 text-sm animate-pulse text-glow-gray">
          Preparing your cinematic experience...
        </p>
      </div>

      {/* Subtle Animation Effects */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50">
        <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;