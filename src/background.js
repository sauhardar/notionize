// Listen for messages
chrome.runtime.onMessage.addListener((msg, _, response) => {
  if (msg.name === 'message') {
    // Send response
    response({});
  }
});
