const baseUrl = "http://localhost:3001";

function isokay(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(isokay);
}

//delete
function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then(isokay);
}

//post
function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(isokay);
}

export { getItems, deleteItem, addItem };
