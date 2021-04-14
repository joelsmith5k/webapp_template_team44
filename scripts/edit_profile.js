function getFormInputs() {
    document
      .getElementById("save")
      .addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
          // get various values from the form
          var name = document.getElementById("userName").value;
          var aboutme = document.getElementById("aboutMe").value;
          var country = document.getElementById("country").value;
          var city = document.getElementById("city").value;

          db.collection("userstwo").doc(userstwo.uid).update({
            name: name,
            aboutme: aboutme, // from textarea
            country: country,//from textarea
            city: city, //from checkbox
          });
          setTimeout(function () {
            window.location.href = "profile.html"; // this delay allows it to write to DB before redirect
          }, 2000);
        });
      });
  }

  getFormInputs();