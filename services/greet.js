'use strict'
const changeName = (userName) => {
    getName.classList.add('hide')
    document.getElementById('name').append(` ${userName}`)
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


//set date and time
const date = document.querySelector('.date')
const time = document.querySelector('.time')
//fetch for first ime
setTime()

setInterval(() => {
    setTime()//fetch every second
}, 1000)

function setTime() {
    const tempDate = new Date()
    time.innerHTML = tempDate.toLocaleTimeString()
    date.innerHTML = tempDate.toLocaleDateString()
}