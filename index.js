const btnAddNewTask = document.querySelector("#btnAddnewTask");
const btnDeleteAll  = document.querySelector("#btnDeleteAll");
const taskList      = document.querySelector("#task-list");


btnAddNewTask.addEventListener("click",addNewItem); // add an item 
taskList.addEventListener("click",manipulateItem); // delete only one item
btnDeleteAll.addEventListener("click",deleteAllFromAPI) // delete all items

onInit();
var arrResults;

function onInit(){
 setUsername();
 changeTheme();
 loadItems();
 }

function setUsername(){
    var username  = localStorage.getItem("username");
    if(!username){
         username = prompt("İsminizi giriniz lütfen")
         localStorage.setItem('username',JSON.stringify(username));
    }
        const header = document.getElementById("header");
        header.innerText = username + "'s TODO APP"
    
}
function changeTheme(){
    var element = document.body
    element.classList.toggle("darkmode")
    //localStorage.setItem('items',JSON.stringify(items));
}
  async function loadItems(){
    deleteFromTaskList();
   await getItemsFromAPI();
   console.log(arrResults);
  arrResults.forEach(function(item){
     createElement(item.content, item.id);
  })
}

function manipulateItem(e){
    var target  = e.target.parentElement;
    var idValue =  target.value;
    if(e.target.className=='fas fa-times'){
        if(confirm('Silinecek emin misiniz?')){
            target.parentElement.remove();
            deleteData("https://61c4a152f1af4a0017d996eb.mockapi.io/todos/"+idValue);
            loadItems()
            
     }
    e.preventDefault();
}else if(e.target.className=='fas fa-pen'){
     target   = e.target.parentElement;
     siblings = target.previousElementSibling.previousSibling;
    const inputElement = document.createElement("input");
    var firstValue     = siblings.nodeValue;
    inputElement.setAttribute("value",firstValue);
    inputElement.setAttribute("id","updateInput");
    
    siblings.parentElement.appendChild(inputElement)
    siblings.parentElement.firstChild.remove();
    

   
}


}
function updateInput(id){
    const updateInput   = document.getElementById("updateInput")
    const newValue      = updateInput.value;
 if(confirm('Değiştireceksiniz emin misiniz?')){ 
updateData("https://61c4a152f1af4a0017d996eb.mockapi.io/todos/"+id,newValue);
 }
}

function addNewItem(e){
const input = document.querySelector("#txtTaskName").value;
if(input.length < 3){
    return "Minimum 3 karakter girmelisiniz"
}
    e.preventDefault();
    postData("https://61c4a152f1af4a0017d996eb.mockapi.io/todos",{content: input});
}

function createElement(input,input2) {
    const li = document.createElement("li");
    li.className= 'list-group-item list-group-item-secondary';
 
    li.appendChild(document.createTextNode(input));
    
 
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-item float-right";
    deleteButton.setAttribute("value",input2);
    deleteButton.innerHTML = '<i class="fas fa-times"></i>';

    const updateButton = document.createElement("button");
    updateButton.className = "update-item float-right mr-2" ;
    updateButton.setAttribute("value",input2);
    updateButton.innerHTML = '<i class="fas fa-pen"></i>';

  
    li.appendChild(deleteButton);
    li.appendChild(updateButton);
    taskList.appendChild(li);
}
function deleteFromTaskList(){
    taskList.innerHTML = "";
}
/*
function postItemToAPI(input){
    fetch('https://61c4a152f1af4a0017d996eb.mockapi.io/todos', {
        method: 'POST',
       body: {
           "content": input}
      }).then(response => {
        if(response.ok){
            return response.json();  
        }
          throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      }).then(jsonResponse => {
        console.log(jsonResponse);
      })

} */

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // neden burası olmadan çalışmıyor?
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    loadItems()
  }
  async function deleteData(url = '') {
    const response = await fetch(url, {
      method: 'DELETE', 
    });
    
  }
   function deleteAllFromAPI() {
      var url ="https://61c4a152f1af4a0017d996eb.mockapi.io/todos/"
      var id = ""
      arrResults.forEach(function(item){
          id = item.id
        const response = fetch(url+id, {
            method: 'DELETE', 
          });
     })
    
    
  }
  async function updateData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
        // neden burası olmadan çalışmıyor?
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    
  }
  

 async function getItemsFromAPI(){
    await fetch('https://61c4a152f1af4a0017d996eb.mockapi.io/todos')
.then(
  response  => {
    
     return response.json();
  },
 rejection => {
    console.error(rejection.message);
 }
).then(
    response => {
          arrResults  = response;
    }
)
}

