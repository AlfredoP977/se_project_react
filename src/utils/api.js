const baseUrl = "http://localhost:3001";
function getItems() {
  return fetch(`${baseUrl}/items`).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
  });
}

//delete
function deleteItem(itemId) {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

//post
function addItem(itemData) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    body: JSON.stringify(itemData),
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
  );
}

export { getItems, deleteItem, addItem };
