
# Interactive Clock in p5.js

An interactive clock built with [p5.js](https://p5js.org/) that combines both digital and analog elements, with animated transitions triggered at minute, hour, and day changes. The clock includes input options for customization, as well as the ability to display additional information.

## Features

- **Dynamic Animations:**  
  - Animated minute, hour, and day transitions (e.g., expanding hour circle, falling balls).
  - Smooth color and visual transitions triggered at each minute.

- **Display Modes:**  
  - **Digital Display:** Switches between digital clock formats.
  - **Analog Clock:** Uses arcs and lines to represent seconds, minutes, and hours.
  - **Dot Indicators:** Optionally display dots around the clock for additional visual cues.
  - **Additional Information:** Display extra details like time string and current date.

- **Interactive Controls:**  
  - **Mouse Click:** Cycles through different digital display styles.
  - **Keyboard Inputs:**  
    - `Space`: Toggle the dot display on/off.
    - `f`: Toggle fullscreen mode.
    - `b`: Change the background image.
    - `c`: Randomly change the clock's color scheme.
    - `i`: Toggle additional time-related information.
    - `d`: Toggle the date display.

## Installation

### Option 1: Run on the p5.js Web Editor

1. Go to the [p5.js Web Editor](https://editor.p5js.org/).
2. Click **"New Sketch"** to create a new project.
3. Copy and paste the contents of `sketch.js` into the editor.
4. Upload the `bubbleFont.otf` font and all background images used in the sketch:
   - Click on the **"Assets"** tab in the web editor.
   - Upload the `bubbleFont.otf` font and the images (e.g., backgrounds in the `backgrounds/` folder).
5. Click **"Play"** to run the interactive clock in your browser.

### Option 2: Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/interactive-clock.git
   cd interactive-clock
   ```

2. Make sure you have the p5.js library included in your `index.html` file.
3. Place the provided `sketch.js` file in the project directory.
4. Ensure that the `bubbleFont.otf` font and background images are in the correct paths as referenced in the code.
5. Open `index.html` in your browser or run a local server to view the interactive clock.

## Usage

Once the project is running in your browser:

- **Mouse and Keyboard Controls:**
  - **Mouse Click:** Switches between different digital display formats.
  - **Press `Space`:** Toggle the dot indicators on/off.
  - **Press `f`:** Enter or exit fullscreen mode.
  - **Press `b`:** Cycle through various background images.
  - **Press `c`:** Randomly change the color scheme.
  - **Press `i`:** Show or hide additional time-related information.
  - **Press `d`:** Toggle the date display.

## Code Overview

The core animation and logic are handled within `sketch.js`