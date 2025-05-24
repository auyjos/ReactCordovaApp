import React, { useState, useEffect } from 'react';

const DeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState(null);
    const [networkInfo, setNetworkInfo] = useState(null);
    const [batteryInfo, setBatteryInfo] = useState(null);

    useEffect(() => {
        const updateDeviceInfo = () => {
            if (window.device) {
                setDeviceInfo({
                    platform: window.device.platform,
                    version: window.device.version,
                    uuid: window.device.uuid,
                    model: window.device.model,
                    manufacturer: window.device.manufacturer,
                    isVirtual: window.device.isVirtual,
                    serial: window.device.serial
                });
            }
        };

        const updateNetworkInfo = () => {
            if (navigator.connection) {
                setNetworkInfo({
                    type: navigator.connection.type,
                    downlink: navigator.connection.downlink,
                    effectiveType: navigator.connection.effectiveType,
                    rtt: navigator.connection.rtt
                });
            }
        };

        const updateBatteryInfo = (info) => {
            setBatteryInfo({
                level: info.level,
                isPlugged: info.isPlugged
            });
        };

        // Listen for device ready
        document.addEventListener('deviceready', () => {
            updateDeviceInfo();
            updateNetworkInfo();

            // Listen for network changes
            document.addEventListener('online', updateNetworkInfo, false);
            document.addEventListener('offline', updateNetworkInfo, false);

            // Listen for battery status
            window.addEventListener('batterystatus', updateBatteryInfo, false);
        }, false);

        // For browser testing
        if (!window.cordova) {
            setTimeout(() => {
                setDeviceInfo({
                    platform: 'Browser',
                    version: navigator.userAgent,
                    uuid: 'browser-uuid-123',
                    model: 'Browser Model',
                    manufacturer: 'Browser Manufacturer',
                    isVirtual: true,
                    serial: 'N/A'
                });
                setNetworkInfo({
                    type: navigator.onLine ? 'wifi' : 'none',
                    downlink: 'Unknown',
                    effectiveType: '4g',
                    rtt: 'Unknown'
                });
            }, 100);
        }

    }, []);

    return (
        <div className="device-info-container">
            <h3>📱 Device Information</h3>

            {deviceInfo && (
                <div className="info-section">
                    <h4>Device Details</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Platform:</span>
                            <span className="info-value">{deviceInfo.platform}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Version:</span>
                            <span className="info-value">{deviceInfo.version}</span>
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
                    </div>
                </div>
            )}

            {networkInfo && (
                <div className="info-section">
                    <h4>🌐 Network Information</h4>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Connection Type:</span>
                            <span className="info-value">{networkInfo.type}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Effective Type:</span>
                            <span className="info-value">{networkInfo.effectiveType}</span>
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
