let isActive = false;
let isLoad = false;
let errCount = 0;

chrome.action.onClicked.addListener((tab) => {
  isLoad = false;
  errCount = 0;
  chrome.tabs.query({url: 'chrome://bookmarks/*'}, function(tabs) {
    if ( tabs.length > 0 ) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.remove(tabs[i].id);
      }
    }
  chrome.tabs.create({url: 'chrome://bookmarks'});
  isActive = true;
  });
});

/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
  if (isLoad) {
    console.log('GO OUT');
    chrome.tabs.query({url: 'chrome://bookmarks/*'}, function(tabs) {
      if ( tabs.length > 0 ) {
        for (var i = 0; i < tabs.length; i++) {
          chrome.tabs.remove(tabs[i].id);
          console.log(tabs[i].id);
        }
      }
    });
    isLoad = false;
  }
});
*/

chrome.tabs.onActivated.addListener(async function getCurrentTabInfo() {
  if (isLoad) {
    try {
      // the result of tabInfo is an 'Array'
      const tabInfo = await chrome.tabs.query({url: 'chrome://bookmarks/*'})
      // the result `tabInfo[0]` includes url, faviconUrl, etc...
      if (tabInfo[0] == undefined) {
        isLoad = false;
        errCount = 0;
      }
      // console.log(tabInfo[0]);
      await chrome.tabs.remove(tabInfo[0].id);
      isLoad = false;
      errCount = 0;
    } catch (error) {
      if (errCount > 7) {
        isLoad = false;
        errCount = 0;
      }
      // console.log("An error occured!");
      setTimeout(() => getCurrentTabInfo(), 40)
      errCount += 1;
    }
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (isActive) {
    if (tab.url === 'chrome://bookmarks/' && changeInfo.status === 'complete' && tab.active) {
      // console.log('LOADED');
      isActive = false;
      isLoad = true;
    }
  }
});

/* do stuff 
let tabUrl='';

chrome.tabs.onActivated.addListener(function(activeInfo) {
  console.log('onActivated trigger');
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tabUrl) {
      console.log(tabUrl);
    }
    tabUrl=tab.url;
    console.log(tabUrl);
  });
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currTab = tabs[0].id;
    if (currTab) { // Sanity check
      chrome.scripting.executeScript({
        target: {tabId: currTab},
        function: showAlert,
        args: [tabUrl]
      })
    }
  });
});
*/
/*
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.scripting.executeScript({
        target: {tabId},
        function: showAlert,
        args: [changeInfo.url]
    })
});
function showAlert(str) {
    alert(`${str}`); 
}
*/
