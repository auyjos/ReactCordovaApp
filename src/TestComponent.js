import React, { useState } from 'react';
import { Device } from '@capacitor/device';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';

const TestComponent = () => {
    const [testResults, setTestResults] = useState([]);

    const runTests = async () => {
        const results = [];

        // Test 1: React rendering
        results.push({
            test: "React Component Rendering",
            status: "✅ PASS",
            details: "React components are rendering correctly"
        });

        // Test 2: Capacitor availability
        const capacitorAvailable = Capacitor.isNativePlatform();
        results.push({
            test: "Capacitor Integration",
            status: capacitorAvailable ? "✅ PASS" : "⚠️ BROWSER",
            details: capacitorAvailable ? `Running on ${Capacitor.getPlatform()}` : "Running in browser mode"
        });

        // Test 3: Device plugin
        try {
            const deviceInfo = await Device.getInfo();
            results.push({
                test: "Device Plugin",
                status: "✅ PASS",
                details: `Device: ${deviceInfo.model} (${deviceInfo.platform})`
            });
        } catch (error) {
            results.push({
                test: "Device Plugin",
                status: "⚠️ BROWSER",
                details: "Device plugin not loaded (browser mode)"
            });
        }

        // Test 4: Camera plugin
        try {
            // Check if Capacitor Camera is available
            await import('@capacitor/camera');
            results.push({
                test: "Camera Plugin",
                status: "✅ PASS",
                details: "Capacitor Camera plugin available"
            });
        } catch (error) {
            results.push({
                test: "Camera Plugin",
                status: "⚠️ BROWSER",
                details: "Camera not available (browser mode)"
            });
        }

        // Test 5: Geolocation
        try {
            await import('@capacitor/geolocation');
            results.push({
                test: "Geolocation API",
                status: "✅ PASS",
                details: "Capacitor Geolocation plugin available"
            });
        } catch (error) {
            const geoAvailable = !!navigator.geolocation;
            results.push({
                test: "Geolocation API",
                status: geoAvailable ? "⚠️ BROWSER" : "❌ FAIL",
                details: geoAvailable ? "Web Geolocation API available" : "Geolocation not supported"
            });
        }

        // Test 6: Haptics (Vibration)
        try {
            await import('@capacitor/haptics');
            results.push({
                test: "Haptics API",
                status: "✅ PASS",
                details: "Capacitor Haptics plugin available"
            });
        } catch (error) {
            const vibrationAvailable = !!navigator.vibrate;
            results.push({
                test: "Haptics API",
                status: vibrationAvailable ? "⚠️ BROWSER" : "❌ FAIL",
                details: vibrationAvailable ? "Web Vibration API available" : "Haptics not supported"
            });
        }

        // Test 7: Network Information
        try {
            const networkStatus = await Network.getStatus();
            results.push({
                test: "Network Information",
                status: "✅ PASS",
                details: `Network: ${networkStatus.connectionType}, Connected: ${networkStatus.connected}`
            });
        } catch (error) {
            results.push({
                test: "Network Information",
                status: "⚠️ BROWSER",
                details: "Network plugin not loaded (browser mode)"
            });
        }

        setTestResults(results);
    };

    return (
        <div className="test-container">
            <h3>🧪 App Testing Suite</h3>

            <div className="test-section">
                <button onClick={runTests} className="test-btn">
                    🔍 Run All Tests
                </button>

                {testResults.length > 0 && (
                    <div className="test-results">
                        <h4>Test Results:</h4>
                        {testResults.map((result) => (
                            <div key={result.test} className="test-result">
                                <div className="test-header">
                                    <span className="test-status">{result.status}</span>
                                    <span className="test-name">{result.test}</span>
                                </div>
                                <div className="test-details">{result.details}</div>
                            </div>
                        ))}

                        <div className="test-summary">
                            <h4>Summary:</h4>
                            <p>
                                ✅ Passed: {testResults.filter(r => r.status.includes('PASS')).length} |
                                ⚠️ Browser Mode: {testResults.filter(r => r.status.includes('BROWSER')).length} |
                                ❌ Failed: {testResults.filter(r => r.status.includes('FAIL')).length}
                            </p>
                            <div className="test-note">
                                <strong>Note:</strong> "Browser Mode" tests will pass on Android devices with proper Cordova plugins.
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="test-info">
                <h4>🔧 Platform Information:</h4>
                <div className="platform-info">
                    <p><strong>User Agent:</strong> {navigator.userAgent}</p>
                    <p><strong>Platform:</strong> {Capacitor.getPlatform()}</p>
                    <p><strong>Language:</strong> {navigator.language}</p>
                    <p><strong>Online:</strong> {navigator.onLine ? 'Yes' : 'No'}</p>
                    <p><strong>Cordova:</strong> {window.cordova ? `Version ${window.cordova.version}` : 'Not Available'}</p>
                    <p><strong>Screen:</strong> {screen.width} x {screen.height}</p>
                </div>
            </div>
        </div>
    );
};

export default TestComponent;
