import React, { useEffect, useState } from 'react';
import './App.css';
import DeviceInfoCapacitor from './DeviceInfoCapacitor';
import CameraComponentCapacitor from './CameraComponentCapacitor';
import LocationComponentCapacitor from './LocationComponentCapacitor';
import InteractiveFeatures from './InteractiveFeatures';
import TestComponent from './TestComponent';
import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

function App() {
    const [isDeviceReady, setIsDeviceReady] = useState(false);
    const [platform, setPlatform] = useState('web');
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        // Initialize Capacitor app
        const initializeApp = async () => {
            try {
                if (Capacitor.isNativePlatform()) {
                    // Running on native platform
                    console.log('Capacitor app is ready!');
                    setIsDeviceReady(true);
                    setPlatform(Capacitor.getPlatform());
                    console.log('Running on platform:', Capacitor.getPlatform());
                    
                    // Listen for app state changes
                    CapacitorApp.addListener('appStateChange', ({ isActive }) => {
                        console.log('App state changed. Is active?', isActive);
                    });
                } else {
                    // Running in browser
                    console.log('Running in browser mode');
                    setIsDeviceReady(true);
                    setPlatform('web');
                }
            } catch (error) {
                console.log('Capacitor initialization error:', error);
                // Fallback for development
                setIsDeviceReady(true);
                setPlatform('web');
            }
        };

        initializeApp();

        // Cleanup function
        return () => {
            // Remove Capacitor listeners if needed
        };
    }, []);

    const tabs = [
        { id: 'home', label: '🏠 Home', icon: '🏠' },
        { id: 'device', label: '📱 Device', icon: '📱' },
        { id: 'camera', label: '📷 Camera', icon: '📷' },
        { id: 'location', label: '🗺️ Location', icon: '🗺️' },
        { id: 'interactive', label: '🎮 Interactive', icon: '🎮' },
        { id: 'test', label: '🧪 Tests', icon: '🧪' }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'device':
                return <DeviceInfoCapacitor />;
            case 'camera':
                return <CameraComponentCapacitor />;
            case 'location':
                return <LocationComponentCapacitor />;
            case 'interactive':
                return <InteractiveFeatures />;
            case 'test':
                return <TestComponent />;
            default:
                return (
                    <div className="home-content">
                        <h1>React + Capacitor App</h1>
                        <div className="status-container">
                            <div className={`status ${isDeviceReady ? 'ready' : 'waiting'}`}>
                                {isDeviceReady ? (
                                    <div>
                                        <p>✅ Device Ready!</p>
                                        <p>Platform: <strong>{platform}</strong></p>
                                    </div>
                                ) : (
                                    <p>⏳ Waiting for device...</p>
                                )}
                            </div>
                        </div>

                        <div className="features">
                            <h2>Features</h2>
                            <div className="feature-grid">
                                <button className="feature-card" onClick={() => setActiveTab('device')}>
                                    <h3>📱 Device Info</h3>
                                    <p>View device specifications and system information</p>
                                </button>
                                <button className="feature-card" onClick={() => setActiveTab('camera')}>
                                    <h3>📷 Camera</h3>
                                    <p>Take photos and access device camera</p>
                                </button>
                                <button className="feature-card" onClick={() => setActiveTab('location')}>
                                    <h3>🗺️ Location</h3>
                                    <p>Get GPS coordinates and location services</p>
                                </button>
                                <button className="feature-card" onClick={() => setActiveTab('interactive')}>
                                    <h3>🎮 Interactive</h3>
                                    <p>Vibration, alerts, and native features</p>
                                </button>
                                <button className="feature-card" onClick={() => setActiveTab('test')}>
                                    <h3>🧪 Tests</h3>
                                    <p>Run app tests and diagnostics</p>
                                </button>
                            </div>
                        </div>

                        {window.cordova && (
                            <div className="cordova-info">
                                <h3>Cordova Info</h3>
                                <p>Version: {window.cordova.version}</p>
                                <p>Platform: {window.cordova.platformId}</p>
                            </div>
                        )}
                    </div>
                );
        }
    };

    const getPlatformIcon = () => {
        if (platform === 'android') return '🤖';
        if (platform === 'ios') return '🍎';
        return '🌐';
    };

    return (
        <div className="App">
            <div className="app-header">
                <h1 className="app-title">React + Cordova</h1>
                <div className="platform-indicator">
                    {getPlatformIcon()} {platform}
                </div>
            </div>

            <div className="tab-navigation">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="app-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default App;
