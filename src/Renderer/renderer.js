window.api.displayText((_event, message) => {
  const container = document.getElementById("textExample");
  if (container) {
    container.innerHTML = message;
  } else {
    console.warn("Text container not found");
  }
});
