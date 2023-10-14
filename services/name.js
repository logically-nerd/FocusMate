'use strict'
const changeName = (userName) => {
    getName.classList.add('hide')
    greet.append(` ${userName}`)
}
chrome.storage.local.get(['name'], (data) => {
    data.name && changeName(data.name)
})
const getName = document.querySelector('#getName')
const greet = document.querySelector('.greet')
getName.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const userName = getName.value;
        changeName(userName)
        chrome.storage.local.set({ name: userName })
    }
});
//add functionality to change name