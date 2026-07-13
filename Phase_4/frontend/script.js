const API = "http://localhost:3000/users";

async function loadUsers() {
    try {
        const response = await fetch(API);
        const users = await response.json();

        const list = document.getElementById("users");
        list.innerHTML = "";

        users.forEach(user => {
            list.innerHTML += `<li>${user.name} - ${user.email}</li>`;
        });

    } catch (error) {
        console.log(error);
    }
}

async function addUser(name, email) {
    try {
        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        loadUsers();
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(id, name, email) {
    try {
        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email
            })
        });

        loadUsers();
    } catch (error) {
        console.log(error);
    }
}

async function deleteUser(id) {
    try {
        await fetch(`${API}/${id}`, {
            method: "DELETE"
        });

        loadUsers();
    } catch (error) {
        console.log(error);
    }
}

loadUsers();