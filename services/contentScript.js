chrome.runtime.sendMessage({ link: window.location.href }, (response) => {
    console.log(response.message)
    if (response.message === 0) {
        //blocked
        alert('Blocked!')
        alert('Focus!')
        window.close()
        window.open()
    }
})