'use strict'
const quotes = document.querySelector('.quotes')
const quotesAuthor = document.querySelector('.quotesAuthor')
fetch('https://api.quotable.io/random').then(result => result.json()).then(quote => {
    quotes.innerHTML = quote.content
    quotesAuthor.append(quote.author)
})