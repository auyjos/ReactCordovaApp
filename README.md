# React + Cordova Mobile App

A sophisticated mobile application built with React and Apache Cordova, demonstrating native device features and modern web technologies.

## 🚀 Features

- **📱 Device Information** - Real device specs, network info, battery status
- **📷 Camera Integration** - Native camera access and photo gallery
- **🗺️ GPS Location Services** - Real-time location tracking with high accuracy
- **🎮 Interactive Features** - Vibration patterns, native dialogs, sound effects
- **⚛️ Modern React Architecture** - Hooks-based components with state management
- **🎨 Responsive Design** - Mobile-first UI that adapts to all screen sizes
- **🧪 Testing Suite** - Built-in feature testing and diagnostics

## 📱 Supported Platforms

- **🌐 Web Browser** - Development and testing
- **🤖 Android** - Full native Android app
- **🍎 iOS** - iOS app support (requires macOS for building)

## 🛠️ Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Cordova CLI (`npm install -g cordova`)

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build

# Run in browser
npm run cordova:run:browser
```

### Android Setup
```bash
# Run setup script (Windows)
.\setup-android.ps1

# Or manual setup:
# 1. Install Android Studio
# 2. Install Android SDK Platform 34
# 3. Set ANDROID_HOME environment variable
# 4. Build for Android
npm run cordova:build:android
```

## 📂 Project Structure

```
MyApp/
├── src/                      # React source code
│   ├── App.js               # Main app with tabbed interface
│   ├── DeviceInfo.js        # Device specifications
│   ├── CameraComponent.js   # Camera functionality
│   ├── LocationComponent.js # GPS and location services
│   ├── InteractiveFeatures.js # Native features demo
│   ├── TestComponent.js     # Testing suite
│   └── *.css               # Component styling
├── www/                     # Built web assets
├── platforms/               # Platform-specific code
├── plugins/                 # Cordova plugins
├── config.xml              # Cordova configuration
├── webpack.config.js       # Build configuration
└── package.json            # Dependencies and scripts
```

## 🔌 Cordova Plugins

| Plugin | Purpose | Features |
|--------|---------|----------|
| `cordova-plugin-device` | Device Info | Model, platform, version |
| `cordova-plugin-camera` | Camera Access | Photo capture, gallery |
| `cordova-plugin-geolocation` | GPS Location | Real-time coordinates |
| `cordova-plugin-vibration` | Haptic Feedback | Custom vibration patterns |
| `cordova-plugin-network-information` | Network Status | Connection type monitoring |
| `cordova-plugin-battery-status` | Battery Info | Level and charging status |

## 🧪 Testing

### Browser Testing
```bash
npm run serve
# Navigate to http://localhost:8080
```

### Feature Testing
Open `test-features.html` in your browser to run comprehensive feature tests.

### Android Testing
```bash
# Build and run on connected device
npm run cordova:run:android:device

# Run on emulator
npm run cordova:emulate:android
```

## 📱 Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm run dev` | Development build with watch |
| `npm run serve` | Development server |
| `npm run cordova:build:android` | Android build |
| `npm run cordova:run:android:device` | Run on Android device |
| `npm run cordova:emulate:android` | Run on Android emulator |

## 🎯 Key Differences: Browser vs Android

### Browser Mode
- Simulated device information
- Limited camera access (getUserMedia)
- HTML5 geolocation
- Web Vibration API
- Standard browser dialogs

### Android Mode
- Real device specifications
- Native camera with full features
- GPS with high accuracy
- Native vibration patterns
- Material Design dialogs
- Better performance
- True mobile experience

## 🔧 Development Tips

1. **Always test on real devices** - Emulators can't simulate all features
2. **Handle permissions gracefully** - Request only when needed
3. **Optimize for mobile** - Consider battery and data usage
4. **Progressive enhancement** - Graceful fallbacks for web browsers
5. **Use Chrome DevTools** - Mobile device simulation for debugging

## 📱 Device Permissions

The app requests these Android permissions:
- Camera access
- Location services (fine and coarse)
- Vibration control
- Network state access
- Storage access

## 🚀 Deployment

### Android Play Store
1. Build release APK: `npm run cordova:build:android:release`
2. Sign the APK with your keystore
3. Upload to Google Play Console

### iOS App Store
1. Build on macOS with Xcode
2. Submit through App Store Connect

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

Apache 2.0 License - see LICENSE file for details

## 🆘 Troubleshooting

### Common Issues

**Android build fails:**
- Ensure Android Studio is installed
- Check ANDROID_HOME environment variable
- Install Android SDK Platform 34

**Plugins not working:**
- Run `cordova plugin list` to verify installation
- Check device permissions
- Test on real device, not just browser

**Build errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clean Cordova: `npm run clean`
- Rebuild: `npm run build`

### Getting Help

1. Check the `ANDROID_GUIDE.md` for detailed setup instructions
2. Run the feature test suite in `test-features.html`
3. Review Cordova documentation for platform-specific issues

---

**Built with ❤️ using React, Cordova, and modern web technologies**
