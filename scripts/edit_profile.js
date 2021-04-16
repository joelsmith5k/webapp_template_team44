
function getFormInputs() {
  document
    .getElementById("save")
    .addEventListener("click", function () {
      firebase.auth().onAuthStateChanged(function (user) {
        // get various values from the form
        firebase.auth().onAuthStateChanged(function (user) {

          var name = document.getElementById("userName").value;
          var aboutme = document.getElementById("aboutMe").value;
          var country = document.getElementById("country").value;
          var city = document.getElementById("city").value;
          console.log("hi");

          var amazon = document.getElementById("amazon").checked;
          var netflix = document.getElementById("netflix").checked;
          var disney = document.getElementById("disney").checked;
          var hulu = document.getElementById("hulu").checked;

          var anime = document.getElementById("anime").checked;
          var action = document.getElementById("action").checked;
          var comedy = document.getElementById("comedy").checked;
          var drama = document.getElementById("drama").checked;
          var documentary = document.getElementById("documentary").checked;
          var horror = document.getElementById("horror").checked;
          var mystery = document.getElementById("mystery").checked;
          var romance = document.getElementById("romance").checked;
          var scienceFiction = document.getElementById("scienceFiction").checked;

          db.collection("userstwo").doc(user.uid).update({
            name: name,
            aboutme: aboutme,
            country: country,
            city: city,
            amazon: amazon,
            netflix: netflix,
            disney: disney,
            hulu: hulu,
            anime: anime,
            action: action,
            comedy: comedy,
            drama: drama,
            documentary: documentary,
            horror: horror,
            mystery: mystery,
            romance: romance,
            scienceFiction: scienceFiction
          }).then(function () {
            window.location.assign("profile.html");
          })
        });
      });
    });
};
getFormInputs();