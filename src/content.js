window.onload = () => {
  setTimeout(() => {
    // Get channel name
    const channelName = document.querySelectorAll('div.ytd-channel-name')[0]?.innerText;
    chrome.runtime.sendMessage({ name: 'channelName', channelName });
  }, 1500);
};

chrome.runtime.onMessage.addListener((message) => {
  if (message.message === 'sendPopupData') {
    // YouTube might decide to change these class names in the future!
    const channelName = document.querySelectorAll('div.ytd-channel-name')[0].innerText;
    let title = document.querySelectorAll('h1.ytd-video-primary-info-renderer')[0].innerText;
    title = title.replace(' - YouTube', '');
    chrome.runtime.sendMessage({ name: 'returnPopupData', channelName, title });
  }
});
