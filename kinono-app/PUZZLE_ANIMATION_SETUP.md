# Puzzle Piece Animation Setup 🧩

## Animation Created! ✅

A beautiful, playful puzzle piece animation has been implemented in the WelcomePage component with the following features:

### Animation Phases:

1. **Phase 1 (0-800ms): Entry**
   - Left piece enters from left side of screen
   - Right piece enters from right side of screen
   - Both pieces rotate from ±15° to 0° while moving
   - Both pieces scale up from 0.8 to 1.0
   - Uses cubic easing for smooth, natural motion

2. **Phase 2 (800-1000ms): Snap Together**
   - Pieces spring into final position
   - Uses spring physics with overshoot for playful feel
   - Damping: 12, Stiffness: 150 (snappy but controlled)

3. **Phase 3 (1000-1200ms): Pop Effect**
   - Combined puzzle scales up to 1.1x
   - Quick spring animation for satisfaction
   - Feels like pieces "clicking" together

4. **Phase 4 (1200-1400ms): Settle**
   - Scales back to 1.0x
   - Gentle spring for natural settle

5. **Phase 5 (1400ms+): Text Appears**
   - "kinono" title fades in (1400ms)
   - First subtitle fades in (1800ms)
   - Second subtitle fades in (2200ms)
   - "Get Started" button fades in (2600ms)

### Technical Details:

- **Framework**: react-native-reanimated
- **Animations**: 
  - `withTiming()` for smooth entry
  - `withSpring()` for snap and pop effects
  - `useSharedValue()` for performance
  - `useAnimatedStyle()` for transform animations
- **Transforms**: translateX, rotate, scale
- **Image Component**: Expo Image for optimization

## Required Images 📸

You need to add **two separate puzzle piece PNG images** to:

```
assets/images/puzzlepiece-left.png
assets/images/puzzlepiece-right.png
```

### Image Specifications:

**Left Piece** (`puzzlepiece-left.png`):
- Should be the LEFT half of the puzzle
- Include the puzzle connector piece (male/female interlocking part)
- Transparent background (PNG with alpha channel)
- Recommended size: 400x400px at @3x resolution
- Color: Mint/Teal (#9DE4CF) to match your brand

**Right Piece** (`puzzlepiece-right.png`):
- Should be the RIGHT half of the puzzle
- Include the complementary puzzle connector
- Transparent background (PNG with alpha channel)
- Recommended size: 400x400px at @3x resolution
- Color: Can be same mint/teal or different color for contrast

### Image Tips:

1. **Make sure pieces align perfectly** when placed side-by-side
2. **Leave some padding** around the edges for rotation
3. **Use high resolution** (at least 400x400) for retina displays
4. **Keep file size small** (< 50KB each if possible) using PNG compression
5. **Test the animation** after adding images

### Creating the Images:

If you need to create these images:

1. **Using Figma**:
   - Take your existing puzzle logo
   - Split it into two halves
   - Export each half as separate PNG
   - Make sure "Export as: PNG" is selected
   - Set scale to 3x for retina displays

2. **Using Photoshop/Illustrator**:
   - Open your puzzle logo
   - Use slice tool to divide into left/right
   - Export each slice as PNG with transparency
   - Resolution: 400x400px

3. **Using Online Tools**:
   - Upload puzzle image to remove.bg for transparency
   - Use Figma or Canva to split image
   - Export as PNG

## Testing the Animation 🎬

After adding the images:

```bash
# Restart the app to load new assets
npx expo start --clear
```

The animation should:
- ✅ Feel snappy and playful (like Apple's onboarding)
- ✅ Pieces should rotate and scale smoothly
- ✅ Snap together with a satisfying "click" feel
- ✅ Pop slightly when connecting
- ✅ Settle naturally into final position

## Customization Options 🎨

You can adjust these values in `WelcomePage.tsx`:

### Speed Control:
```typescript
// Make faster:
duration: 600  // instead of 800

// Make slower:
duration: 1000 // instead of 800
```

### Spring Bounciness:
```typescript
// More bounce:
damping: 8     // lower = more bounce
stiffness: 200 // higher = snappier

// Less bounce:
damping: 15    // higher = less bounce
stiffness: 120 // lower = slower
```

### Pop Effect Size:
```typescript
// Bigger pop:
withSpring(1.15, { ... })  // instead of 1.1

// Smaller pop:
withSpring(1.05, { ... })  // instead of 1.1
```

### Rotation Amount:
```typescript
// More rotation:
const leftPieceRotate = useSharedValue(-25);  // instead of -15
const rightPieceRotate = useSharedValue(25);   // instead of 15
```

## Animation Timeline 📊

```
0ms     ━━━ Pieces start off-screen (left: -SCREEN_WIDTH, right: +SCREEN_WIDTH)
        │   Rotation: -15° and +15°
        │   Scale: 0.8
        │
0-800ms ━━━ PHASE 1: Pieces move toward center with rotation
        │   Left moves to -30px, Right moves to +30px
        │   Rotation smooths to 0°
        │   Scale grows to 1.0
        │
800ms   ━━━ PHASE 2 STARTS: Spring snap
        │
800-    ━━━ Pieces spring to final position
1000ms  │   Left: -60px, Right: +60px
        │   Overshoot and settle with spring physics
        │
1000ms  ━━━ PHASE 3: Pop effect
        │
1000-   ━━━ Combined scale: 1.0 → 1.1
1200ms  │   Quick spring for "click" satisfaction
        │
1200ms  ━━━ PHASE 4: Settle
        │
1200-   ━━━ Scale back: 1.1 → 1.0
1400ms  │   Gentle settle
        │
1400ms  ━━━ "kinono" title fades in
1800ms  ━━━ First subtitle fades in
2200ms  ━━━ Second subtitle fades in
2600ms  ━━━ Button fades in
```

## Performance ⚡

This animation is highly optimized:
- Uses `useSharedValue` for 60fps performance
- All animations run on UI thread (not JS thread)
- No bridge communication during animation
- Smooth on all devices, even low-end Android

## Apple-Style Feel 🍎

The animation achieves Apple's signature feel through:
- **Anticipation**: Pieces start with rotation and small scale
- **Overshoot**: Spring physics with natural overshoot
- **Satisfaction**: Pop effect on snap
- **Polish**: Smooth easing curves throughout
- **Timing**: Carefully orchestrated delays between phases

## Fallback 🔄

If images are missing, the app will show an error. To add a fallback:

```typescript
// Option 1: Use a placeholder
source={require('@/assets/images/puzzlepiece-left.png')}
// Change to:
source={require('@/assets/images/puzzle-logo.png')} // fallback to old logo

// Option 2: Conditional rendering
{imageExists && <Image source={...} />}
```

---

**Next Step**: Add the two puzzle piece PNG images to `assets/images/` directory! 🎉

