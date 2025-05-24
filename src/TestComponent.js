import React, { useState } from 'react';

const TestComponent = () => {
    const [testResults, setTestResults] = useState([]);

    const runTests = () => {
        const results = [];

        // Test 1: React rendering
        results.push({
            test: "React Component Rendering",
            status: "✅ PASS",
            details: "React components are rendering correctly"
        });

        // Test 2: Cordova availability
        const cordovaAvailable = !!window.cordova;
        results.push({
            test: "Cordova Integration",
            status: cordovaAvailable ? "✅ PASS" : "⚠️ BROWSER",
            details: cordovaAvailable ? "Cordova is available" : "Running in browser mode"
        });

        // Test 3: Device plugin
        const deviceAvailable = !!window.device;
        results.push({
            test: "Device Plugin",
            status: deviceAvailable ? "✅ PASS" : "⚠️ BROWSER",
            details: deviceAvailable ? "Device info available" : "Device plugin not loaded (browser mode)"
        });

        // Test 4: Camera plugin
        const cameraAvailable = !!navigator.camera;
        results.push({
            test: "Camera Plugin",
            status: cameraAvailable ? "✅ PASS" : "⚠️ BROWSER",
            details: cameraAvailable ? "Camera plugin loaded" : "Camera not available (browser mode)"
        });

        // Test 5: Geolocation
        const geoAvailable = !!navigator.geolocation;
        results.push({
            test: "Geolocation API",
            status: geoAvailable ? "✅ PASS" : "❌ FAIL",
            details: geoAvailable ? "Geolocation API available" : "Geolocation not supported"
        });

        // Test 6: Vibration
        const vibrationAvailable = !!navigator.vibrate;
        results.push({
            test: "Vibration API",
            status: vibrationAvailable ? "✅ PASS" : "⚠️ BROWSER",
            details: vibrationAvailable ? "Vibration API available" : "Vibration not supported (browser mode)"
        });

        // Test 7: Network Information
        const networkAvailable = !!navigator.connection;
        results.push({
            test: "Network Information",
            status: networkAvailable ? "✅ PASS" : "⚠️ BROWSER",
            details: networkAvailable ? "Network info available" : "Network plugin not loaded (browser mode)"
        });

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
                        {testResults.map((result, index) => (
                            <div key={index} className="test-result">
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
                    <p><strong>Platform:</strong> {navigator.platform}</p>
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
