//GET ALL USERS
async function getAll() {
    fetch('http://localhost:8080/rest/users')
        .then(response => {
            response.json().then(data => {

                let output = " ";

                data.forEach(user => {

                    let userRoles = " ";
                    for (let i = 0; i < user.roles.length; i++) {
                        userRoles += `${user.roles[i].role.replace("ROLE_", "")} `
                    }

                    output += `
                <tr class="font-weight-normal">
                <td id="id${user.id}">${user.id}</td>
                <td id="firstName${user.id}">${user.firstName}</td>
                <td id="lastName${user.id}">${user.lastName}</td>
                <td id="age${user.id}">${user.age}</td>
                <td id="email${user.id}">${user.username}</td>
                <td id="roles${user.id}" >${userRoles}</td>
                <td>
                <button class="btn btn-info" role="button" data-toggle="modal" data-target="#edit"
                onclick="openModalWindow(${user.id})">Edit</button>
                </td>
                <td>
                <button class="btn btn-danger" role="button" data-toggle="modal" data-target="#delete"
                onclick="openModalWindowDel(${user.id})">Delete</button>
                </td>
              </tr>`;
                })
                document.getElementById("table").innerHTML = output;
            })
        })
}
getAll();
//CREATE USER
document.getElementById("addUser").addEventListener("submit", add);

function add(e) {
    e.preventDefault();

    let firstName = document.getElementById("addFirstName").value;
    let lastName = document.getElementById("addLastName").value;
    let age = document.getElementById("addAge").value;
    let email = document.getElementById("addEmail").value;
    let password = document.getElementById("addPassword").value;
    let roles = [];
    roles = setRoles(Array.from(document.getElementById("addRoles").selectedOptions)
        .map(option => option.value));

    fetch("http://localhost:8080/rest/users", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        })
    })
        .finally(() => {
            document.getElementById("start").click();
            getAll();
            document.getElementById("addUser").reset();
        })
}

function setRoles(someRoles) {
    let roles = [];
    if (someRoles.indexOf("ROLE_ADMIN") >= 0) {
        roles.push({"id": 1, "name": "ROLE_USER"});
    }
    if (someRoles.indexOf("ROLE_USER") >= 0) {
        roles.push({"id": 2, "name": "ROLE_ADMIN"});
    }
    return roles;
}
//EDIT USER
document.getElementById("editModal").addEventListener("submit", edit);

function edit(e) {
    e.preventDefault();

    let id = document.getElementById("editId").value;
    let firstName = document.getElementById("editFirstName").value;
    let lastName = document.getElementById("editLastName").value;
    let age = document.getElementById("editAge").value;
    let email = document.getElementById("editEmail").value;
    let password = document.getElementById("editPassword").value;
    let roles = [];
    roles = setRoles(Array.from(document.getElementById("editRole").selectedOptions)
        .map(option => option.value));

    fetch("http://localhost:8080/rest/users/" + id, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        })
    })
        .finally(() => {
            document.getElementById("edit").click();
            getAll();
            document.getElementById("editModal").reset();
        })
}

function openModalWindow(id) {
    document.getElementById("editId").value = id;
    document.getElementById("editFirstName").value = $("#firstName" + id).text();
    document.getElementById("editLastName").value = $("#lastName" + id).text();
    document.getElementById("editAge").value = $("#age" + id).text();
    document.getElementById("editEmail").value = $("#email" + id).text();
    document.getElementById("editPassword").value = $("#password" + id).val();
}
//DELETE USER
document.getElementById("deleteModal").addEventListener("submit", deleteUser)

function deleteUser(e) {
    e.preventDefault();

    let id = document.getElementById("deleteId").value;

    fetch("http://localhost:8080/rest/users/" + id, {
        method: "DELETE"
    })
        .finally(() => {
            document.getElementById("delete").click();
            getAll();
            document.getElementById("deleteModal").reset();
        })

}


function openModalWindowDel(id) {
    document.getElementById("deleteId").value = id;
    document.getElementById("deleteFirstName").value = $("#firstName" + id).text();
    document.getElementById("deleteLastName").value = $("#lastName" + id).text();
    document.getElementById("deleteAge").value = $("#age" + id).text();
    document.getElementById("deleteEmail").value = $("#email" + id).text();
}