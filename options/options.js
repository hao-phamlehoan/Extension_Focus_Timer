const timeOption = document.getElementById("time-option");
timeOption.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    timeOption.value = 25;
  }
});

timeOption.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault()
    chrome.storage.local.set({
      timer: 0,
      timeOption: timeOption.value,
      isRunning: false,
    });
  }
})

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    timeOption: timeOption.value,
    isRunning: false,
  });
});

chrome.storage.local.get(["timeOption"], (res) => {
  timeOption.value = res.timeOption;
});

let webs = [];

const webInput = document.getElementById("web-input");
const addWebBtn = document.getElementById("web-add");
addWebBtn.addEventListener("click", () => addWeb());
webInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addWeb();
  }
});

chrome.storage.sync.get(["webs"], (res) => {
  webs = res.webs ? res.webs : [];
  renderWebs();
});

function saveWebs() {
  chrome.storage.sync.set({
    webs,
  });
}

function renderWeb(webNum) {
  const webRow = document.createElement("div");

  const text = document.createElement("label");
  text.className = "web-label";

  text.appendChild(document.createTextNode(webs[webNum]));

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.className = "web-delete";
  deleteBtn.addEventListener("click", () => {
    deleteWeb(webNum);
  });

  webRow.appendChild(text);
  webRow.appendChild(deleteBtn);

  const webContainer = document.getElementById("web-container");
  webContainer.appendChild(webRow);
}

function addWeb() {
  const webNum = webs.length;
  webs.push(webInput.value);
  webInput.value = "";
  renderWeb(webNum);
  saveWebs();
}

function deleteWeb(webNum) {
  webs.splice(webNum, 1);
  renderWebs();
  saveWebs();
}

function renderWebs() {
  const webContainer = document.getElementById("web-container");
  webContainer.textContent = "";
  webs.forEach((webText, webNum) => {
    renderWeb(webNum);
  });
}
