import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-a236e-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const buton=document.getElementById("add-button")
const input=document.getElementById("input-field")
const shoppingListEl = document.getElementById("shopping-list")

buton.addEventListener("click",add)

function add(){
    if(input.value!="")
    push(shoppingListInDB,input.value)
    ClearInput()
}

onValue(shoppingListInDB, function(snapshot){
    
    if (snapshot.exists()) {
    
    let itemsArray = Object.entries(snapshot.val())
    
    
    
    clearShoppingListEl()
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem =  itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem)
    }
}
else{
    shoppingListEl.innerHTML = "Nu e nimic in cos..."
}

})

function clearShoppingListEl(){
shoppingListEl.innerHTML = ""
}

function ClearInput(){
    input.value=""
}
function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID= item[0]
    let itemValue= item[1]

    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {
        let exactLocationOfStoryInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfStoryInDB)
    })
    shoppingListEl.append(newEl)
}
