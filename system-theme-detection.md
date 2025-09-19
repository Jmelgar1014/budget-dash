# System Theme Preference Detection

## Overview
To implement proper dark/light mode that respects user's system preferences, you need to detect the operating system's theme setting and respond to changes dynamically.

## Browser API: prefers-color-scheme
The primary method for detecting system theme preference is through the CSS media query `prefers-color-scheme`. This media query can detect three states:
- `light` - User prefers light themes
- `dark` - User prefers dark themes  
- `no-preference` - User has not expressed a preference

## Detection Methods

### 1. CSS Media Query
The most straightforward approach uses CSS media queries to automatically apply different styles based on system preference. This works entirely through CSS without JavaScript.

### 2. JavaScript Detection
For dynamic theme switching or when you need to know the preference in JavaScript, you can use `window.matchMedia()` to query the preference programmatically.

### 3. Event Listening
To respond to real-time changes when users switch their system theme (without page refresh), you can listen for changes to the media query.

## Implementation Considerations

### Initial Load
- Check system preference on page load
- Apply appropriate theme immediately to prevent flash
- Consider storing user's manual override choice

### User Overrides
- Allow users to manually select theme regardless of system preference
- Store this choice (localStorage, cookies, or database)
- Respect manual choice over system preference

### Fallback Handling
- Provide default theme when system preference is unavailable
- Handle cases where `prefers-color-scheme` is not supported
- Consider graceful degradation for older browsers

## State Management
- Track three possible states: system, light, dark
- Distinguish between system preference and user override
- Update theme when system preference changes
- Persist user choices across sessions

## Performance Considerations
- Apply theme before hydration to prevent flash
- Use CSS custom properties for efficient theme switching
- Consider server-side rendering implications
- Minimize layout shifts during theme changes

## Accessibility
- Ensure sufficient contrast ratios in both themes
- Test with screen readers in both modes
- Respect user's accessibility preferences
- Consider reduced motion preferences alongside color scheme

## Testing Strategy
- Test on different operating systems (macOS, Windows, Linux)
- Verify behavior when system theme changes
- Test with different browsers and versions
- Validate accessibility in both themes
- Check behavior with JavaScript disabled