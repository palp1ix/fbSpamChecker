
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

function checkForSuitable(tabId) {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabId, {action: "checkTab"}, function(response) {
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
    console.error("Error processing tab:" + JSON.stringify(error));
    // Продолжаем со следующей вкладкой даже при ошибке
    await processNextTab(tabIds);
  }
}

async function sortNextTab(tabIds) {
  if (tabIds.length === 0) {
    console.log("All tabs sorted");
    return;
  }

  const currentTabId = tabIds.shift();


  // ПРОВЕРКА вообще ли это обьявление фб
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentTab = tabs[0];
    if (!currentTab.url.includes('/item/')) {
      return sortNextTab(tabIds);
    }
  });
  
  try {
    await new Promise(resolve => chrome.tabs.update(currentTabId, {active: true}, resolve));
    
    // Используем chrome.tabs.sendMessage для проверки наличия элемента
    const elementExists = await new Promise(resolve => {
      chrome.tabs.sendMessage(currentTabId, {action: "checkElement"}, response => {
        resolve(response && response.exists);
      });
    });

    if (elementExists) {
      await new Promise(resolve => chrome.tabs.remove(currentTabId, resolve));
      // Переходим к следующей вкладке без выполнения остальной логики
      return sortNextTab(tabIds);
    }

    const response = await checkForSuitable(currentTabId);

    if (response.status === "close") {
      await new Promise(resolve => chrome.tabs.remove(currentTabId, resolve));
      // Переходим к следующей вкладке без выполнения остальной логики
      return sortNextTab(tabIds);
    }
    // Даем время на завершение всех операций
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Рекурсивно вызываем для следующей вкладки
    await sortNextTab(tabIds);
  } catch (error) {
    console.error("Error processing tab:", error);
    // Продолжаем со следующей вкладкой даже при ошибке
    await sortNextTab(tabIds);
  }
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "processAllTabs") {
    chrome.tabs.query({}, function(tabs) {
      const tabIds = tabs.map(tab => tab.id);
      processNextTab(tabIds);
    });
  }
    else if (request.action = "sortAllTabs"){
      chrome.tabs.query({}, function(tabs) {
        const tabIds = tabs.map(tab => tab.id);
        sortNextTab(tabIds);
      });
    }
    else if (request.action === "DeleteTabAfterSend") {
     DTAS = true; // Используем state из сообщения
   }
   else if (request.action === "NoNDeleteTabAfterSend") {
    DTAS = false; // Используем state из сообщения
  }
});