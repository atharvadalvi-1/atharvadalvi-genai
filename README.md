# Opinion Battle - Modi vs Gandhi

An interactive web-based opinion poll platform that allows users to vote and share their opinions on India's prominent political leaders: Narendra Modi and Rahul Gandhi.

## Features

### 🗳️ Voting System
- **Split-screen interface** showcasing both political leaders
- **One-time voting** with duplicate prevention using localStorage
- **Real-time vote counts** and percentage displays
- **Visual progress bars** showing vote distribution
- **Smooth animations** on vote submission
- **Persistent data** - votes are saved locally and persist across sessions

### 💭 Opinion Sharing
- **Comment submission form** for users to share their thoughts
- **Support selection** - choose which leader you support or remain neutral
- **Anonymous or named** commenting options
- **Timestamped opinions** with relative time display (e.g., "5 minutes ago")
- **Color-coded opinions** based on which leader is supported
- **Real-time opinion display** with smooth animations

### 🎨 Design & UX
- **Responsive design** - works seamlessly on mobile, tablet, and desktop
- **Modern gradient UI** with professional aesthetics
- **Neutral presentation** - no political bias in design or content
- **Accessibility features** - reduced motion support for users with motion sensitivity
- **Custom scrollbar** styling for better visual consistency
- **Smooth transitions** and hover effects throughout

## Technology Stack

- **HTML5** - Semantic markup with proper meta tags for SEO
- **CSS3** - Modern styling with flexbox, grid, gradients, and animations
- **Vanilla JavaScript** - No dependencies, pure ES6+ JavaScript
- **localStorage API** - Client-side data persistence

## File Structure

```
.
├── index.html       # Main HTML structure
├── styles.css       # All styling and responsive design
├── script.js        # Voting logic and interactivity
└── README.md        # Documentation (this file)
```

## Installation & Usage

### Quick Start

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. No server or build process required!

### Running Locally

Simply double-click on `index.html` or serve it using any local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## How It Works

### Voting Mechanism

1. User clicks on a vote button for their preferred leader
2. JavaScript validates that the user hasn't voted before (checks localStorage)
3. Vote count is incremented and saved to localStorage
4. UI updates with new vote counts and percentages
5. Vote buttons are disabled and the selected button is highlighted
6. User's vote preference is stored to prevent duplicate voting

### Opinion System

1. User fills out the opinion form with their name (optional), support preference, and opinion text
2. Form validation ensures all required fields are filled
3. Opinion object is created with timestamp and unique ID
4. Opinion is added to the opinions array and saved to localStorage
5. UI is updated to display the new opinion with appropriate styling
6. Form is reset for the next submission

### Data Persistence

All data is stored in the browser's localStorage:
- `opinionBattleVotes` - JSON object with vote counts
- `opinionBattleOpinions` - JSON array of all submitted opinions
- `opinionBattleHasVoted` - String indicating which candidate the user voted for

## Browser Compatibility

This website works on all modern browsers:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

**Note:** localStorage must be enabled for full functionality.

## Security Features

- **XSS Prevention** - All user input is escaped before display using `textContent`
- **Input Validation** - Form inputs are validated before processing
- **No external dependencies** - Reduces attack surface
- **Client-side only** - No server-side code, no database vulnerabilities

## Developer Functions

For testing and administration purposes, the following functions are available via the browser console:

### Reset All Data
```javascript
resetAllData()
```
Clears all votes and opinions from localStorage and reloads the page.

### Export Results
```javascript
exportResults()
```
Downloads all votes and opinions as a JSON file for backup or analysis.

## Responsive Breakpoints

- **Desktop:** > 768px
- **Tablet:** 481px - 768px
- **Mobile:** ≤ 480px

## Customization

### Changing Colors

Edit the gradient colors in `styles.css`:
- Header gradient: Line 20-21
- Vote buttons: Line 142
- Percentage bars: Line 116

### Adding More Candidates

1. Add a new candidate card in `index.html`
2. Update the `votes` object in `script.js`
3. Add corresponding styles in `styles.css`
4. Update the opinion form options

### Modifying Vote Limits

To allow unlimited voting, remove or comment out the duplicate vote check in `script.js` (lines related to `hasVoted`).

## Future Enhancements

Potential features for future versions:
- Backend integration for cross-device vote persistence
- Social media sharing buttons
- Poll closing timer with countdown
- Regional vote breakdown using IP geolocation
- Charts and advanced data visualization
- Export results in different formats (CSV, PDF)
- Admin dashboard for managing opinions
- Vote verification via email or phone

## Disclaimer

This is an independent opinion poll platform created for educational and demonstration purposes. It is not affiliated with any political party, government organization, or official election commission.

## License

This project is open source and available for educational and non-commercial use.

## Credits

Developed as a demonstration of modern web development techniques using HTML, CSS, and JavaScript.

---

**Version:** 1.0.0  
**Last Updated:** February 2026  
**Status:** Active
