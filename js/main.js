const formData = document.getElementById("form-data");
const listData = document.getElementById("list-data");
const listBkp = JSON.parse(localStorage.getItem("listBkp")) || [];

listBkp.forEach( (element) => {
    createsElement(element);
});

formData.addEventListener("submit", (event) => {
    event.preventDefault();

    const itemName = event.target.elements["name"];
    const itemNumber = event.target.elements["quantity"];

    const exist = listBkp.find(element => element.name === itemName.value);

    const currentItem = {
        "name": itemName.value,
        "quantity": itemNumber.value
    }

    if (exist) {
        currentItem.id = exist.id;

        updatesElement(currentItem);

        listBkp[listBkp.findIndex(element => element.id === exist.id)] = currentItem;
    } else {
        currentItem.id = listBkp[listBkp.length - 1] ? (listBkp[listBkp.length - 1]).id + 1 : 0;

        createsElement(currentItem);

        listBkp.push(currentItem);
    }

    localStorage.setItem("listBkp", JSON.stringify(listBkp));

    itemName.value = "";
    itemNumber.value = "";
});

function createsElement(item) {
    const newItem = document.createElement("li");
    newItem.classList.add("item");

    const newQuantityItem = document.createElement("strong");
    newQuantityItem.innerHTML = item.quantity;
    newQuantityItem.dataset.id = item.id;
    
    newItem.appendChild(newQuantityItem);
    newItem.innerHTML += item.name;
    newItem.appendChild(createsDeleteButton(item.id));

    listData.appendChild(newItem);
}

function updatesElement(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantity;
}

function createsDeleteButton(id) {
    const elementButton = document.createElement("button");
    elementButton.innerHTML = "x";

    elementButton.addEventListener("click", function() {
        deletesElement(this.parentNode, id);
    });

    return elementButton;
}

function deletesElement(tag, id) {
    tag.remove();

    listBkp.splice(listBkp.findIndex(element => element.id === id), 1);

    localStorage.setItem("listBkp", JSON.stringify(listBkp));
}
