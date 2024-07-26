
let DTAS = false; // Delete Tab After Send

function clickButtonOnTab(tabId) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, {action: "clickButton"}, function(response) {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
        resolve({status: "error", message: "Error sending message"});
      } else {
        resolve(response);
      }
    });
  });
}

async function processNextTab(tabIds) {
  if (tabIds.length === 0) {
    console.log("All tabs processed");
    return;
  }

  const currentTabId = tabIds.shift();
  
  try {
    await new Promise(resolve => chrome.tabs.update(currentTabId, {active: true}, resolve));
    const response = await clickButtonOnTab(currentTabId);
    if (DTAS && response && response.status === "success") {
      await chrome.tabs.remove(currentTabId);
    }
    
    // Даем время на завершение всех операций
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Рекурсивно вызываем для следующей вкладки
    await processNextTab(tabIds);
  } catch (error) {
    console.error("Error processing tab:", error);
    // Продолжаем со следующей вкладкой даже при ошибке
    await processNextTab(tabIds);
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "processAllTabs") {
    chrome.tabs.query({}, function(tabs) {
      const tabIds = tabs.map(tab => tab.id);
      processNextTab(tabIds);
    });
  } else if (request.action === "DeleteTabAfterSend") {
    DTAS = request.state; // Используем state из сообщения
  }
});


/*
function clickButtonOnTab(tabId) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, {action: "clickButton"}, function(response) {
      if (chrome.runtime.lastError) {
        console.error('Error:', chrome.runtime.lastError);
        resolve({status: "error", message: chrome.runtime.lastError.message});
      } else {
        resolve(response);
      }
    });
  });
}

function processTabs(totalTabs) {
  let tabIndex = 0;

  function processNextTab() {
    if (tabIndex >= totalTabs) {
      console.log("Обработка всех вкладок завершена");
      return;
    }

    chrome.tabs.query({}, function(tabs) {
      const currentTab = tabs[tabIndex];
      
      chrome.tabs.update(currentTab.id, {active: true}, function() {
        clickButtonOnTab(currentTab.id)
          .then(response => {
            console.log(`Ответ от вкладки ${tabIndex}:`, response);
            
            if (DTAS && response && response.status === "success") {
              setTimeout(() => {
                chrome.tabs.remove(currentTab.id, function() {
                });
              }, 200);
              tabIndex++;
              processNextTab();
            } else {
              tabIndex++;
              processNextTab();
            }
          })
          .catch(error => {
            alert("Ошибка при обработке вкладки ${tabIndex}: " + error.message);
            tabIndex++;
            processNextTab();
          });
      });
    });
  }

  processNextTab();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "processAllTabs") {
    chrome.tabs.query({}, function(tabs) {
      processTabs(tabs.totalTabs);
    });
  }
});
let DTAS = false //Delete Tab After Send

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "DeleteTabAfterSend")
  {
    DTAS = true;
  }
  else if(request.action === "NoNDeleteTabAfterSend")
  {
    DTAS = false;
  }
});
*/