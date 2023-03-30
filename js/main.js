/*
HTML for table rows.
<tr>
    <td>TITLE HERE</td>
    <td>AUTHOR HERE</td>
    <td>DATE HERE</td>
    <td><a href="LINK HERE">view talk</a></td>
    <td>VIEWS HERE</td>
    <td>LIKES HERE</td>
</tr>

*/

let allTedTalks = []
let displayedTalks = []
const DATA_URL = '/data/ted_talks.json'
let tedTalkForm = document.querySelector('#ted-talk-filter')
let viewsSortBtn = document.querySelector('.views')
let likesSortBtn = document.querySelector('.likes')

//render data from JSON file
//get ted talk data
const getTalk = async() =>{
    const response = await fetch(DATA_URL,{method: "GET"})
    const data = await response.json()
    data.map((talk)=>{
        allTedTalks.push(talk)
        displayedTalks.push(talk)
    })
    renderTedTalks(allTedTalks)
}

getTalk()

//render elements 
const renderTedTalks = (talkData) =>{
    let talkDisplayElement = document.querySelector('#ted-talk-rows')
    talkDisplayElement.innerHTML = ''
    talkData.map((talk)=>{ 
        talkDisplayElement.innerHTML += `<tr>
        <td>${talk.title}</td>
        <td>${talk.author}</td>
        <td>${talk.date}</td>
        <td><a href="${talk.link}">view talk</a></td>
        <td>${talk.views}</td>
        <td>${talk.likes}</td>
    </tr>
    `
    })
}

//filter results from text search
//event listener
tedTalkForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    let titleSearch = document.querySelector('input[name=search-query]').value
    let viewSearch = document.querySelector('input[name=min-views]').value
    filterTalks(titleSearch, viewSearch)
})

const filterTalks = (search = '', minViews = 0) =>{
    displayedTalks = []
    allTedTalks.forEach(element =>{
        if(element.title.toLowerCase().includes(search.toLowerCase()) && element.views >= minViews ){
            displayedTalks.push(element) //add to array if the talk meets the filter requirements
        }
    })
    renderTedTalks(displayedTalks)//re-render results
}
