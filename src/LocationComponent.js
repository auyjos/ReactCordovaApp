import React, { useState, useEffect } from 'react';

const LocationComponent = () => {
    const [location, setLocation] = useState(null);
    const [watching, setWatching] = useState(false);
    const [watchId, setWatchId] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [watchId]);

    const getCurrentLocation = () => {
        setLoading(true);
        setError(null);

        const options = {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 600000
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    timestamp: new Date(position.timestamp).toLocaleString()
                });
                setLoading(false);
            },
            (error) => {
                setError(`Location error: ${error.message}`);
                setLoading(false);
            },
            options
        );
    };

    const startWatching = () => {
        if (watching) return;

        setError(null);
        const options = {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 60000
        };

        const id = navigator.geolocation.watchPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    timestamp: new Date(position.timestamp).toLocaleString()
                });
            },
            (error) => {
                setError(`Watch error: ${error.message}`);
            },
            options
        );

        setWatchId(id);
        setWatching(true);
    };

    const stopWatching = () => {
        if (watchId) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
            setWatching(false);
        }
    };

    const openInMaps = () => {
        if (location) {
            const url = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
            if (window.cordova) {
                // On mobile, try to open in native maps app
                window.open(url, '_system');
            } else {
                // In browser, open in new tab
                window.open(url, '_blank');
            }
        }
    };

    return (
        <div className="location-container">
            <h3>🗺️ Location Services</h3>

            <div className="location-buttons">
                <button
                    onClick={getCurrentLocation}
                    disabled={loading}
                    className="location-btn primary"
                >
                    {loading ? '🔍 Getting Location...' : '📍 Get Current Location'}
                </button>

                {!watching ? (
                    <button
                        onClick={startWatching}
                        className="location-btn success"
                    >
                        ▶️ Start Watching Location
                    </button>
                ) : (
                    <button
                        onClick={stopWatching}
                        className="location-btn danger"
                    >
                        ⏹️ Stop Watching Location
                    </button>
                )}
            </div>

            {watching && (
                <div className="watching-indicator">
                    <span className="pulse-dot"></span>
                    📡 Actively monitoring location...
                </div>
            )}

            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}

            {location && (
                <div className="location-info">
                    <h4>📍 Current Location:</h4>
                    <div className="location-grid">
                        <div className="location-item">
                            <span className="location-label">Latitude:</span>
                            <span className="location-value">{location.latitude.toFixed(6)}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Longitude:</span>
                            <span className="location-value">{location.longitude.toFixed(6)}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Accuracy:</span>
                            <span className="location-value">{location.accuracy ? `${Math.round(location.accuracy)}m` : 'N/A'}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Altitude:</span>
                            <span className="location-value">{location.altitude ? `${Math.round(location.altitude)}m` : 'N/A'}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Speed:</span>
                            <span className="location-value">{location.speed ? `${Math.round(location.speed * 3.6)} km/h` : 'N/A'}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Last Update:</span>
                            <span className="location-value">{location.timestamp}</span>
                        </div>
                    </div>

                    <button
                        onClick={openInMaps}
                        className="location-btn maps"
                    >
                        🗺️ Open in Maps
                    </button>
                </div>
            )}

            {!navigator.geolocation && (
                <div className="browser-note">
                    <p>📝 <strong>Note:</strong> Geolocation not supported in this environment.</p>
                </div>
            )}
        </div>
    );
};

export default LocationComponent;
