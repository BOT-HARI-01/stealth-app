# Stealth Window

Stealth Window is a native-integrated Electron application designed for overlaying information in locked or kiosk environments. It includes native `.node` modules to block screen capture on Windows and uses advanced Electron window configuration to maintain visibility and priority.

---

## Features

- Frameless, transparent always-on-top window
- Screen capture blocking using native C++ module
- Global keyboard shortcuts to move, hide, show, and quit
- Mouse- and keyboard-ignoring capability
- Auto-creation of `.env` configuration file
- Conditional behavior for development and production modes
- Hardware window handle (HWND) access for native control

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/BOT-HARI-01/stealth-app.git
cd stealth-window


## Native Module (Windows)

To block screen capture and interact with the Windows windowing system, a native `.node` module is used. This module is written in C++ and compiled with Node-API.

### Requirements

- **CMake**: Required to configure and generate native build files.
- **Node.js**: Must be installed with `node-gyp` setup correctly.
- **Windows SDK / Windows Toolkit**: Provides access to required Win32 APIs.
- **Python 3.x**: Required by `node-gyp` during the build process.

### Key Details

- Uses `SetWindowDisplayAffinity` to block screen capture.
- Interacts with window handles (HWND) using `getNativeWindowHandle()` from Electron.
- Compiled `.cpp` files are exposed to JavaScript via Node-API (`N-API`) and loaded using `require(...)`.
- Final output is a `.node` file inside `native/build/Release/`, which is included during packaging.

### Build Command

```bash
npm run node-builder
