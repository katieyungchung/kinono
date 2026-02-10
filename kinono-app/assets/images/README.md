# Assets Directory

## Required Puzzle Piece Images

Add these two files to this directory:

### 📁 Files Needed:

```
assets/images/
├── puzzlepiece-left.png   ← ADD THIS
├── puzzlepiece-right.png  ← ADD THIS
└── puzzle-logo.png         (existing - can be used as reference)
```

### 🎨 Image Requirements:

**puzzlepiece-left.png**
- Left half of puzzle logo
- Transparent background (PNG)
- Size: 400x400px recommended
- Should include left side of interlocking connector

**puzzlepiece-right.png**
- Right half of puzzle logo
- Transparent background (PNG)
- Size: 400x400px recommended
- Should include right side of interlocking connector

### 💡 Tips:

1. **Split your existing puzzle-logo.png into two halves**
2. **Ensure pieces align perfectly** when placed together
3. **Leave padding** for rotation animation (pieces rotate ±15°)
4. **Use transparent background** so they blend with the purple app background
5. **Keep file size small** (< 50KB each for optimal performance)

### 🧪 How to Create:

**Option 1: Using Figma**
1. Open your Figma file with the puzzle logo
2. Select the left half → Export as PNG → Scale: 3x
3. Select the right half → Export as PNG → Scale: 3x
4. Save as `puzzlepiece-left.png` and `puzzlepiece-right.png`

**Option 2: Using Image Editor**
1. Open `puzzle-logo.png` in your image editor
2. Split the image vertically down the middle
3. Export each half as separate PNG files
4. Ensure transparent backgrounds are preserved

### ✅ After Adding Images:

Run this command to see the animation:
```bash
npx expo start --clear
```

The puzzle pieces will:
- Slide in from left and right sides ←→
- Rotate while moving
- Snap together with a spring animation 🎯
- Pop slightly when connecting
- Feel playful and Apple-like! ✨

---

See `PUZZLE_ANIMATION_SETUP.md` in the root directory for full animation details.

