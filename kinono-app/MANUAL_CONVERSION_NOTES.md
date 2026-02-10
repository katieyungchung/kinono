# Manual Conversion Notes

## Parts That Cannot Be Automatically Converted

This document outlines aspects of the Figma-generated React web app that require manual attention when converting to React Native.

---

## 🚫 1. Browser-Only APIs

### localStorage
**Web Code:**
```javascript
localStorage.setItem('user', JSON.stringify(userData));
const user = JSON.parse(localStorage.getItem('user'));
```

**React Native Solution:**
```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
await AsyncStorage.setItem('user', JSON.stringify(userData));

// Retrieve data
const user = JSON.parse(await AsyncStorage.getItem('user'));
```

**Installation Required:**
```bash
npx expo install @react-native-async-storage/async-storage
```

---

## 🎨 2. Complex CSS Features

### Backdrop Blur
**Web Code:**
```css
backdrop-filter: blur(16px);
```

**React Native Solution:**
Use `expo-blur`:
```javascript
import { BlurView } from 'expo-blur';

<BlurView intensity={80} style={styles.blur}>
  {/* Content */}
</BlurView>
```

**Installation Required:**
```bash
npx expo install expo-blur
```

### CSS Gradients with Multiple Stops
**Web Code:**
```css
background: linear-gradient(to right, #5A3D5C, #F59E0B, #9DE4CF);
```

**React Native Solution:**
Use `expo-linear-gradient`:
```javascript
import { LinearGradient } from 'expo-linear-gradient';

<LinearGradient
  colors={['#5A3D5C', '#F59E0B', '#9DE4CF']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={styles.gradient}
>
  {/* Content */}
</LinearGradient>
```

**Installation Required:**
```bash
npx expo install expo-linear-gradient
```

### Box Shadows
**Web Code:**
```css
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
```

**React Native Solution:**
iOS and Android handle shadows differently:
```javascript
// iOS
shadowColor: '#000',
shadowOffset: { width: 0, height: 10 },
shadowOpacity: 0.3,
shadowRadius: 25,

// Android
elevation: 10,
```

---

## 📱 3. Navigation Patterns

### Web Router (React Router)
**Web Code:**
```javascript
import { BrowserRouter, Route, Link } from 'react-router-dom';

<Link to="/profile">Profile</Link>
```

**React Native Solution:**
Using Expo Router (already set up):
```javascript
import { Link } from 'expo-router';

<Link href="/profile">Profile</Link>
```

For programmatic navigation:
```javascript
import { router } from 'expo-router';

router.push('/profile');
router.back();
```

---

## 🖼️ 4. Image Handling

### Remote Images
**Web Code:**
```html
<img src="https://example.com/image.jpg" />
```

**React Native Solution:**
```javascript
import { Image } from 'expo-image';

<Image 
  source={{ uri: 'https://example.com/image.jpg' }}
  style={styles.image}
  contentFit="cover"
/>
```

### Local Images
**Web Code:**
```javascript
import logo from './assets/logo.png';
<img src={logo} />
```

**React Native Solution:**
```javascript
import { Image } from 'expo-image';

<Image 
  source={require('./assets/logo.png')}
  style={styles.image}
/>
```

---

## 📅 5. Date Pickers

### Web Date Input
**Web Code:**
```html
<input type="date" />
```

**React Native Solution:**
Use `@react-native-community/datetimepicker`:
```javascript
import DateTimePicker from '@react-native-community/datetimepicker';

<DateTimePicker
  value={date}
  mode="date"
  onChange={(event, selectedDate) => setDate(selectedDate)}
/>
```

**Installation Required:**
```bash
npx expo install @react-native-community/datetimepicker
```

---

## 🗺️ 6. Maps

### Web Maps (Google Maps)
**Web Code:**
```javascript
<GoogleMap center={location} zoom={15} />
```

**React Native Solution:**
Use `react-native-maps`:
```javascript
import MapView, { Marker } from 'react-native-maps';

<MapView
  style={styles.map}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
>
  <Marker coordinate={location} />
</MapView>
```

**Installation Required:**
```bash
npx expo install react-native-maps
```

---

## 📍 7. Geolocation

### Web Geolocation
**Web Code:**
```javascript
navigator.geolocation.getCurrentPosition(
  position => console.log(position.coords)
);
```

**React Native Solution:**
Use `expo-location`:
```javascript
import * as Location from 'expo-location';

const { status } = await Location.requestForegroundPermissionsAsync();
if (status === 'granted') {
  const location = await Location.getCurrentPositionAsync({});
  console.log(location.coords);
}
```

**Installation Required:**
```bash
npx expo install expo-location
```

---

## 📸 8. Camera and Photo Picker

### Web File Input
**Web Code:**
```html
<input type="file" accept="image/*" />
```

**React Native Solution:**
Use `expo-image-picker`:
```javascript
import * as ImagePicker from 'expo-image-picker';

const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  aspect: [4, 3],
  quality: 1,
});

if (!result.canceled) {
  setImage(result.assets[0].uri);
}
```

