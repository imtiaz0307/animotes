'use strict';

const searchBar = document.querySelector('.sb-i')
const searchOptions = document.querySelector('#a-o')
const searchButton = document.querySelector('.search-icon')
const cardContainer = document.querySelector('.s-r')


const renderMarkup = function (data) {
    return `
        <div class="a-n">${data.anime}</div>
        <div class="c-n">${data.character}</div>
        <div class="q">${data.quote}</div>`
}


const randomQuotes = async function (name, val) {
    try {
        const response = await fetch(`https://animechan.vercel.app/api/${val}?${val.includes('anime') ? 'title' : 'name'}=${name}`)
        const data = await response.json()
        cardContainer.innerHTML = ''
        
        data.forEach(el => {
            const item = document.createElement('div')
            item.classList.add('q-c')
            item.innerHTML = renderMarkup(el)
            document.querySelector('.s-r').appendChild(item)
        })
    }
    catch (err) {
        cardContainer.innerHTML = `
        <h1 style="color: white;">No Results</h1>
        `
    }
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    if (!searchBar.value) return
    cardContainer.innerHTML = `
    <div class="loader">
        <div class="cir" style="--i:1"></div>
        <div class="cir" style="--i:2"></div>
        <div class="cir" style="--i:3"></div>
        <div class="cir" style="--i:4"></div>
        <div class="cir" style="--i:5"></div>
    </div>
    `
    randomQuotes(searchBar.value, searchOptions.value)
})
