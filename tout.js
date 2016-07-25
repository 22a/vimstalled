var setInstalled = function(){
  var repoInfoElement = document.getElementsByClassName("public")[0];
  var vimstalledBadge = document.createElement("span");
  vimstalledBadge.className = "vimstalled-badge";
  vimstalledBadge.innerHTML = "vimstalled";
  repoInfoElement.parentNode.insertBefore(vimstalledBadge, repoInfoElement.nextSibling);
}


// tell the background script where we are, do something with the result
chrome.runtime.sendMessage({path: window.location.pathname, action: "queryPlugins"}, function(isInstalled){
  if (isInstalled){
    setInstalled();
  }
});