**Installation Required:**
```bash
npx expo install expo-image-picker
```

---

## 🔔 9. Push Notifications

### Web Notifications
**Web Code:**
```javascript
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    new Notification('Hello!');
  }
});
```

**React Native Solution:**
Use `expo-notifications`:
```javascript
import * as Notifications from 'expo-notifications';

const { status } = await Notifications.requestPermissionsAsync();
if (status === 'granted') {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Hello!',
      body: 'This is a notification',
    },
    trigger: null,
  });
}
```

**Installation Required:**
```bash
npx expo install expo-notifications
```

---

## 📊 10. Charts and Graphs

### Web Charts (Chart.js, Recharts)
**Web Code:**
```javascript
import { LineChart } from 'recharts';
```

**React Native Solution:**
Use `react-native-chart-kit` or `victory-native`:
```javascript
import { LineChart } from 'react-native-chart-kit';

<LineChart
  data={{
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [{ data: [20, 45, 28] }]
  }}
  width={300}
  height={200}
  chartConfig={chartConfig}
/>
```

**Installation Required:**
```bash
npm install react-native-chart-kit react-native-svg
```

---

## 🎥 11. Video Playback

### Web Video
**Web Code:**
```html
<video src="video.mp4" controls />
```

**React Native Solution:**
Use `expo-av`:
```javascript
import { Video } from 'expo-av';

<Video
  source={{ uri: 'https://example.com/video.mp4' }}
  style={styles.video}
  useNativeControls
  resizeMode="contain"
/>
```

**Installation Required:**
```bash
npx expo install expo-av
```

---

## 🔐 12. Social Authentication

### OAuth Flows
Social authentication (Google, Facebook, Instagram) requires platform-specific setup:

**Google Sign-In:**
```bash
npx expo install expo-auth-session expo-web-browser
```

**Facebook Sign-In:**
```bash
npx expo install expo-auth-session expo-web-browser
```

Each requires:
1. Creating OAuth apps in respective developer consoles
2. Configuring redirect URIs
3. Adding credentials to `app.json`

**Example Configuration:**
```json
{
  "expo": {
    "scheme": "kinono",
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

---

## 📝 13. Rich Text Editors

### Web Rich Text
**Web Code:**
```javascript
<div contentEditable="true" />
```

**React Native Solution:**
Use `react-native-pell-rich-editor`:
```javascript
import { RichEditor } from 'react-native-pell-rich-editor';

<RichEditor
  ref={richText}
  onChange={text => console.log(text)}
/>
```

---

## 🎯 14. Drag and Drop

### Web Drag and Drop
**Web Code:**
```javascript
<div draggable onDragStart={...} onDrop={...} />
```

**React Native Solution:**
Use `react-native-gesture-handler` and `react-native-reanimated`:
```javascript
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const pan = Gesture.Pan()
  .onUpdate((e) => {
    // Handle drag
  });

<GestureDetector gesture={pan}>
  <Animated.View />
</GestureDetector>
```

---

## 🔍 15. Search with Autocomplete

For location search, contacts, etc., you'll need platform-specific implementations:

**Google Places Autocomplete:**
```bash
npm install react-native-google-places-autocomplete
```

**Contacts:**
```bash
npx expo install expo-contacts
```

---

## ⚠️ Important Considerations

### 1. **Permissions**
React Native requires explicit permission requests for:
- Camera
- Photo library
- Location
- Contacts
- Notifications
- Calendar

### 2. **Platform Differences**
Some features work differently on iOS vs Android:
- Date pickers
- Shadows
- Status bar
- Navigation gestures

### 3. **Performance**
- Large lists need `FlatList` or `SectionList` instead of `ScrollView`
- Images should be optimized and cached
- Animations should use native drivers when possible

### 4. **Testing**
Always test on both iOS and Android devices, as behavior can differ significantly.

---

## 📚 Recommended Packages

Here are the most commonly needed packages for a full-featured app:

```bash
# Essential
npx expo install @react-native-async-storage/async-storage
npx expo install expo-linear-gradient
npx expo install expo-blur

# Media
npx expo install expo-image-picker
npx expo install expo-av

# Location & Maps
npx expo install expo-location
npx expo install react-native-maps

# Notifications
npx expo install expo-notifications

# Authentication
npx expo install expo-auth-session expo-web-browser

# Date/Time
npx expo install @react-native-community/datetimepicker

# Contacts & Calendar
npx expo install expo-contacts
npx expo install expo-calendar
```

---

## 🎓 Learning Resources

- **Expo Documentation**: https://docs.expo.dev
- **React Native Documentation**: https://reactnative.dev
- **React Native Directory**: https://reactnative.directory (find packages)
- **Expo Snack**: https://snack.expo.dev (test code online)

---

**Note**: This migration has converted the core UI components. The features listed above will need to be implemented as you add more functionality to the app.

