document.getElementById("deleteModal").addEventListener("submit", deleteUser)

function deleteUser(e) {
    e.preventDefault();

    let id = document.getElementById("delId").value;

    fetch("http://localhost:8080/admin/usersDelete/" + id, {
        method: "DELETE"
    })
        .finally(() => {
            document.getElementById("delete").click();
            getAll();
            document.getElementById("deleteModal").reset();
        })

}


function openModalWindowDel(id) {
    document.getElementById("delId").value = id;
    document.getElementById("delFirstName").value = $("#firstName" + id).text();
    document.getElementById("delLastName").value = $("#lastName" + id).text();
    document.getElementById("delUsername").value = $("#username" + id).text();
    document.getElementById("delAge").value = $("#age" + id).text();
    document.getElementById("delEmail").value = $("#email" + id).text();
}