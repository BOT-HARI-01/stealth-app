import { createRequire } from 'module';
import path from 'path';
import { app } from 'electron';

const require = createRequire(import.meta.url);

const isDev = !app.isPackaged;
const nativeModulePath = isDev
  ? path.resolve('./native/build/Release/blocker.node')
  : path.join(process.resourcesPath, 'native', 'build', 'Release', 'blocker.node');

const blocker = require(nativeModulePath);

export function captureBlocker(hwnd) {
  if (!hwnd) return console.warn("Invalid hwnd handle");
  blocker.disableScreenCapture(Number(hwnd));
}
