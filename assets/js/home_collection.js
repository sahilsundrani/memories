const createCollectionBtn = document.getElementById("create-collection-btn");


async function refreshCollections() {
    let collections = await axios.get('http://localhost:2021/collection/getCollection');
    collections = collections.data.collections;
    for (let i = 0; i < collections.length; i++) {
        $('#unordered-list').prepend(`
        <li id="collection-${ collections[i]._id }">
        <a href = "/collection/open/${collections[i]._id}">
            Open ${collections[i].collectionName} 
        </a>
        <br>

        <button id="${collections[i]._id}" class="delete" onClick="deleteCollection(this.id)">
            Delete Collection
        </button>
        </li>`)
    }
}

function addCollectionToDom(collection){
    $('#unordered-list').prepend(`
    <li id="collection-${collection._id }">
    <a href = "/collection/open/${collection._id}">
        Open ${collection.collectionName} 
    </a>
    <br>
    <button id="${collection._id}" class="delete" onClick="deleteCollection(this.id)">
        Delete Collection
    </button>
    </li>`)
    return;  
}
async function deleteCollection(collectionId){
    await axios.get(`http://localhost:2021/collection/delete/${collectionId}`)
    .then(
        $(`#collection-${collectionId}`).remove()
    );
}

async function createCollection() {
    let collectionName = document.getElementById("collection-name").value;
    let collectionDescription = document.getElementById("collection-description").value;
    let userId = document.getElementById("user-id").innerHTML;  
    let collection = await axios.post('http://localhost:2021/collection/create', {
        collectionName,
        note: collectionDescription,
        id: userId
    })
    .then();
    return addCollectionToDom(collection.data.collection);
}
createCollectionBtn.addEventListener('click', createCollection);
refreshCollections();