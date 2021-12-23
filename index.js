const btnAddNewTask = document.querySelector("#btnAddnewTask");
const input = document.querySelector("#txtTaskName").value;
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");

btnAddNewTask.addEventListener("click",addNewItem); // add an item 
//taskList.addEventListener("click",deleteItem); // delete only one item
//btnDeleteAll.addEventListener("click",deleteAllItems) // delete all items

//onInit();


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
}
function loadItems(){
  var arItems = getItemsFromAPI()
  arItems.forEach(function(item){
      addNewItem(item);
  })
}




function addNewItem(){
if(input.length < 3){
    return "Minimum 3 karakter girmelisiniz"
}
    createElement(input)
   //postItemToAPI(input);
 

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

