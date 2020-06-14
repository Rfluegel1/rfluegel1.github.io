var column = document.getElementById("list");
fridge = [];
document.cookie = ""
var db = firebase.database();
var currentUser = ""


function login() {
currentUser = document.getElementById("inputUsername").value;
display();
}

function addToLocalFridge(t) {
  console.log(t.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText);
  removeFood(t.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText);
  //currentUser = 'community';
  //addFood(t.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].innerText);
  display();
}

function removeFood(t) {
  if (document.getElementById("fridge_name")) {
    if (currentUser != ""){
      fridge_ref = db.ref().child('personal-fridge' + '-' + currentUser);
    } else {
      fridge_ref = db.ref().child('personal-fridge');
    }
  }else{
      fridge_ref = db.ref().child('community-fridge');
    }
  console.log(t);
  fridge_ref.child(t).remove();
  display();
}

function addFood(t) {
  var new_food = new Food(document.getElementById("new_food").value);
  new_food.setPurchaseDate(document.getElementById("pur_date").value.split("-"));
  new_food.setExpiryDate(document.getElementById("exp_date").value.split("-"));
  if (currentUser != ""){
    fridge_ref = db.ref().child('personal-fridge' + '-' + currentUser);
  } else if (currentUser == "community") {
    fridge_ref = db.ref().child('community-fridge');
  } else {
    fridge_ref = db.ref().child('personal-fridge');
  }
  if (t!=""){
  fridge_ref.child(new_food.foodname).child("expiration-date").set(new_food.printExpiryDate());
  fridge_ref.child(new_food.foodname).child("purchase-date").set(new_food.printPurchaseDate());
}else {
  fridge_ref.child(t).child("expiration-date").set(new_food.printExpiryDate());
  fridge_ref.child(t).child("purchase-date").set(new_food.printPurchaseDate());
}

  display();
}


function display() {
  var fridge = []
  var headerStr = "<div class='container' style='margin-bottom:20px;'><div class='row' id='your-fridge-title'>"
    if (document.getElementById("fridge_name")) {
      if (currentUser != ""){
        fridge_ref = db.ref().child('personal-fridge' + '-' + currentUser);
      } else {
        fridge_ref = db.ref().child('personal-fridge');
      }
      headerStr += "<h1 class='col-md-8' style='padding-top:5px;'>Your Fridge</h1><button id='add-food-button' type='button' class='btn btn-primary col-md-4' data-toggle='modal' data-target='#exampleModal'>Add Food</button>"
  } else {
      fridge_ref = db.ref().child('community-fridge');
      headerStr += "<h1 class='col-md-8' style='font-size:32px; padding-top:10px;'>Community Fridge</h1>"
  }
  headerStr += "</div></div><div class='accordion' id='accordionExample'>"
  column.innerHTML = headerStr

  var dbjson;
  fridge_ref.on('value', snap =>
      {

        var i = 0;
        for (var key in snap.val()){
          var foodname = key;
          var dates = snap.val()[key];
          var months = ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"]
          var exp_date = dates["expiration-date"].split(' ');
          var pur_date = dates["purchase-date"].split(' ');
          exp_month = exp_date[1];
          pur_month = pur_date[1];
          console.log(pur_month)
          var exp_mo_no;
          var pur_mo_no;
          for (var j = 0; j<12; j++){
            if (exp_month == months[j]) {
              exp_mo_no = j + 1;
            }
            if (pur_month == months[j]) {
              pur_mo_no = j + 1;
            }
          }
          var exp_day_no = exp_date[2];
          var pur_day_no = pur_date[2];
          var bodyStr = `<div class='card'>
          <div class='card-header justify-content-between' id='heading`+ i +`'>
          <h2 class='mb-0'>
          <button class='btn fridge-button' type='button' data-toggle='collapse' data-target='#collapse`+ i +`' aria-expanded='true' aria-controls='collapse`+ i +`'>
          <span>
          <h3><img src="`
          f = new Food(foodname);
          f.setExpiryDate([2020, exp_mo_no, exp_day_no]);
          f.setPurchaseDate([2020, pur_mo_no, pur_day_no]);
          imgurl = "img/green_circle.png"
          console.log(f.foodname)
          console.log(f.daysTilExpiry())
          if (f.daysTilExpiry() <= 0) {
              imgurl = "img/red_circle.png"
          } else if (f.daysTilExpiry() <= 1) {
              imgurl = "img/orange_circle.png"
          } else if (f.daysTilExpiry() <= 2) {
              imgurl = "img/yellow_circle.png"
          }
          bodyStr += imgurl
          bodyStr += `" height="40" style="margin-right:10px;">` + f.foodname + `</h3>
          </span>
          </button>
          <button class='close-button' onClick='removeFood(this.parentNode.childNodes[1].innerText)'><svg class="bi bi-x-square-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3.354 4.646L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"></path>
          </svg></button>
          </h2>
          </div>

          <div id='collapse`+ i +`' class='collapse' aria-labelledby='heading`+ i +`' data-parent='#accordionExample'>
            <div class='container'>
              <div class='row'>
                  <div class="col-sm-8"><b style="margin-top: 20px">Purchase Date</b>:<br>`+ f.printPurchaseDate() +`<br><b>Expiry Date</b>:<br>`+ f.printExpiryDate() +`</div>
                  <div class = "col-sm-4">
                    <button style="margin-top:20px;" class="btn btn-success" onClick='addToLocalFridge(this)'>Send to Local Fridge</button>
                </div>
              </div>
            </div>
          </div>`
          column.innerHTML += bodyStr;
          i++;
        }
        column.innerHTML += '</div>';
        if (currentUser == "") {
            document.getElementById("demo").innerHTML = "Hello, default User!";
        } else {
            document.getElementById("demo").innerHTML = "Hello, "+currentUser+"!";
        }
      });



  // local_column.innerHTML = "<h1 id='your-fridge-title'>Local Fridge</h1><div class='accordion' id='accordionExample'>";
  // for (j = 0; j < local_fridge.length; j++){
  //   var f = new Food(local_fridge[i]);
  //   local_column.innerHTML +=
  //   `<div class='card'>
  //   <div class='card-header justify-content-between' id='heading`+ i +`'>
  //   <h2 class='mb-0'>
  //   <button class='btn personalFridge-button' type='button' data-toggle='collapse' data-target='#collapse`+ i +`' aria-expanded='true' aria-controls='collapse`+ i +`'>
  //   <h3>` + f.foodname + `</h3>
  //   </button>
  //   <button class='close-button' onClick='removeFood(this.parentNode.childNodes[1].innerText)'><svg class="bi bi-x-square-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  //   <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3.354 4.646L10 9.293l2.646-2.647a.5.5 0 01.708.708L10.707 10l2.647 2.646a.5.5 0 01-.708.708L10 10.707l-2.646 2.647a.5.5 0 01-.708-.708L9.293 10 6.646 7.354a.5.5 0 11.708-.708z" clip-rule="evenodd"></path>
  //   </svg></button>
  //   </h2>
  //   </div>
  //
  //   <div id='collapse`+ i +`' class='collapse' aria-labelledby='heading`+ i +`' data-parent='#accordionExample'>
  //   <div class='card-body'>
  //   Date of Purchase: `+ f.printPurchaseDate() +`<br> Estimated Expire Date: `+ f.printExpiryDate() +` <br> <button onClick='addToLocalFridge(this.parentNode.parentNode.parentNode.childNodes[1].innerText)'>add to local fridge</button>
  //   </div>
  //   </div>
  //   </div>`
  // }
  // local_column.innerHTML += '</div>';
}



display();
