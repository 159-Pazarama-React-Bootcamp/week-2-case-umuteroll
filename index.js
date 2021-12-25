const btnAddNewTask = document.querySelector("#btnAddnewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
btnAddNewTask.addEventListener("click",addNewItem); // add an item 
//taskList.addEventListener("click",deleteItem); // delete only one item
//btnDeleteAll.addEventListener("click",deleteAllItems) // delete all items

//onInit();
var arrResults;

function onInit(){
 setUsername();
 changeTheme();
 loadItems();
 }

function setUsername(){
    var lsUsername  = localStorage.getItem("username");
}
function changeTheme(){
    var isDarkTheme = localStorage.getItem("theme");
    //localStorage.setItem('items',JSON.stringify(items));
}
  async function loadItems(){
   await getItemsFromAPI();
   console.log(arrResults);
  arrResults.forEach(function(item){
     createElement(item.content);
  })
}




function addNewItem(e){
const input = document.querySelector("#txtTaskName").value;
if(input.length < 3){
    return "Minimum 3 karakter girmelisiniz"
}
    createElement(input)
    e.preventDefault();
    //loadItems();
   //postItemToAPI(input);
   //postData('https://61c4a152f1af4a0017d996eb.mockapi.io/todos', { content: input });
   deleteData('https://61c4a152f1af4a0017d996eb.mockapi.io/todos/2');
  
  
}

function createElement(input) {
    const li = document.createElement("li");
    li.className= 'list-group-item list-group-item-secondary';
 
    li.appendChild(document.createTextNode(input));
 
    const a = document.createElement("a");
    a.className = "delete-item float-right";
    a.setAttribute("href","#");
    a.innerHTML = '<i class="fas fa-times"></i>';
    
    li.appendChild(a);
 
    taskList.appendChild(li);

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
    
  }
  async function deleteData(url = '') {
    const response = await fetch(url, {
      method: 'DELETE', 
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

