var pictures;
var index;
var indexx;

window.addEventListener('load', function () {
    loaddata();
    
})
function loaddata() {
    console.log('Data load');
    var request = new XMLHttpRequest();
    request.onreadystatechange = function (event) {
        //  console.log(event);
        if (event.currentTarget.status === 404 && event.currentTarget.readyState === 4) {
            console.log('error');
        }
        if (event.currentTarget.status === 200 && event.currentTarget.readyState === 4) {
            var data= JSON.parse(event.currentTarget.response);
            handleData(data);
            pictures = data;
            
            // console.log(data);

            // var stringData =JSON.stringify(data);
            // console.log(stringData);
            // console.log(event.currentTarget.response);
        }
    }
    request.open('GET', 'MOCK_DATA.json');
    request.responseType='text';
    request.send();
}

function handleData(data){
    var parentElem =document.getElementsByClassName('gallery-wrapper')[0];
    for(var i = 0; i < Array.from(data).length ; i++){
        // console.table(data[i]);
        
        var template =`
        <div class="gallery-item"data-item ='${JSON.stringify(data[i])}'>
            <div class="image">
                <img src="${data[i].image_url}" alt="">
            </div>
            <div class="desc">                
                <p>
                    <strong>Name:</strong>
                    ${data[i].image_name}
                </p>
                <p>
                    <strong>Description:</strong>
                    ${data[i].desc}
                </p>
            </div>            
        </div>`;

        parentElem.insertAdjacentHTML('beforeend',template);
        var lastChild =parentElem.lastChild.addEventListener('click',onImageClick);
    }

}

function onImageClick(){
    // console.log(this);
    document.getElementsByClassName('modal-body')[0].innerHTML = '';
    console.log(this.dataset.item);
    var temp =this.dataset.item;
    var data =JSON.parse(temp);
    index = data.id - 1;
    indexx =data.id + 1;
    
    var modalWrapper =document.getElementsByClassName('modal-wrapper')[0];
   toggleModal();
    showData(data);
}
function showData(data) {
    var parentElem =document.getElementsByClassName('modal-body')[0];
    var template =`
    <div class="gallery-item"data-item ='${JSON.stringify(data)}'>
        <div class="image">
            <img src="${data.image_url}" alt="">
        </div>
        <div class="desc">                
            <p>
                <strong>Name:</strong>
                ${data.image_name}
            </p>
            <p>
                <strong>Description:</strong>
                ${data.desc}
            </p>
        </div>            
    </div>`;
    parentElem.insertAdjacentHTML('beforeend',template);
}
function toggleModal(){
    document.getElementsByClassName('modal-backdrop')[0].classList.toggle('open');
    document.getElementsByClassName('modal-wrapper')[0].classList.toggle('open');
    
   
}

function onprevModal(){
    document.getElementsByClassName('modal-body')[0].innerHTML = '';
    // console.log('fets');
    
    if( index ==0){
        index = pictures.length-1;
        showData(pictures[index]);
        console.log('fets');
    }
    else if(index > 0){
        index --;
        showData(pictures[index]);
        console.log('Malefetsane');
    }
    
    
}

function nextModal(){
    document.getElementsByClassName('modal-body')[0].innerHTML ='';
    // indexx++;
    // showData(pictures[indexx]);
    index++;
    if(index >= pictures.length) {
        index = 0;
    }
    showData(pictures[index]);
    
}


