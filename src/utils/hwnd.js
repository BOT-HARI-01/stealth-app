
export default function getHwndHandle(window){
    const hwndBuffer = window.getNativeWindowHandle();
    let hwnd;
    if (process.arch === "x64") {
      hwnd = hwndBuffer.readBigUInt64LE();
    } else {
      hwnd = hwndBuffer.readUInt32LE();
    }
    return hwnd;
}