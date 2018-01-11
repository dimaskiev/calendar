import 'normalize.css';
import './index.scss';
import * as dataSet from '../../common/js/datalib.js';

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
    
    day.forEach(function(item, i, day){
        day[i].onclick = function(){
            dataSet.getData(this);            
            const dataCurrentBlock = dataSet.getDataFromBlock(this);
            thisBlock = this;
            dataSet.showModalWindow(dataCurrentBlock, thisBlock);          // show modalWindow 
        };
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
