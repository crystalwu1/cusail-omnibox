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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

console.log(firebase);
var db = firebase.firestore();

chrome.omnibox.onInputEntered.addListener(

  function (text) {
    if (text.slice(0, 3) == "add") {
      var sliced = text.slice(4)
      var space = sliced.search(" ")
      var keyword = (sliced.slice(0, space))
      var link = sliced.slice(space + 1)
      db.collection("links").doc(keyword).set({
        data: link
      })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }
    else if (text.slice(0, 6) == "remove") {
      var sliced = text.slice(7)
      var keyword = (sliced.slice(0, sliced.length))
      console.log("removed " + keyword)
      db.collection("links").doc(keyword).delete().then(function () {
        console.log("Document successfully deleted!");
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    }
    else {
      var keyword = db.collection("links").doc(text)
      keyword.get().then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          const parsed = (doc.data())
          chrome.tabs.create({ url: parsed.data });
          db.collection("links").doc(keyword).set({
            data: keyword
          })
        } else {
          console.log("No such document");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      })
    }
  }
)

