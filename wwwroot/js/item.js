const uri = "api/Item";
let items = [];

function getToken() {
    const user = {
        username: 'a',
        password: 'secret',
    };

    fetch('api/token', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((response) => {
            localStorage.setItem('api_jwt_token', String(response['token']));
        })
        .catch((error) => console.error("Unable to add item.", error));
}

function getItems() {
    fetch(uri, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('api_jwt_token'),
        }
    })
        .then((response) => response.json())
        .then((data) => _displayItems(data))
        .catch((error) => console.error("Unable to get items.", error));
}

function addItem() {
    const addContentTextbox = document.getElementById("add-content");
    const addTitleTextbox = document.getElementById("add-title");

    const item = {
        content: addContentTextbox.value.trim(),
        title: addTitleTextbox.value.trim(),
    };

    fetch(uri, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('api_jwt_token')
        },
        body: JSON.stringify(item),
    })
        .then(() => {
            getItems();
            addTitleTextbox.value = "";
            addContentTextbox.value = "";
        })
        .catch((error) => console.error("Unable to add item.", error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('api_jwt_token')
        }
    })
        .then(() => getItems())
        .catch((error) => console.error("Unable to delete item.", error));
}

function displayEditForm(id) {
    const item = items.find((item) => item.id === id);

    document.getElementById("edit-content").value = item.content;
    document.getElementById("edit-form").style.display = "block";
    document.getElementById("edit-id").value = item.id;
    document.getElementById("edit-title").value = item.title;
}

function updateItem() {
    const itemId = document.getElementById("edit-id").value;

    const item = {
        content: document.getElementById("edit-content").value.trim(),
        id: parseInt(itemId, 10),
        title: document.getElementById("edit-title").value.trim(),
    };

    fetch(`${uri}/${itemId}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('api_jwt_token'),
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item),
    })
        .then(() => {
            getItems();
            closeInput();
        })
        .catch((error) => console.error("Unable to update item.", error));

    return false;
}

function closeInput() {
    document.getElementById("edit-form").style.display = "none";
}

function _displayCount(itemCount) {
    const name = itemCount === 1 ? "item" : "items";

    document.getElementById("counter").innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById("items");
    tBody.innerHTML = "";

    _displayCount(data.length);

    const button = document.createElement("button");

    data.forEach((item) => {
        let editButton = button.cloneNode(false);
        editButton.innerText = "Edit";
        editButton.setAttribute("onclick", `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("onclick", `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        td1.appendChild(document.createTextNode(item.title));

        let td2 = tr.insertCell(1);
        td2.appendChild(document.createTextNode(item.content));

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    items = data;
}
