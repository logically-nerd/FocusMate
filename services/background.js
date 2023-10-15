

//0 if it is blocked 
//1 if website is not blocked, 
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const currURL = message.link
    console.log(currURL)
    chrome.storage.local.get('site', (data) => {
        const linkArray = data.link
        console.log(linkArray)
        if (linkArray) {
            for (let link of linkArray) {
                if (currURL.includes(link)) {
                    sendResponse({ message: 0 })
                }
                else {
                    sendResponse({ message: 1 })
                }
            }
        }
    })
    sendResponse({ message: 1 })
})
