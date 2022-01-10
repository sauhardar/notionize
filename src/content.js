window.onload = () => {
  setTimeout(() => {
    // Get channel name
    const channelName = document.querySelectorAll('div.ytd-channel-name')[0].innerText;
    chrome.runtime.sendMessage({ name: 'channelName', channelName });
  }, 1500);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.message === 'sendPopupData') {
    const channelName = document.querySelectorAll('div.ytd-channel-name')[0].innerText;
    chrome.runtime.sendMessage({ name: 'channelName', channelName });
  }
});
