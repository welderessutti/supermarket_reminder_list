const formData = document.getElementById("form-data");
const listData = document.getElementById("list-data");

formData.addEventListener("submit", (event) => {
    event.preventDefault();

    const itemName = event.target.elements["item-mkt"];
    const itemNumber = event.target.elements["quantity"];

    const newItem = document.createElement("li");
    newItem.classList.add("item");

    const newQttItem = document.createElement("strong");
    newQttItem.innerHTML = itemNumber.value;
    
    newItem.appendChild(newQttItem);
    newItem.innerHTML += itemName.value;
    newItem.appendChild(deleteButton());

    listData.appendChild(newItem);

    itemName.value = "";
    itemNumber.value = "";
})

function deleteButton() {
    const elementButton = document.createElement("button");
    elementButton.innerHTML = "x";

    return elementButton;
}
