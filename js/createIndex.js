
function addLink(...args){
    var nodeLink = document.createElement('a');
    nodeLink.href = '#' + args[1].trim();
    nodeLink.textContent = args[1].trim();
    args[0].appendChild(nodeLink)
    return args[0];
}

function createSection(){
    /* Se podria usar el querySelector que te devuelve el primero ya que por sentido solo DEBERIA haber UNO */
    var contentTitle = arguments[0].getElementsByClassName('content-item-title')[0].textContent;
    var nodeContentTitle = document.createElement('li');
    nodeContentTitle = addLink(nodeContentTitle, contentTitle);

    var nodesContentSubTitle = arguments[0].getElementsByClassName('content-item-subtitle');
    var nodeOrderedList = document.createElement('ol');

    for (const iterator of nodesContentSubTitle) {
        var listItem = document.createElement('li');
        listItem = addLink(listItem, iterator.textContent);
        nodeOrderedList.appendChild(listItem);
    }
    return [nodeContentTitle, nodeOrderedList];
}

function createIndex(contentItem, index){
    var nodeIndex = document.createElement('ol');
    for (const item of contentItem) {
        createSection(item).forEach( bundle => {
            nodeIndex.appendChild(bundle);
        });
    }
    index.appendChild(nodeIndex);
}

function addID(nodesContentItem){
    for (const item of nodesContentItem) {
        var nodesContentTitle = item.getElementsByClassName('content-item-title');
        Array.from(nodesContentTitle).forEach(title =>{
            title.id = title.textContent.trim();
        });

        var nodesContentSubTitle = item.getElementsByClassName('content-item-subtitle');
        Array.from(nodesContentSubTitle).forEach(subTitle =>{
            subTitle.id = subTitle.textContent.trim();
        });
    }
    /* No se puede getElements de una HTMLCollection tiene que ser de un solo elemento*/;
    /* ILEGAL => var nodeSubTitle = nodesContentItem.getElementsByClassName('content-subtitle');*/
}



function defer(){
    if(document.readyState == 'complete'){
        /* Los trigers tienen que estar cargados */
        var nodesContentItem = document.getElementsByClassName('content-item');
        var indexContent = document.getElementById('index-content');
        createIndex(nodesContentItem, indexContent);
        addID(nodesContentItem);

        function change(){
            index = document.getElementById('index');
            indexTrigger = document.getElementById('index-trigger');
            title = document.getElementById('title');

            indexContent.style.padding = '5px 30px 5px 5px';
            indexTrigger.style.width = 30 + 'px';
            indexTrigger.style.backgroundColor = '#66512a';
            var regresoAlFuturo = indexContent.offsetHeight;

            index.addEventListener('mouseover', ()=>{index.style.left = 0;});
            index.addEventListener('mouseout', ()=>{index.style.left = (-index.offsetWidth + indexTrigger.offsetWidth) + 'px';});
            
            index.style.backgroundColor = '#1a1a1a';
            index.style.position = 'fixed';
            index.style.top = title.offsetHeight + 'px';
            index.style.left = (-index.offsetWidth) + 'px';
            index.style.height = '80vh';
            index.style.display = 'flex';
            index.style.overflow = 'auto';
            indexTrigger.style.height = regresoAlFuturo + 'px';

            index.style.borderTopRightRadius = '10px';
            index.style.borderBottomRightRadius = '10px';
        }
        
        document.addEventListener('scroll', function hola(e) {
            if(window.scrollY > 600){
                change();
                e.target.removeEventListener('scroll',hola);
            }
        });
    }
}

document.addEventListener('readystatechange',defer);