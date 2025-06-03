import React, { useState, useEffect } from 'react';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { App } from '@capacitor/app';

const DeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [networkInfo, setNetworkInfo] = useState(null);
    const [batteryInfo, setBatteryInfo] = useState(null);
    const [appInfo, setAppInfo] = useState(null);

    useEffect(() => {
        const loadDeviceInfo = async () => {
            try {
                // Get device information
                const deviceData = await Device.getInfo();
                const deviceId = await Device.getId();
                const batteryData = await Device.getBatteryInfo();
                
                setDeviceInfo({
                    platform: deviceData.platform,
                    operatingSystem: deviceData.operatingSystem,
                    osVersion: deviceData.osVersion,
                    model: deviceData.model,
                    manufacturer: deviceData.manufacturer,
                    isVirtual: deviceData.isVirtual,
                    webViewVersion: deviceData.webViewVersion,
                    uuid: deviceId.identifier
                });

                setBatteryInfo({
                    level: Math.round(batteryData.batteryLevel * 100),
                    isPlugged: batteryData.isCharging
                });

                // Get app information
                const appData = await App.getInfo();
                setAppInfo({
                    name: appData.name,
                    id: appData.id,
                    build: appData.build,
                    version: appData.version
                });

            } catch (error) {
                console.log('Device info not available:', error);
                // Fallback for web/browser
                setDeviceInfo({
                    platform: 'web',
                    operatingSystem: navigator.platform,
                    osVersion: navigator.userAgent,
                    model: 'Browser',
                    manufacturer: 'Web',
                    isVirtual: true,
                    webViewVersion: 'Web Browser',
                    uuid: 'web-' + Date.now()
                });

                setBatteryInfo({
                    level: 100,
                    isPlugged: false
                });

                setAppInfo({
                    name: 'React Capacitor App',
                    id: 'com.example.reactapp',
                    build: '1',
                    version: '1.0.0'
                });
            }
        };

        const loadNetworkInfo = async () => {
            try {
                const status = await Network.getStatus();
                setNetworkInfo({
                    connected: status.connected,
                    connectionType: status.connectionType
                });
            } catch (error) {
                console.log('Network info not available:', error);
                // Fallback for web
                setNetworkInfo({
                    connected: navigator.onLine,
                    connectionType: 'unknown'
                });
            }
        };

        const setupListeners = () => {
            // Listen for network changes
            Network.addListener('networkStatusChange', (status) => {
                setNetworkInfo({
                    connected: status.connected,
                    connectionType: status.connectionType
                });
            });

            // Listen for app state changes
            App.addListener('appStateChange', ({ isActive }) => {
                console.log('App state changed. Is active?', isActive);
            });
        };

        loadDeviceInfo();
        loadNetworkInfo();
        setupListeners();
    }, []);

    const refreshData = async () => {
        try {
            const deviceData = await Device.getInfo();
            const batteryData = await Device.getBatteryInfo();
            const networkStatus = await Network.getStatus();
            
            setDeviceInfo(prev => ({ ...prev, ...deviceData }));
            setBatteryInfo({
                level: Math.round(batteryData.batteryLevel * 100),
                isPlugged: batteryData.isCharging
            });
            setNetworkInfo({
                connected: networkStatus.connected,
                connectionType: networkStatus.connectionType
            });
        } catch (error) {
            console.log('Error refreshing data:', error);
        }
    };

    return (
        <div className="device-info-container">
            <div className="feature-header">
                <h3>📱 Device Information</h3>
                <button onClick={refreshData} className="refresh-btn">
                    🔄 Refresh
                </button>
            </div>

            {deviceInfo && (
                <div className="info-section">
                    <h4>Device Details</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Platform:</span>
                            <span className="info-value">{deviceInfo.platform}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">OS:</span>
                            <span className="info-value">{deviceInfo.operatingSystem}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">OS Version:</span>
                            <span className="info-value">{deviceInfo.osVersion}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Model:</span>
                            <span className="info-value">{deviceInfo.model}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Manufacturer:</span>
                            <span className="info-value">{deviceInfo.manufacturer}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Virtual Device:</span>
                            <span className="info-value">{deviceInfo.isVirtual ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">WebView:</span>
                            <span className="info-value">{deviceInfo.webViewVersion}</span>
                        </div>
                    </div>
                </div>
            )}

            {appInfo && (
                <div className="info-section">
                    <h4>📱 App Information</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{appInfo.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">ID:</span>
                            <span className="info-value">{appInfo.id}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Version:</span>
                            <span className="info-value">{appInfo.version}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Build:</span>
                            <span className="info-value">{appInfo.build}</span>
                        </div>
                    </div>
                </div>
            )}

            {networkInfo && (
                <div className="info-section">
                    <h4>🌐 Network Information</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Connected:</span>
                            <span className="info-value">{networkInfo.connected ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Connection Type:</span>
                            <span className="info-value">{networkInfo.connectionType}</span>
                        </div>
                    </div>
                </div>
            )}

            {batteryInfo && (
                <div className="info-section">
                    <h4>🔋 Battery Status</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Level:</span>
                            <span className="info-value">{batteryInfo.level}%</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Charging:</span>
                            <span className="info-value">{batteryInfo.isPlugged ? 'Yes' : 'No'}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeviceInfo;
