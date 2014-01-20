var injected = injected || (function () {

  var methods = {

  };

  methods.getWidth = function () {
    return window.innerWidth;
  }

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};
    if (methods.hasOwnProperty(request.method)) {
      data = methods[request.method]();
    }
    sendResponse({ data: data });
    return true;
  });

  return true;

})();

