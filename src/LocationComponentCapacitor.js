import React, { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

const LocationComponent = () => {
    const [location, setLocation] = useState(null);
    const [watching, setWatching] = useState(false);
    const [watchId, setWatchId] = useState(null);
    const [locationHistory, setLocationHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCurrentLocation = async () => {
        setLoading(true);
        try {
            const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000
            });

            const locationData = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                speed: position.coords.speed,
                heading: position.coords.heading,
                timestamp: new Date(position.timestamp)
            };

            setLocation(locationData);
            setLocationHistory(prev => [locationData, ...prev.slice(0, 9)]); // Keep last 10
        } catch (error) {
            console.error('Error getting location:', error);
            alert('Location not available: ' + error.message);
        }
        setLoading(false);
    };

    const startWatching = async () => {
        try {
            const id = await Geolocation.watchPosition({
                enableHighAccuracy: true,
                timeout: 5000
            }, (position, err) => {
                if (err) {
                    console.error('Watch position error:', err);
                    return;
                }

                const locationData = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    altitude: position.coords.altitude,
                    speed: position.coords.speed,
                    heading: position.coords.heading,
                    timestamp: new Date(position.timestamp)
                };

                setLocation(locationData);
                setLocationHistory(prev => [locationData, ...prev.slice(0, 9)]);
            });

            setWatchId(id);
            setWatching(true);
        } catch (error) {
            console.error('Error starting location watch:', error);
            alert('Cannot start location tracking: ' + error.message);
        }
    };

    const stopWatching = async () => {
        if (watchId) {
            await Geolocation.clearWatch({ id: watchId });
            setWatchId(null);
            setWatching(false);
        }
    };

    const formatCoordinate = (coord) => {
        return coord ? coord.toFixed(6) : 'N/A';
    };

    const formatAccuracy = (accuracy) => {
        return accuracy ? `±${accuracy.toFixed(0)}m` : 'N/A';
    };

    const formatSpeed = (speed) => {
        return speed ? `${(speed * 3.6).toFixed(1)} km/h` : 'N/A';
    };

    const formatTime = (timestamp) => {
        return timestamp ? timestamp.toLocaleTimeString() : 'N/A';
    };

    useEffect(() => {
        return () => {
            if (watchId) {
                Geolocation.clearWatch({ id: watchId });
            }
        };
    }, [watchId]);

    return (
        <div className="location-container">
            <h3>🗺️ Location Services</h3>
            
            <div className="location-controls">
                <button 
                    onClick={getCurrentLocation} 
                    disabled={loading}
                    className="feature-button location-btn"
                >
                    {loading ? '📍 Getting Location...' : '📍 Get Current Location'}
                </button>
                
                {!watching ? (
                    <button 
                        onClick={startWatching}
                        className="feature-button watch-btn"
                    >
                        🎯 Start Tracking
                    </button>
                ) : (
                    <button 
                        onClick={stopWatching}
                        className="feature-button stop-btn"
                    >
                        🛑 Stop Tracking
                    </button>
                )}
            </div>

            {watching && (
                <div className="tracking-status">
                    <span className="tracking-indicator">📡 Real-time tracking active</span>
                </div>
            )}

            {location && (
                <div className="location-section">
                    <h4>📍 Current Location</h4>
                    <div className="location-grid">
                        <div className="location-item">
                            <span className="location-label">Latitude:</span>
                            <span className="location-value">{formatCoordinate(location.latitude)}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Longitude:</span>
                            <span className="location-value">{formatCoordinate(location.longitude)}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Accuracy:</span>
                            <span className="location-value">{formatAccuracy(location.accuracy)}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Altitude:</span>
                            <span className="location-value">{location.altitude ? `${location.altitude.toFixed(1)}m` : 'N/A'}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Speed:</span>
                            <span className="location-value">{formatSpeed(location.speed)}</span>
                        </div>
                        <div className="location-item">
                            <span className="location-label">Last Update:</span>
                            <span className="location-value">{formatTime(location.timestamp)}</span>
                        </div>
                    </div>
                </div>
            )}

            {locationHistory.length > 0 && (
                <div className="history-section">
                    <h4>📋 Location History</h4>
                    <div className="history-list">
                        {locationHistory.map((loc, index) => (
                            <div key={index} className="history-item">
                                <span className="history-coords">
                                    {formatCoordinate(loc.latitude)}, {formatCoordinate(loc.longitude)}
                                </span>
                                <span className="history-time">{formatTime(loc.timestamp)}</span>
                                <span className="history-accuracy">{formatAccuracy(loc.accuracy)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!location && (
                <div className="empty-state">
                    <p>📍 No location data available</p>
                    <p>Press "Get Current Location" to start</p>
                </div>
            )}
        </div>
    );
};

export default LocationComponent;
