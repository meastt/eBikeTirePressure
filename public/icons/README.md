# PWA Icons

This directory contains the required PWA icons for the E-Bike PSI app.

## Required Icons

- **icon-192.png** - 192x192px app icon
- **icon-512.png** - 512x512px app icon
- **maskable-512.png** - 512x512px maskable icon (safe area within 80% circle)

## Icon Design Guidelines

**Colors:**
- Primary: #1E88E5 (brand blue)
- Background: #FFFFFF or #E3F2FD (light blue)

**Content:**
- Simple, recognizable icon (e.g., tire gauge, PSI meter, bike wheel)
- Minimal text (just "PSI" or logo mark)
- High contrast for visibility on various backgrounds

**Maskable Icon:**
- Keep important content within the center 80% safe zone
- Background should extend to edges for Android adaptive icons
- Test with [Maskable.app](https://maskable.app/)

## Temporary Placeholders

Until proper icons are designed, you can:
1. Use a simple colored square with "PSI" text
2. Generate icons using tools like:
   - [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - Figma/Canva with export at exact sizes

## To Generate Icons

```bash
# If you have a source SVG or large PNG:
# Use PWA Asset Generator or ImageMagick to create all sizes

# Example with ImageMagick:
convert source.png -resize 192x192 icon-192.png
convert source.png -resize 512x512 icon-512.png
convert source-maskable.png -resize 512x512 maskable-512.png
```
