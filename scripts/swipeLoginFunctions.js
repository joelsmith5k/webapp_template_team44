// Simple function to authenticate user login
// If new user, they are sent to "main.html", if existing user they are sent to "main • exist.html"

var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
              var user = authResult.user;
              if (authResult.additionalUserInfo.isNewUser) {
                  db.collection("userstwo").doc(user.uid).set({
                          name: user.displayName,
                          email: user.email,
                          desired_movies: []
                      }).then(function () {
                          console.log("New user added to firestore");
                          window.location.assign("main.html");
                      })
                      .catch(function (error) {
                          console.log("Error adding new user: " + error);
                      });
              } else {
                  return true;
              }
              return false;
          },
    uiShown: function () {
      document.getElementById('loader').style.display = 'none';
    }
  },
  signInFlow: 'popup',
  signInSuccessUrl: 'main • exist.html',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  tosUrl: '<your-tos-url>',
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);