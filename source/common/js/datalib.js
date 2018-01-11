// get data from this.block 

function getDataFromBlock(block){
    const event = block.querySelector('.event .title').innerHTML,
        date = block.querySelector('.day-detail .date').innerHTML,
        members = block.querySelector('.event .members').innerHTML,
        detail = block.querySelector('.event .description').innerHTML;
    return {event, date, members, detail};
}


// show modal window

function showModalWindow(data, block){
    const modals = document.querySelector('.modal-events');
    modals.classList.add('open-modal');
    //get offset & size block
    const top = block.offsetTop;
    const left = block.offsetLeft;
    const width =block.offsetWidth;
    // get size modal window
    const widthModal = modals.offsetWidth;
    const heightModal = modals.offsetHeight;
    // get width wrapper
    const widthWrapprer = document.querySelector('.wrapper-section').offsetWidth;
    
    // set position modal windows

    modals.style.top = top+'px';
    modals.style.left = (left + width + 10)+'px';

    if ((width + left + widthModal) > widthWrapprer )
        modals.style.left = (left - widthModal - 10) + 'px';
    if (left < widthModal)
        modals.style.left = left + width  + 10 + 'px';
    if ((top + heightModal) > window.innerHeight) {
        
        modals.style.bottom =  10 + 'px';
        modals.style.top =  'unset';
    }

    if (window.innerWidth < 600){
        modals.style.left = '50'+ '%';
        modals.style.top = '50'+ '%';
        modals.style.transform = 'translate(-50%, -50%)';
    }

    const dataForModal={};
    dataForModal.modalEvent = data.event;
    dataForModal.modalDate = data.date;
    dataForModal.modalMembers = data.members;
    dataForModal.modalDetail = data.detail; 
    setDataModal(dataForModal);

}

// set data in modal window

function setDataModal(data){
    const modals = document.querySelector('.modal-events');
    modals.querySelector('.event').value = data.modalEvent;
    modals.querySelector('.date').value = data.modalDate;
    modals.querySelector('.members').value = data.modalMembers;
    modals.querySelector('.detail-event').value  = data.modalDetail;
}


// get data from modal window

function getDataFromModal(){
    const modalData = document.querySelector('.modal-events'),
        modalEvent = modalData.querySelector('.event').value,
        modalDate = modalData.querySelector('.date').value,
        modalMembers = modalData.querySelector('.members').value,
        modalDetail = modalData.querySelector('.detail-event').value;
    return {modalEvent, modalDate, modalMembers, modalDetail};
}

// get data in day

function saveDataToBlock(block, modalData){
    if (modalData.modalEvent.trim(' ').length > 0){
        block.querySelector('.title').innerHTML = modalData.modalEvent;}
    else {block.querySelector('.title').innerHTML = '';}
    if (modalData.modalMembers.trim(' ').length > 0){
        block.querySelector('.members').innerHTML = modalData.modalMembers;}
    else {block.querySelector('.members').innerHTML = '';}
    if (modalData.modalDetail.trim(' ').length > 0)
        {block.querySelector('.description').innerHTML = modalData.modalDetail;}
    else {block.querySelector('.description').innerHTML = '';}
}

// delete data in block

function deleteDataBlock(block){
    const dataModal = getDataFromModal();
    //console.log(dataModal);
    dataModal.modalEvent = '';
    dataModal.modalMembers = '';
    dataModal.modalDetail = '';
    saveDataToBlock(block, dataModal);
    setDataModal(dataModal);
}


// get data for adaptive block
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

// set row from data in adaptive

function newRowEvents(title, members, desc, date){
    let calendar = document.querySelector('.calendar');
    let isRow = document.querySelector('.event-mobile');  
    if (isRow) isRow.remove();
    let eventRow = document.createElement('div');
    eventRow.className = 'event-mobile';
    eventRow.innerHTML = `<p class="dates">${date}</p><p class="title">Что сделать:  ${title}</p><p class="member">С кем:  ${members}</p><p class="desc">Детали:  ${desc}</p>`;
    calendar.appendChild(eventRow);
}

// set color for event day

function setColorEventDay(data){
    const event = data.querySelector('.title').innerHTML,
        members = data.querySelector('.members').innerHTML,
        description = data.querySelector('.description').innerHTML;
    if ((event.length > 0)||(members.length > 0)||(description.length>0))
        data.classList.add('hasevents');
    else data.classList.remove('hasevents');
}

// refresh data and color ()
function refreshDataAndSetColorDay(data){
    getData(data); 
    setColorEventDay(data);
}


export {getDataFromModal, getDataFromBlock, saveDataToBlock,showModalWindow, deleteDataBlock, getData, setColorEventDay, refreshDataAndSetColorDay};