// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBm87XbFNx1qbyXw9eBvgovbVXBD5osCpQ",
  authDomain: "cusail-omnibox-a6705.firebaseapp.com",
  databaseURL: "https://cusail-omnibox-a6705.firebaseio.com",
  projectId: "cusail-omnibox-a6705",
  storageBucket: "cusail-omnibox-a6705.appspot.com",
  messagingSenderId: "782612915461",
  appId: "1:782612915461:web:5df3976372f0736f2f436c",
  measurementId: "G-DLH92W1HM0"
};
firebase.initializeApp(firebaseConfig);

console.log(firebase);
var db = firebase.firestore();

chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
  var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
  firebase.auth().signInWithCredential(credential);
});

chrome.omnibox.onInputEntered.addListener(

  function (text) {
    // if (text.slice(0, 3) == "add") {
    //   var nameShortcutLink = text.slice(4)
    //   var space = nameShortcutLink.search(" ")
    //   var name = (nameShortcutLink.slice(0, space))

    //   var shortcutLink = nameShortcutLink.slice(space + 1)
    //   var space2 = nameShortcutLink.search(" ")
    //   var shortcut = shortcutLink.slice(0, space2)
    //   var link = shortcutLink.slice(space + 1)

    //   db.collection('links').add({
    //     name: name,
    //     shortcut: shortcut,
    //     data: link,
    //     tags: ""
    //   })
    //     .then(function () {
    //       console.log("Document successfully written!");
    //       alert("successfully added")
    //     })
    //     .catch(function (error) {
    //       console.error("Error writing document: ", error);
    //     });
    // }
    // else {
    db.collection("links").where("shortcut", "==", text).get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        console.log(doc.id, " => ", doc.data());
        chrome.tabs.create({ url: doc.data().data });
      });
    })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }
  // }
)
