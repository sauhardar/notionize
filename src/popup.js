let videoTitle = '';
let videoUrl = '';
// Set video title, link, and date
chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
  const { title, url } = tabs[0];

  document.getElementById('video-title').value = title;
  videoTitle = title;
  videoUrl = url;
});

function toLocalISO(date) {
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const msLocal = date.getTime() - offsetMs;
  const dateLocal = new Date(msLocal);
  const iso = dateLocal.toISOString();
  const isoLocal = iso.slice(0, 19);
  return isoLocal;
}

function clickTag(id) {
  const tag = document.getElementById(id);

  if (tag.classList.contains('selected-tag')) {
    tag.classList.remove('selected-tag');
  } else {
    tag.classList.add('selected-tag');
  }
}

function setTagsListener() {
  const tagDivs = document.getElementsByClassName('tag-option');

  for (let i = 0; i < tagDivs.length; i += 1) {
    tagDivs[i].addEventListener('click', () => clickTag(tagDivs[i].id));
  }
}

function getTags() {
  axios.get('https://notionize.sauhardarajbhan.repl.co/tags')
    .then((response) => {
      const tags = response.data;
      document.getElementById('tags-container').innerHTML = tags.map((tag) => `<div id="${tag.name}-${tag.color}" class="tag-option" style="background-color:${tag.color};" value="${tag.name}">${tag.name}</div>`).join('');
      setTagsListener();
    })
    .catch((error) => console.log(error));
}

function getRandomColor() {
  return `hsl(${360 * Math.random()},${
    70 - 40 * Math.random()}%,${
    50 - 45 * Math.random()}%)`;
}

function addNewTags(e) {
  if (e.code === 'Enter') {
    const tags = document.getElementById('new-tags-input').value.split(',');

    for (let i = 0; i < tags.length; i += 1) {
      const tag = tags[i].trim();
      const color = getRandomColor();
      const newTag = `<div id="${tag}-${color}" class="tag-option selected-tag" style="background-color:${color};" value="${tag}">${tag}</div>`;
      document.getElementById('tags-container').innerHTML += newTag;
      setTagsListener();
      document.getElementById('new-tags-input').value = '';
    }
  }
}

async function sendVideo() {
  const by = document.getElementById('channelName').value;
  const tags = Array.from(document.getElementsByClassName('selected-tag')).map((tag) => ({ name: tag.innerText }));

  axios.post('https://notionize.sauhardarajbhan.repl.co/video', {
    title: videoTitle,
    link: videoUrl,
    by,
    date: toLocalISO(new Date()),
    tags,
  });

  await getTags();
}

window.onload = () => {
  getTags();
  document.getElementById('save-btn').addEventListener('click', sendVideo);
  document.getElementById('new-tags-input').addEventListener('keyup', addNewTags);

  chrome.runtime.onMessage.addListener((message) => {
    if (message.name === 'returnPopupData') {
      document.getElementById('channelName').value = message.channelName;
      document.getElementById('video-title').value = message.title;
    }
  });

  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'sendPopupData' });
  });
};
