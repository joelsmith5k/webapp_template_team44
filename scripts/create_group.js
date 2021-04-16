
// On click of the create group button, write all of the data to a new document in the groups collection, and navigate 
// to the group selection page

function getFormInputs() {
    document
      .getElementById("createGroup")
      .addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
          // get various values from the form
          var name = document.getElementById("groupName").value;
          var desc = document.getElementById("groupDescription").value;
          var photo = document.getElementById("groupPhoto").value;

          // Either true or false
          // var public = document.getElementById("makeGroupPublic").checked;

          db.collection("groups").add({
            name: name,
            description: desc, // from textarea
            photo: photo,//from dropdown menu
            // public: public, //from checkbox
          });
          setTimeout(function () {
          window.location.href = "groups.html"; // this delay allows it to write to DB before redirect
          }, 200);
        });
      });
  }

  getFormInputs();