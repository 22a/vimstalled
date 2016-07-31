// TODO: get these values from options page
var username = "22a";
var rawVimrc = "https://raw.githubusercontent.com/22a/dotfiles/master/vimrc";

// TODO: store things sensibly (localstorage / sync)
var installedPlugins = "";

var isInstalled = function(pluginName, callback){
  callback(installedPlugins.indexOf(pluginName) !== -1);
}

var getPlugins = function(callback){
  var http = new XMLHttpRequest();
  var url = "https://weebscale.xyz/plugins";
  var params = "username=" + username + "&vimrc=" + rawVimrc;
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
      callback(JSON.parse(http.responseText).plugins);
    }
  }
  http.send(params);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "queryPlugins"){
      var pathBits = request.path.split("/");
      if(pathBits[2] !== undefined){
        var pluginName = pathBits[1] + "/" + pathBits[2];
        isInstalled(pluginName, function(isInstalledBool){
          sendResponse(isInstalledBool);
        });
      }
      else {
        sendResponse(false);
      }
    }
  }
);

if(installedPlugins === ""){
  getPlugins(function(pluginList){
    installedPlugins = pluginList;
  });
}
