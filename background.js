// var firebaseConfig = {
//   apiKey: "AIzaSyDMyRYrzEteAn7BAX-wyYpI-4tXF68tG14",
//   authDomain: "cusail-omnibox.firebaseapp.com",
//   databaseURL: "https://cusail-omnibox.firebaseio.com",
//   projectId: "cusail-omnibox",
//   storageBucket: "cusail-omnibox.appspot.com",
//   messagingSenderId: "498526158246",
//   appId: "1:498526158246:web:75922b78b17b2a4212e367"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// Initialize Firebase
var config = {
   apiKey: "AIzaSyDMyRYrzEteAn7BAX-wyYpI-4tXF68tG14",
   databaseURL: "https://cusail-omnibox.firebaseio.com",
   storageBucket: "cusail-omnibox.appspot.com"
};
firebase.initializeApp(config);

var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
firebase.auth().signInWithCredential(credential);

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function (text) {
    if (text.slice(0, 3) == "add") {
      var sliced = text.slice(4)
      var space = sliced.search(" ")
      var keyword = (sliced.slice(0, space))

      chrome.storage.sync.set({ [keyword]: sliced.slice(space + 1) }, function () {
        console.log("set " + keyword + " to " + sliced.slice(space + 1))
      });
    }
    else if (text.slice(0, 6) == "remove") {
      var sliced = text.slice(4)
      var space = sliced.search(" ")
      var keyword = (sliced.slice(0, space))

      chrome.storage.sync.set({ [keyword]: sliced.slice(space + 1) }, function () {
        console.log("set " + keyword + " to " + sliced.slice(space + 1))

      });
    }
    else {
      chrome.storage.sync.get([text], function (result) {
        console.log(result[text])
        if (result[text]) {
          chrome.tabs.create({ url: result[text] });
        }
      });
    }
  });
