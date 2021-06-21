function getUser() {
    fetch("http://localhost:8080/user/userGet").then((res) => res.json())
        .then((user) => {
            let userRoles = " ";
            for (let i = 0; i < user.roles.length; i++) {
                userRoles += `${user.roles[i].role.replace("ROLE_", "")} `
            }

            let output = "<tr>";
            output += `
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.username}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${userRoles}</td>
            `;
            output += "<tr>";

            document.getElementById("getUser").innerHTML = output;
        })
}

getUser();