import React, { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const CameraComponent = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    const takePhoto = async () => {
        setLoading(true);
        try {
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri,
                source: CameraSource.Camera,
            });

            const newPhoto = {
                id: Date.now(),
                webPath: photo.webPath,
                path: photo.path,
                format: photo.format
            };

            setPhotos(prev => [newPhoto, ...prev]);
        } catch (error) {
            console.error('Error taking photo:', error);
            alert('Camera not available: ' + error.message);
        }
        setLoading(false);
    };

    const selectFromGallery = async () => {
        setLoading(true);
        try {
            const photo = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Uri,
                source: CameraSource.Photos,
            });

            const newPhoto = {
                id: Date.now(),
                webPath: photo.webPath,
                path: photo.path,
                format: photo.format
            };

            setPhotos(prev => [newPhoto, ...prev]);
        } catch (error) {
            console.error('Error selecting photo:', error);
            alert('Gallery not available: ' + error.message);
        }
        setLoading(false);
    };

    const deletePhoto = (photoId) => {
        setPhotos(prev => prev.filter(photo => photo.id !== photoId));
    };

    return (
        <div className="camera-container">
            <h3>📷 Camera Features</h3>

            <div className="camera-controls">
                <button
                    onClick={takePhoto}
                    disabled={loading}
                    className="feature-button camera-btn"
                >
                    {loading ? '📸 Taking Photo...' : '📸 Take Photo'}
                </button>

                <button
                    onClick={selectFromGallery}
                    disabled={loading}
                    className="feature-button gallery-btn"
                >
                    {loading ? '🖼️ Loading...' : '🖼️ Select from Gallery'}
                </button>
            </div>

            {photos.length > 0 && (
                <div className="photos-section">
                    <h4>📱 Recent Photos ({photos.length})</h4>
                    <div className="photos-grid">
                        {photos.map(photo => (
                            <div key={photo.id} className="photo-item">
                                <img
                                    src={photo.webPath}
                                    alt="Captured"
                                    className="photo-preview"
                                />
                                <div className="photo-info">
                                    <span className="photo-format">{photo.format}</span>
                                    <button
                                        onClick={() => deletePhoto(photo.id)}
                                        className="delete-btn"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {photos.length === 0 && (
                <div className="empty-state">
                    <p>📷 No photos taken yet</p>
                    <p>Use the camera or gallery buttons above to add photos</p>
                </div>
            )}
        </div>
    );
};

export default CameraComponent;
