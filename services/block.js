const enterSite = document.querySelector(".enterSite");
const siteList = document.querySelector(".blockList");

$(document).ready(() => {
  //fetch all blocked sites from local storage
  getSites();
  $("body").on("click", 'input[type="checkbox"].site', (site) => {
    const siteId = site.target.parentNode.parentNode.id;
    deleteSite(siteId);
  });
});

enterSite.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const site = enterSite.value;
    addSite(site);
  }
});

function addSite(site) {
  enterSite.value = "";
  // Get the site array from storage
  const sitePromise = chrome.storage.local.get("site");

  // Append the new site to the site array
  sitePromise.then((data) => {
    const siteArray = data.site || [];
    siteList.innerHTML += `<li id=${siteArray.length}><label class="checkbox"><input type="checkbox" class='site'>${site}</label></li>`;
    siteArray.push(site);

    // Set the site array back to storage
    chrome.storage.local.set({ site: siteArray });
  });
}

function getSites() {
  //fetch all the sites from storage
  const siteArray = [];
  const sitePromise = chrome.storage.local.get("site");

  sitePromise.then((data) => {
    if (data.site) {
      siteArray.push(...data.site);
    }

    // Callback function to iterate over the site array
    const iterateSiteArray = () => {
      for (let i = 0; i < siteArray.length; i++) {
        siteList.innerHTML += `<li id=${i}><label class="checkbox"><input class='site' type="checkbox">${siteArray[i]}</label></li>`;
      }
    };

    // Call the callback function
    iterateSiteArray();
  });
}

function deleteSite(siteId) {
  document.getElementById(siteId).remove();
  // Get the site array from storage
  const sitePromise = chrome.storage.local.get("site");

  // Remove the site from the site array
  sitePromise.then((data) => {
    const siteArray = data.site;
    siteArray.splice(siteId, 1);
    reassignSiteId();
    // Set the site array back to storage
    chrome.storage.local.set({ site: siteArray });
  });
}

function reassignSiteId() {
  siteList.innerHTML = "";
  setTimeout(getSites, 5);
}

// check the URL
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const currURL = message.link;
  chrome.storage.local.get("site", (data) => {
    const siteArray = data.site;
    if (siteArray) {
      for (let i = 0; i < siteArray.length; i++) {
        console.log(siteArray[i], currURL);
        console.log(currURL.includes(siteArray[i]));
        if (currURL.includes(siteArray[i])) {
          sendResponse({ message: 0 });
          break;
        }
      }
    }
    sendResponse({ message: 1 });
  });
  return true;
});
