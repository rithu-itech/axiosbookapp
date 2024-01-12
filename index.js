function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    axios.get("https://crudcrud.com/api/6c4223f89e404ce9a9266c8b153f03a2/AppoinmentData")
        .then((response) => {
            const userData = response.data || [];
            userData.forEach((user, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `Name: ${user.name}, Email: ${user.email}, Phone: ${user.phone}`;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    deleteUser(index);
                });

                const edit = document.createElement('button');
                edit.textContent = 'Edit';
                edit.addEventListener('click', function () {
                    editUser(index);
                });

                listItem.appendChild(deleteButton);
                listItem.appendChild(edit);
                userList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

function deleteUser(index) {
    axios.delete(`https://crudcrud.com/api/6c4223f89e404ce9a9266c8b153f03a2/AppoinmentData/${index}`)
        .then(() => {
            displayUsers();
        })
        .catch((error) => {
            console.error(error);
        });
}

function editUser(index) {
    let userData = JSON.parse(localStorage.getItem("userDetails")) || [];
    const user = userData[index];
    document.getElementById('username').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phone').value = user.phone;
}

function handleFormSubmit(event) {
    event.preventDefault();

    const name = event.target.username.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;

    const userData = {
        name: name,
        email: email,
        phone: phone
    };

    axios.post("https://crudcrud.com/api/6c4223f89e404ce9a9266c8b153f03a2/AppoinmentData", userData)
        .then(() => {
            displayUsers(); // Display users after successful POST request
        })
        .catch((error) => {
            console.error(error);
        });

    event.target.username.value = '';
    event.target.email.value = '';
    event.target.phone.value = '';
}

document.addEventListener('DOMContentLoaded', function () {
    displayUsers();
});
