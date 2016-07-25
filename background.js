// TODO: get these values from options page
var username = "22a";
var rawVimrc = "https://raw.githubusercontent.com/22a/dotfiles/master/vimrc";

var installedPlugins = "";

var isInstalled = function(pluginName, callback){
  if (installedPlugins === ""){
    getPlugins(function(pluginList){
      installedPlugins = pluginList;
      callback(installedPlugins.indexOf(pluginName) !== -1);
    });
  }
  else {
    callback(installedPlugins.indexOf(pluginName) !== -1);
  }
}

var getPlugins = function(callback){
  var http = new XMLHttpRequest();
  var url = "http://localhost:8000/plugins";
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
      var pluginName = pathBits[1] + "/" + pathBits[2];
      isInstalled(pluginName, function(isInstalledBool){
        sendResponse(isInstalledBool);
      });
    }
  }
);

getPlugins(function(pluginList){
  installedPlugins = pluginList;
});
