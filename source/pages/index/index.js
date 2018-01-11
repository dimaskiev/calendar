import 'normalize.css';
import './index.scss';
import * as dataSet from '../../common/js/datalib.js';
import * as dataSearch from '../../common/js/search.js';

window.addEventListener('resize', function(){
    if (window.innerWidth > 521){
        let isRow = document.querySelector('.event-mobile');  
        if (isRow) isRow.remove();
    }
});

window.onload = function(){   
    const day = document.querySelectorAll('.day'); //all day
    let thisBlock; //this click block
    const modal = document.querySelector('.modal-events'); //modal window
    const close = modal.querySelector('.close'); //button clode modal
    const saveBtn = document.querySelector('.saveBtn'); // button save data
    const deleteBtn = document.querySelector('.deleteBtn'); // button delete data
    const searchInput = document.querySelector('.search'); //input for search


    searchInput.addEventListener('input', function(){ // enter data in search
        const hasResultBlock = document.querySelector('.result-search');
        if (searchInput.value.length>1){
            if(hasResultBlock) hasResultBlock.style.display = 'block';
            const hasEvents = dataSearch.findEventDay(day);
            dataSearch.showSearchResult(hasEvents, searchInput);
        } else {
            if(hasResultBlock) {
                if(hasResultBlock) hasResultBlock.style.display = 'none';
                hasResultBlock.innerHTML = '';
            }
        }              
    });

    searchInput.addEventListener('blur', function(){ // loss of focus on the input search
        searchInput.value = '';
        const hasResultBlock = document.querySelector('.result-search');
        if (searchInput.value.length<1){
            if(hasResultBlock) hasResultBlock.style.display = 'none';
        }
    });

    day.forEach(function(item, i, day){
        day[i].addEventListener('click', function(){
        // day[i].onclick = function(){
            //`dataSet.getData(this);            
            const dataCurrentBlock = dataSet.getDataFromBlock(this);
            thisBlock = this;
            dataSet.showModalWindow(dataCurrentBlock, thisBlock);          // show modalWindow 
        });
    });
    
    day.forEach(function(item, i, day){
        day[i].addEventListener('mouseenter', function(){
        // day[i].onclick = function(){
            dataSet.getData(this);            
            //const dataCurrentBlock = dataSet.getDataFromBlock(this);
           // thisBlock = this;
           // dataSet.showModalWindow(dataCurrentBlock, thisBlock);          // show modalWindow 
        });
    });

    saveBtn.addEventListener('click', function(){ 
        const modalData = dataSet.getDataFromModal();
        dataSet.saveDataToBlock(thisBlock, modalData); // save Data
        dataSet.refreshDataAndSetColorDay(thisBlock); // refresh data & set color day
        modal.classList.remove('open-modal'); // close window
        
    },false);

    deleteBtn.addEventListener('click', function(){ 
        dataSet.deleteDataBlock(thisBlock); // delete  Data
        dataSet.refreshDataAndSetColorDay(thisBlock); // refresh data & set color day

    },false);

    close.addEventListener('click', function(){    // close Modal Window
        modal.classList.remove('open-modal');        
    });   
};
