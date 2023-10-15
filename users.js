let status = window.localStorage.getItem("loginStatus");
function logOut() {
  window.localStorage.setItem("loginStatus", "false")
  window.location.href = "index.html";
}

function displayUserList(users) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = ""; // Clear the table

  for (let i = 0; i < users.length; i++) {
    tbody.innerHTML += `
          <tr class="tr">
              <td class="td">${users[i].id}</td>
              <td class="td"><img src="${users[i].profilePic}" alt="User Avatar"></td>
              <td class="td">${users[i].fullName}</td>
              <td class="td">${users[i].dob}</td>
              <td class="td">${users[i].gender}</td>
              <td class="td">${users[i].currentCity}, ${users[i].currentCountry}</td>
          </tr>
      `;
  }
}

// Get user data from the API
$.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users", function (users) {
  console.log(users);
  displayUserList(users);

  const searchBox = document.getElementById("input");
  searchBox.addEventListener("input", function () {
    const searchTerm = searchBox.value.trim().toLowerCase();

    if (searchTerm.length === 1) {
      // Show an alert if only one word is entered
      alert("Please enter two words for searching.");
    } else {
      // Filter the users based on the search term
      const filteredUsers = users.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(searchTerm) ||
          user.currentCity.toLowerCase().includes(searchTerm)
        );
      });

      // Display the filtered user list
      displayUserList(filteredUsers);
    }
  });
});


