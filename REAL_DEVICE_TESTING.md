# Testing on Real Android Device

This guide will help you test your Capacitor app on a real Android phone instead of the emulator.

## Prerequisites

1. ✅ Android Studio installed
2. ✅ App builds successfully on emulator
3. 📱 Physical Android device
4. 🔌 USB cable to connect phone to computer

## Step 1: Enable Developer Options on Your Phone

1. **Open Settings** on your Android phone
2. **Find "About phone"** (usually at the bottom of Settings)
3. **Tap "Build number" 7 times** - you'll see a message saying "You are now a developer!"
4. **Go back to main Settings**
5. **Find "Developer options"** (usually under System or Advanced)

## Step 2: Enable USB Debugging

1. **Open Developer options**
2. **Enable "USB debugging"**
3. **Enable "Install via USB"** (if available)
4. **Optional**: Enable "Stay awake" to keep screen on while charging

## Step 3: Connect Your Phone

1. **Connect your phone to computer** via USB cable
2. **On your phone**: You'll see a popup asking "Allow USB debugging?" - **Tap "Allow"**
3. **Select file transfer mode** (MTP) if prompted

## Step 4: Verify Device Connection

### Option A: If you have ADB installed
Open Command Prompt/PowerShell and run:
```bash
# Check if device is detected
adb devices
```

You should see your device listed like:
```
List of devices attached
ABC123DEF456    device
```

If you see "unauthorized", disconnect and reconnect the USB cable, then allow USB debugging again.

### Option B: If ADB is not found
Don't worry! Capacitor can often detect your device automatically. Continue to Step 5.

**To install ADB (optional but recommended):**
1. Download Android SDK Platform Tools from https://developer.android.com/studio/releases/platform-tools
2. Extract to a folder (e.g., `C:\android-sdk\platform-tools`)
3. Add the folder to your Windows PATH environment variable

## Step 5: Build and Deploy to Real Device

### Method 1: Using Capacitor CLI (Recommended)
```bash
# Build the web assets
npm run build

# Sync with Capacitor
npx cap sync android

# Run on connected device (will auto-detect)
npx cap run android
```

### Method 2: Using Android Studio
```bash
# Open Android project in Android Studio
npx cap open android
```
Then in Android Studio:
1. Make sure your device appears in the device dropdown (top toolbar)
2. Click the green "Run" button ▶️

## Step 6: Install APK Manually (Alternative)

If you want to create an APK to install manually:

```bash
# Build release APK
cd android
./gradlew assembleDebug

# APK will be created at:
# android/app/build/outputs/apk/debug/app-debug.apk
```

Then transfer the APK to your phone and install it.

## Troubleshooting

### Device Not Detected
- Try different USB cable
- Enable "File Transfer" mode on phone
- Install phone manufacturer's USB drivers
- Restart ADB: `adb kill-server` then `adb start-server`

### Build Fails
- Make sure all permissions are granted in Android manifest
- Check that Java/Gradle versions are compatible
- Clear build cache: `cd android && ./gradlew clean`

### App Crashes on Real Device
- Check device logs: `adb logcat | findstr "Capacitor"`
- Ensure all native plugins are properly installed
- Test each feature individually

## Testing Native Features

Once installed on your real device, test:

1. 📷 **Camera**: Take photos and select from gallery
2. 📍 **Location**: Get GPS coordinates
3. 📱 **Device Info**: Check device details
4. 📶 **Network**: Check connectivity status
5. 📳 **Haptics**: Test vibration feedback

## Performance Notes

Real devices typically perform better than emulators:
- ✅ Faster app startup
- ✅ Better camera quality
- ✅ More accurate sensors
- ✅ Real network conditions
- ✅ Actual battery usage

## Next Steps

After successful testing on real device:
1. Test on different Android versions
2. Test on different screen sizes
3. Consider building signed APK for distribution
4. Test offline functionality
5. Performance profiling

## Useful Commands

```bash
# Check connected devices
adb devices

# View device logs
adb logcat

# Install APK manually
adb install app-debug.apk

# Uninstall app
adb uninstall com.myapp.capacitor

# Clear app data
adb shell pm clear com.myapp.capacitor
```
