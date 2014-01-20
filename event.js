function injectedMethod (tab, method, callback) {
  chrome.tabs.executeScript(tab.id, { file: 'inject.js' }, function (){
    chrome.tabs.sendMessage(tab.id, { method: method }, callback);
  });
}

function getWidth(tab) {
  injectedMethod(tab, 'getWidth', function (response) {
    // alert('W: ' + response.data);
    var url = 'http://breakpoints.io?w=' + response.data;

    chrome.tabs.create({ url: url });

    return true;
  });
}

chrome.browserAction.onClicked.addListener(getWidth);
