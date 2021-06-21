document.getElementById("editModal").addEventListener("submit", edit);

function edit(e) {
    e.preventDefault();

    let rolesU = [];
    let idU = document.getElementById("editId").value;
    let firstNameU = document.getElementById("editFirstName").value;
    let lastNameU = document.getElementById("editLastName").value;
    let usernameU = document.getElementById("editUsername").value;
    let ageU = document.getElementById("editAge").value;
    let emailU = document.getElementById("editEmail").value;
    let passwordU = document.getElementById("editPassword").value;
    rolesU = setRoles(Array.from(document.getElementById("editRole").selectedOptions)
        .map(option => option.value));

    console.log(rolesU)

    fetch("http://localhost:8080/admin/usersEdit", {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            id: idU,
            firstName: firstNameU,
            lastName: lastNameU,
            username: usernameU,
            age: ageU,
            email: emailU,
            password: passwordU,
            roles: rolesU

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
    document.getElementById("editUsername").value = $("#username" + id).text();
    document.getElementById("editAge").value = $("#age" + id).text();
    document.getElementById("editEmail").value = $("#email" + id).text();
    document.getElementById("editPassword").value = $("#password" + id).val();
}