function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function (){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getMediaQuery(width) {
  return "Mediaquery " + width;
}

function getWidth(tab) {
  injectedMethod(tab, 'getWidth', function (response) {

    if (!response || !response.data) return;

    var str = getMediaQuery(response.data);

    document.oncopy = function(event) {
      event.clipboardData.setData("Text", str);
      event.preventDefault();
    };
    document.execCommand("Copy");
    document.oncopy = undefined;

    return true;
  });
}

chrome.browserAction.onClicked.addListener(getWidth);
