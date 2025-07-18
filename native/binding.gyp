{
  "targets": [
    {
      "target_name": "blocker",
      "sources": ["captureBlocker.cpp"],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<!(node -e \"require('nan')\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "libraries": ["-ldwmapi", "-lgdiplus","dcomp.lib"],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
    },
  ]
}
