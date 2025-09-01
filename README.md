# Multiplication PWA

This project is a Progressive Web App (PWA) designed to help users practice single-digit multiplication problems. The app presents a multiplication problem, allows the user to input their answer, and tracks their performance over time.

## Features

- Single-digit multiplication problems presented to the user.
- User-configurable time limits for answering problems.
- Dynamic adjustment of time limits based on user performance:
  - Decreases time for consecutive correct answers.
  - Increases time for incorrect answers or missed responses.
- Offline capabilities through service worker caching.
- Installable on Chromebooks and other devices as a PWA.
- No dependencies or frameworks required—vanilla JavaScript.

## Project Structure

```
ttables
├── public
│   ├── index.html           # Main HTML document
│   ├── main.js              # Main application logic (vanilla JS)
│   ├── manifest.json        # PWA metadata
│   ├── service-worker.js    # Service worker for offline support
│   ├── icon-192.png         # App icon (192x192)
│   └── icon-512.png         # App icon (512x512)
└── README.md                # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd ttables
   ```

2. **Add icons:**  
   Place `icon-192.png` and `icon-512.png` in the `public` directory. You can use any PNG images of the appropriate sizes.

3. **Serve the app:**  
   You can use any static file server. For example, with Python 3:
   ```sh
   cd public
   python3 -m http.server 8000
   ```
   Or with [serve](https://www.npmjs.com/package/serve):
   ```sh
   npx serve public
   ```

4. **Open your browser and navigate to:**  
   ```
   http://localhost:8000
   ```
   or the port you chose.

## Usage

- Upon loading the app, a multiplication problem will be displayed.
- Enter your answer in the text box; as soon as the correct answer is entered, it advances to the next problem.
- The timer will adjust based on your performance, making the game progressively more challenging or forgiving.
- You can configure the initial time (in seconds) before starting.
- Use the **Start** and **Pause** buttons to control the session.

## PWA Installation

- In Chrome or Chromium-based browsers, click the install icon in the address bar or use the browser menu to "Install App".
- The app will work offline after the first load.

## Configuration

- The initial time allowed for answers can be set in the app UI before starting.
- The scaling factors for correct and incorrect answers are fixed in the code (`main.js`) but can be changed by editing the constants at the top of that file.

## License

This project is licensed under the MIT License.