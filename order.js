let status = window.localStorage.getItem("loginStatus");
function logOut() {
  window.localStorage.setItem("loginStatus", "false");
  window.location.href = "index.html";
}
const Users = () => {
  axios
    .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
    .then(function (response) {
      var mydatas = response.data;
      let checkboxArray = [];
      let finalData = [];
      let filtredData = [];
      document.getElementById("mytabledata").innerHTML = "";
      var check_box = document.getElementsByName("orders");
      var total = 0;
      for (var i = 0; i < check_box.length; i++) {
        if (check_box[i].checked) {
          checkboxArray.push(check_box[i].value);
        }
      }
      var filtredDataTotal = mydatas.filter((item) =>
        checkboxArray.includes(item.orderStatus)
      );
      var temp = " ";
      filtredDataTotal.forEach((itemData) => {
        temp += "<tr >";
        temp += "<td>" + itemData.id + "</td>"
        temp += "<td>" + itemData.customerName + "</td>";
        temp += "<td>" + itemData.orderDate + "</td>";
        temp += "<td>" + itemData.amount + "</td>";
        temp += "<td>" + itemData.orderStatus + "</td></tr>";
      });
      document.getElementById("mytabledata").innerHTML = temp;
      total = filtredDataTotal.length;
      let mycount1 = document.getElementById("count");
      mycount1.innerHTML = `Count: ${total}`;

      console.log("This is a Count", filtredDataTotal);
    });
};
Users();