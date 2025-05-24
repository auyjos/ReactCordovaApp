import React, { useEffect, useState } from 'react';
import './App.css';
import DeviceInfo from './DeviceInfo';
import CameraComponent from './CameraComponent';
import LocationComponent from './LocationComponent';
import InteractiveFeatures from './InteractiveFeatures';
import TestComponent from './TestComponent';

function App() {
    const [isDeviceReady, setIsDeviceReady] = useState(false);
    const [platform, setPlatform] = useState('web');
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        // Listen for the deviceready event
        const onDeviceReady = () => {
            console.log('Cordova device is ready!');
            setIsDeviceReady(true);

            // Check if we're running in Cordova
            if (window.cordova) {
                setPlatform(window.cordova.platformId);
                console.log('Running on platform:', window.cordova.platformId);
            }
        };

        // Add event listener for deviceready
        document.addEventListener('deviceready', onDeviceReady, false);

        // For web browsers, simulate device ready
        if (!window.cordova) {
            setTimeout(() => {
                setIsDeviceReady(true);
                setPlatform('browser');
            }, 100);
        }

        // Cleanup
        return () => {
            document.removeEventListener('deviceready', onDeviceReady);
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
                return <DeviceInfo />;
            case 'camera':
                return <CameraComponent />;
            case 'location':
                return <LocationComponent />;
            case 'interactive':
                return <InteractiveFeatures />;
            case 'test':
                return <TestComponent />;
            default:
                return (
                    <div className="home-content">
                        <h1>React + Cordova App</h1>
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
