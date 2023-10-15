console.log("background.js loaded")
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'site') {
        chrome.runtime.sendMessage({ type: "site", url: message.url });
    }
})