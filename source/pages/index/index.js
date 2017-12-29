import 'normalize.css';
import './index.scss';
console.log('index.js');

window.addEventListener('resize', function(){
    if (window.innerWidth > 521){
        let isRow = document.querySelector('.event-mobile');  
        if (isRow) isRow.remove();
    }
});

function getData(data){
    
    let eventDate = data.children[0].children[2]|| data.children[0].children[1];
    let month = document.querySelector('.date-month').innerHTML;
    let year = document.querySelector('.date-year').innerHTML;      
    let eventTitle = data.children[1].children[0].innerHTML;
    let eventMembers = data.children[1].children[1].innerHTML;
    let eventDescription = data.children[1].children[2].innerHTML;
    let date = `${eventDate.innerHTML} ${month}${year}`;
    if (window.innerWidth < 521 ){
        newRowEvents(eventTitle, eventMembers, eventDescription, date);
    } 
}

function newRowEvents(title, members, desc, date){
    let calendar = document.querySelector('.calendar');
    let isRow = document.querySelector('.event-mobile');  
    if (!isRow) console.log('not');
    else isRow.remove();
    let eventRow = document.createElement('div');
    eventRow.className = 'event-mobile';
    eventRow.innerHTML = `<p class="dates">${date}</p><p class="title">Что сделать:  ${title}</p><p class="member">С кем:  ${members}</p><p class="desc">Детали:  ${desc}</p>`;
    calendar.appendChild(eventRow);
}
window.onload = function(){ 
    let day = document.querySelectorAll('.day');
    day.forEach(function(item, i, day){
        day[i].onclick = function(){
            getData(this);
        };
    });
};