import React, { useState } from 'react';

const CameraComponent = () => {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const takePhoto = () => {
        if (!navigator.camera && !window.cordova) {
            setError('Camera not available in browser. This feature works on mobile devices.');
            return;
        }

        setLoading(true);
        setError(null);

        const options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            allowEdit: true,
            correctOrientation: true
        };

        navigator.camera.getPicture(
            (imageData) => {
                setPhoto(`data:image/jpeg;base64,${imageData}`);
                setLoading(false);
            },
            (error) => {
                setError(`Camera error: ${error}`);
                setLoading(false);
            },
            options
        );
    };

    const selectFromGallery = () => {
        if (!navigator.camera && !window.cordova) {
            setError('Camera not available in browser. This feature works on mobile devices.');
            return;
        }

        setLoading(true);
        setError(null);

        const options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 400,
            targetHeight: 400,
            allowEdit: true
        };

        navigator.camera.getPicture(
            (imageData) => {
                setPhoto(`data:image/jpeg;base64,${imageData}`);
                setLoading(false);
            },
            (error) => {
                setError(`Gallery error: ${error}`);
                setLoading(false);
            },
            options
        );
    };

    return (
        <div className="camera-container">
            <h3>📷 Camera Functions</h3>

            <div className="camera-buttons">
                <button
                    onClick={takePhoto}
                    disabled={loading}
                    className="camera-btn primary"
                >
                    {loading ? '📷 Taking Photo...' : '📷 Take Photo'}
                </button>

                <button
                    onClick={selectFromGallery}
                    disabled={loading}
                    className="camera-btn secondary"
                >
                    {loading ? '🖼️ Loading...' : '🖼️ Choose from Gallery'}
                </button>
            </div>

            {error && (
                <div className="error-message">
                    ⚠️ {error}
                </div>
            )}

            {photo && (
                <div className="photo-preview">
                    <h4>📸 Captured Photo:</h4>
                    <img src={photo} alt="Captured" className="captured-photo" />
                    <button
                        onClick={() => setPhoto(null)}
                        className="camera-btn danger"
                    >
                        🗑️ Clear Photo
                    </button>
                </div>
            )}

            {!window.cordova && (
                <div className="browser-note">
                    <p>📝 <strong>Note:</strong> Camera features are only available on mobile devices.
                        On Android, this will open the native camera app.</p>
                </div>
            )}
        </div>
    );
};

export default CameraComponent;
