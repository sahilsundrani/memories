// import formData from 'form-data';
var form = document.getElementById('create-memory');
var formData = new FormData(form);
async function deleteMemory (memoryId) {
    await axios.get(`http://localhost:2021/memory/delete/${memoryId}`)
    .then(
        $(`#memory-${memoryId}`).remove()
    ).catch((e) => {
        console.error(e.message);
    })
}
//making post call with API using EJS form
async function createMemory(){
    const submit = document.getElementById('submit')
    const form = document.querySelector("form");
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        axios.post("http://localhost:2021/memory/create", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((res) => {
            addMemoryToDom(res.data.memories);
        })
        .catch((err) => {
            console.log(err);
        });
    });
}
function addMemoryToDom (memory) {
    return $('#memory-list').append(`
    <li id="memory-${memory._id}" style="list-style: none;">
                    <div class="box">
                        <img src="data:image/image/png;charset=utf-8;base64,${memory.encImage.toString('base64')}">
                        <br>
                            <a href="/memory/download/${memory._id}">
                            <button id="${memory._id}" class="button" type="button">
                                <span class="button_text">Download Memory</span>  
                                <span class="button_icon">
                                    <ion-icon name="cloud-download-outline"></ion-icon> 
                                </span>
                                </button>
                            </a>
                        <br>
                        <button id="${memory._id}" class="button" onClick="deleteMemory(this.id)">
                            <span class="button_del">Delete Memory</span>  
                            <span class="button_icon_del">
                                <ion-icon name="trash-outline"></ion-icon>
                            </span>
                        </button>
                    </div>
                </li>
    
    `)
}
/* <img src="data:image/image/png;charset=utf-8;base64,${res.data.memories[i].encImage.toString('base64')}"></img> */
async function refreshMemory() {
    let collectionId = document.getElementById('collectionId').value;
    await axios.get(`http://localhost:2021/memory/refreshMemory/${collectionId}`)
    .then((res) => {
        for(let i = 0; i < res.data.memories.length; i++){
            let x = `data:image/png;base64,${res.data.memories[i].encImage.toString('base64')}`
            
            console.log(x);
            $('#memory-list').append(`
                <li id="memory-${res.data.memories[i]._id}" style="list-style: none;">
                    <div class="box">
                        <img src="${res.data.memories[i].imgSrc}">
                        <br>
                            <a href="/memory/download/${res.data.memories[i]._id}">
                            <button id="${res.data.memories[i]._id}" class="button" type="button">
                                <span class="button_text">Download Memory</span>  
                                <span class="button_icon">
                                    <ion-icon name="cloud-download-outline"></ion-icon> 
                                </span>
                                </button>
                            </a>
                        <br>
                        <button id="${res.data.memories[i]._id}" class="button" onClick="deleteMemory(this.id)">
                            <span class="button_del">Delete Memory</span>  
                            <span class="button_icon_del">
                                <ion-icon name="trash-outline"></ion-icon>
                            </span>
                        </button>
                    </div>
                </li>
            `)
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

refreshMemory();