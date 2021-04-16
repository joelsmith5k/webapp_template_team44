
// Build a card for each group in the database, display it on the page with its unique name/description/photo, and a button with a unique ID
function displayGroups(){
    db.collection("groups")
    .get()
    .then(function(snap){
    
    // counters to increment after each card is built, allows us to give each card a unique ID
    var groupCounter = 1
    var buttonCounter = 1

    // For each document in the groups collection, build a bootstrap card and fill in unique values
    snap.forEach(function(doc){

    var groupName = doc.data().name;
    var groupDescription = doc.data().description;
    var groupImageChoice = doc.data().photo;

    var groupContainer = document.createElement('div');
    groupContainer.setAttribute('class', "container");

    var groupGrid = document.createElement('div');
    groupGrid.setAttribute('class', "row row-cols-1 row-cols-md-2 g-4");

    var groupCol = document.createElement('div');
    groupCol.setAttribute('class', "col");

    var groupBox = document.createElement('div');
    groupBox.setAttribute('class', "card groupBox");

    var groupImage = document.createElement('img');
    var groupImageSource = "./images/"+ groupImageChoice + ".jpg"
    groupImage.setAttribute('src', groupImageSource);
    groupImage.setAttribute('class', "card-img-top");

    var groupBody = document.createElement('div');
    groupBody.setAttribute('class', "card-body");
    
    // Here, we are setting a unique Id for each Title, starting with groupName1, then groupName2, etc..
    var groupTitle = document.createElement('h5');
    groupTitle.setAttribute('class', "card-title");
    groupTitle.setAttribute('id', "groupName" + groupCounter);
    groupCounter += 1
    console.log(groupTitle.id)
    groupTitle.appendChild(document.createTextNode(groupName));

    var groupText = document.createElement('p');
    groupText.setAttribute('class', "card-text");
    groupText.appendChild(document.createTextNode(groupDescription));

    // Here, we are setting a unique Id for each "Start Matching" button, starting with startMatching 1, then startMatching2..
    // This allows us to update users current_group attribute with the corresponding group to their button
    var groupSelect = document.createElement('button');
    groupSelect.setAttribute('class', "btn matchingButton");
    groupSelect.setAttribute('type', "button");
    groupSelect.setAttribute('id', "startMatching" + buttonCounter);
    buttonCounter += 1
    console.log(groupSelect.id)
    groupSelect.appendChild(document.createTextNode("Start Matching!"));

    groupBody.appendChild(groupTitle)
    groupBody.appendChild(groupText)
    groupBody.appendChild(groupSelect)

    groupBox.appendChild(groupImage)
    groupBox.appendChild(groupBody)

    groupCol.appendChild(groupBox)

    groupGrid.appendChild(groupCol)

    groupContainer.appendChild(groupGrid)
    
    // Append the bootstrap div to the body of the page in the div called "groupCardDiv"
    var domDiv = document.getElementById("groupCardDiv")
    domDiv.appendChild(groupContainer)
      }) 
    })
  }
  displayGroups();

// add event listeners to each matching button that is populates the screen
function applyListeners(){
  let allButtons = document.querySelectorAll(".btn.matchingButton");
  let allButtonsArray = Array.prototype.slice.call(allButtons);

  allButtonsArray.forEach(function(button){
    var choiceNumber = button.id[button.id.length - 1]
    button.addEventListener("click", joinTheGroup(choiceNumber))
  })
}

// add event listeners to each matching button that is populates the screen
var joinTheGroup = function(choiceNumber){
  return function curriedFunction(choiceNumber){

    firebase.auth().onAuthStateChanged(function(user){
    db.collection("userstwo").doc(user.uid).get().then(function(doc){

      groupTitleInside = document.getElementById("groupName" + choiceNumber.target.id[choiceNumber.target.id.length - 1])
      var groupNameToAdd = groupTitleInside.innerHTML
      var objectToAdd = {"current_group": groupNameToAdd}

      db.collection("userstwo").doc(user.uid).update(objectToAdd).then(() => {
          console.log("Document successfully written!")
        })

        setTimeout(function () {
            window.location.href = "./swipe • collection.html"; // this delay allows it to write to DB before redirect
          }, 2000);
      })
    })
  }
}
// allow buttons to load from DB before applying listeners to them
setTimeout(applyListeners, 2000);

// make the create a new group button navigation to create group page
document.getElementById(id = "createGroupButton").onclick = function () {
location.href = "./create_group.html";
};