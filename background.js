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
      // var newURL = 'https://www.google.com/search?q=' + encodeURIComponent(" cusail" + text);
    }
    else {
      chrome.storage.sync.get([text], function (result) {
        console.log(result[text])
        if (result[text]) {
          chrome.tabs.create({ url: result[text] });
        }
      });
      // var newURL = 'https://www.google.com/search?q=' + encodeURIComponent(text);
      // chrome.tabs.create({ url: newURL });
    }
    // Encode user input for special characters , / ? : @ & = + $ #
  });
