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
const DATA_URL = '/data/ted_talks.json'

const getTalk = async() =>{
    const response = await fetch(DATA_URL,{method: "GET"})
    const data = await response.json()
    renderTedTalks(data)
    data.map((talk)=>{
        allTedTalks.push(talk.title)
    })
}

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



getTalk()