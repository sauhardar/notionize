// Set video title, link, and date
chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  const { title, url } = tabs[0];
  const currentDate = new Date();

  document.getElementById('video-title').value = title;
  document.getElementById('video-url').innerText = url;
  document.getElementById('date').innerText = currentDate.toLocaleString();
});

setTimeout(() => {
}, 1000);

window.onload = () => {
  chrome.runtime.onMessage.addListener((message) => {
    if (message.channelName) {
      document.getElementById('channelName').value = message.channelName;
    }
  });
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'sendPopupData' });
  });
};
