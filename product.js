let status = window.localStorage.getItem("loginStatus");
function logOut() {
  window.localStorage.setItem("loginStatus", "false")
  window.location.href = "index.html";
}


function myformateddate(date) {
  var d = new Date(date),
    month1 = '' + (d.getMonth() + 1),
    day1 = '' + d.getDate(),
    year1 = d.getFullYear();
  if (month1.length < 2)
    month1 = '0' + month1;
  if (day1.length < 2)
    day1 = '0' + day1;

  return [year1, month1, day1].join('-');
}

let mydtaes = myformateddate("14-Aug-2012")


const Users = () => {
  axios
    .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
    .then(function (response) {

      var mydatas = response.data;
      console.log(mydatas);

      let listData = mydatas;



      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      var date = yyyy + "-" + mm + "-" + dd;

      console.log(date)



      var expired = document.getElementById("expired").checked;
      var lowstock = document.getElementById("lowstock").checked;
      var finalTabledata;

      console.log(expired)


      if (expired && lowstock) {
        document.getElementById("mytabledata").innerHTML = " ";
        finalTabledata = mydatas.filter(

          function (item) {
            var convertedDate = myformateddate(item.expiryDate);
            return convertedDate < date && item.stock < 100;;
          }
        )

        console.log(finalTabledata)
      }

      else if (expired) {
        document.getElementById("mytabledata").innerHTML = " ";
        finalTabledata = mydatas.filter(

          function (item) {
            var convertedDate = myformateddate(item.expiryDate);
            return convertedDate < date;
          }
        )

        console.log(finalTabledata)
      }


      else if (lowstock) {
        document.getElementById("mytabledata").innerHTML = " ";
        finalTabledata = mydatas.filter(

          function (item) {
            var convertedDate = myformateddate(item.expiryDate);
            return item.stock < 100;
          }
        )
        console.log(finalTabledata)

      }

      else {
        finalTabledata = mydatas;
      }

      console.log("finalTabledata", finalTabledata, finalTabledata)
      var temp = "";
      finalTabledata.forEach((itemData) => {
        temp += "<tr >";
        temp += "<td>" + itemData.id + "</td>";
        temp += "<td>" + itemData.medicineName + "</td>";
        temp += "<td>" + itemData.medicineBrand + "</td>";
        temp += "<td>" + itemData.expiryDate + "</td>";
        temp += "<td>" + itemData.unitPrice + "</td>";
        temp += "<td>" + itemData.stock + "</td></tr>";
      });

      document.getElementById("mytabledata").innerHTML = temp;

      let total1;
      total1 = finalTabledata.length;
      let mycount1 = document.getElementById("total");
      mycount1.innerHTML = `Count: ${total1}`;

      console.log(finalTabledata.length);
    });
};
Users();