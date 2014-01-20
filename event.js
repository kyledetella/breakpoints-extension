function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function (){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getMediaQuery(value, unit) {

  var output = [
    "/* Breakpoint @ " + value + unit +" */",
    "@media only screen and (max-width: " + value + unit + ") {",
    "  /* your code */",
    "}"
  ].join("\n");

  return output;
}

function getWidth(tab) {
  injectedMethod(tab, 'getWidth', function (response) {

    if (!response || !response.data) return;

    var str = getMediaQuery(response.data, 'px');

    document.oncopy = function(event) {
      event.clipboardData.setData("Text", str);
      event.preventDefault();
    };
    document.execCommand("Copy");
    document.oncopy = undefined;

    chrome.browserAction.setPopup({
      popup: 'src/copied.html'
    });

    return true;
  });
}

chrome.browserAction.onClicked.addListener(getWidth);
