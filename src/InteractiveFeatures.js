import React, { useState } from 'react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

const InteractiveFeatures = () => {
    const [counter, setCounter] = useState(0);
    const [lastAction, setLastAction] = useState('');

    const vibrate = async (pattern) => {
        setLastAction(`Vibrated: ${pattern}`);

        try {
            switch (pattern) {
                case 'short':
                    await Haptics.impact({ style: ImpactStyle.Light });
                    break;
                case 'long':
                    await Haptics.impact({ style: ImpactStyle.Heavy });
                    break;
                case 'pattern':
                    // Capacitor doesn't support custom patterns, so simulate with multiple impacts
                    await Haptics.impact({ style: ImpactStyle.Medium });
                    setTimeout(async () => {
                        await Haptics.impact({ style: ImpactStyle.Medium });
                    }, 100);
                    setTimeout(async () => {
                        await Haptics.impact({ style: ImpactStyle.Heavy });
                    }, 300);
                    break;
                case 'sos':
                    // Simulate SOS pattern with notification haptics
                    await Haptics.notification({ type: NotificationType.Warning });
                    setTimeout(async () => {
                        await Haptics.notification({ type: NotificationType.Warning });
                    }, 150);
                    setTimeout(async () => {
                        await Haptics.notification({ type: NotificationType.Error });
                    }, 500);
                    break;
                default:
                    await Haptics.impact({ style: ImpactStyle.Medium });
            }
        } catch (error) {
            console.log('Haptics not available:', error);
            // Fallback to web vibration API
            if (navigator.vibrate) {
                switch (pattern) {
                    case 'short':
                        navigator.vibrate(100);
                        break;
                    case 'long':
                        navigator.vibrate(500);
                        break;
                    case 'pattern':
                        navigator.vibrate([100, 50, 100, 50, 300]);
                        break;
                    case 'sos':
                        navigator.vibrate([100, 50, 100, 50, 100, 200, 300, 50, 300, 50, 300, 200, 100, 50, 100, 50, 100]);
                        break;
                    default:
                        navigator.vibrate(200);
                }
            } else {
                setLastAction('Vibration not supported in browser');
            }
        }
    };

    const showAlert = () => {
        setLastAction('Showed alert dialog');

        if (navigator.notification && navigator.notification.alert) {
            navigator.notification.alert(
                'This is a native alert!',
                () => console.log('Alert dismissed'),
                'React + Cordova',
                'OK'
            );
        } else {
            alert('This is a regular browser alert!\n\nOn Android, this would be a native dialog.');
        }
    };

    const showConfirm = () => {
        setLastAction('Showed confirm dialog');

        if (navigator.notification && navigator.notification.confirm) {
            navigator.notification.confirm(
                'Do you like this React + Cordova app?',
                (buttonIndex) => {
                    const responses = ['', 'Yes!', 'No', 'Maybe'];
                    setLastAction(`User selected: ${responses[buttonIndex]}`);
                },
                'Feedback',
                ['Yes!', 'No', 'Maybe']
            );
        } else {
            const result = confirm('Do you like this React + Cordova app?\n\nOn Android, this would be a native dialog.');
            setLastAction(`User selected: ${result ? 'Yes' : 'No'}`);
        }
    };

    const playBeep = () => {
        setLastAction('Played beep sound');

        if (navigator.notification && navigator.notification.beep) {
            navigator.notification.beep(3);
        } else {
            // Browser fallback - create audio context
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);

                oscillator.frequency.value = 800;
                oscillator.type = 'sine';

                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            } catch (error) {
                console.log('Audio not supported');
                setLastAction('Audio beep not supported in this environment');
            }
        }
    };

    const exitApp = () => {
        setLastAction('Attempted to exit app');

        if (navigator.app && navigator.app.exitApp) {
            navigator.app.exitApp();
        } else {
            alert('Exit app is only available on mobile devices.\n\nOn Android, this would close the app.');
        }
    };

    return (
        <div className="interactive-container">
            <h3>🎮 Interactive Features</h3>

            <div className="feature-section">
                <h4>📳 Vibration Patterns</h4>
                <div className="button-grid">
                    <button onClick={() => vibrate('short')} className="interactive-btn">
                        Short Buzz
                    </button>
                    <button onClick={() => vibrate('long')} className="interactive-btn">
                        Long Buzz
                    </button>
                    <button onClick={() => vibrate('pattern')} className="interactive-btn">
                        Pattern
                    </button>
                    <button onClick={() => vibrate('sos')} className="interactive-btn">
                        SOS Signal
                    </button>
                </div>
            </div>

            <div className="feature-section">
                <h4>💬 Native Dialogs</h4>
                <div className="button-grid">
                    <button onClick={showAlert} className="interactive-btn alert">
                        Show Alert
                    </button>
                    <button onClick={showConfirm} className="interactive-btn confirm">
                        Show Confirm
                    </button>
                    <button onClick={playBeep} className="interactive-btn sound">
                        Play Beep
                    </button>
                </div>
            </div>

            <div className="feature-section">
                <h4>🔢 State Management</h4>
                <div className="counter-section">
                    <div className="counter-display">
                        <span className="counter-value">{counter}</span>
                    </div>
                    <div className="counter-buttons">
                        <button
                            onClick={() => {
                                setCounter(c => c - 1);
                                setLastAction('Decremented counter');
                                vibrate('short');
                            }}
                            className="interactive-btn decrement"
                        >
                            ➖ Decrement
                        </button>
                        <button
                            onClick={() => {
                                setCounter(0);
                                setLastAction('Reset counter');
                                vibrate('pattern');
                            }}
                            className="interactive-btn reset"
                        >
                            🔄 Reset
                        </button>
                        <button
                            onClick={() => {
                                setCounter(c => c + 1);
                                setLastAction('Incremented counter');
                                vibrate('short');
                            }}
                            className="interactive-btn increment"
                        >
                            ➕ Increment
                        </button>
                    </div>
                </div>
            </div>

            <div className="feature-section">
                <h4>⚙️ App Controls</h4>
                <button onClick={exitApp} className="interactive-btn danger">
                    🚪 Exit App
                </button>
            </div>

            {lastAction && (
                <div className="last-action">
                    <strong>Last Action:</strong> {lastAction}
                </div>
            )}

            {!window.cordova && (
                <div className="browser-note">
                    <p>📝 <strong>Note:</strong> Some features are simulated in browser.
                        On Android devices, these will use native APIs.</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveFeatures;
