async function getAll() {
    fetch('http://localhost:8080/admin/users')
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
                <td id="username${user.id}">${user.username}</td>
                <td id="age${user.id}">${user.age}</td>
                <td id="email${user.id}">${user.email}</td>
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