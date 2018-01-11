
// fisearch all days with events
function findEventDay(allday){
    const arrayEvent =[];
    allday.forEach(function(item, index, allday){
        if (allday[index].classList.contains('hasevents'))
            arrayEvent.push(allday[index]);
    });
    return arrayEvent;
}
//display search results
function showSearchResult(events, searchInput){
    const showResultSearch =  document.createElement('div');
    showResultSearch.classList.add('result-search');
    var parent = searchInput.parentNode.parentNode;
    let resultSearchBlock='';

    for(let i=0; i<events.length; i++){
        if (events[i].innerText.toLowerCase().includes(searchInput.value.toLowerCase())){

            const date = events[i].querySelector('.date');
            const title = events[i].querySelector('.title');
            const member = events[i].querySelector('.members');
            const desc = events[i].querySelector('.description');

            resultSearchBlock = resultSearchBlock + '<div class="find-info"><p class="title">' + title.innerHTML+'</p>'
                              + '<p class="member">' + member.innerHTML+'</p>'
                              + '<p class="desc">' + desc.innerHTML+'</p>'
                              + '<p class="date">' + date.innerHTML+'</p></div>';

        }                  
    }

    showResultSearch.innerHTML = resultSearchBlock;
    const hasResultBlock = parent.querySelector('.result-search');
    if(!hasResultBlock){
        if (resultSearchBlock.length>0){            
            parent.appendChild(showResultSearch);
        }
    } else {
        if (resultSearchBlock.length < 1){
            hasResultBlock.style.display = 'none';
        } else hasResultBlock.innerHTML = resultSearchBlock;         
       
    }
    if (searchInput.value.lenght < 3){
        hasResultBlock.style.display = 'none';
    }
}

export {findEventDay, showSearchResult};