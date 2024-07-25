chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "clickButton") {
    const element = document.querySelector('div[role="button"][aria-label="Send"]');
    if (element) {
      element.click();
        sendResponse({status: "success", message: "Кнопка нажата"});
    } else {
      sendResponse({status: "error", message: "Кнопка не найдена"});
    }
    return true; 
  }
});

/*
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "clickButton") {
    const element = document.querySelector('div[role="button"][aria-label="Send"]');
    if (element) {
      element.click();
      sendResponse({status: "success", message: "Кнопка нажата"});
    } else {
      sendResponse({status: "error", message: "Кнопка не найдена"});
    }
  }
  return true;
});
*/
/*
██╗     ███████╗ ██████╗ ██╗ ██████╗ ███╗   ██╗    ████████╗███████╗ █████╗ ███╗   ███╗    
██║     ██╔════╝██╔════╝ ██║██╔═══██╗████╗  ██║    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║    
██║     █████╗  ██║  ███╗██║██║   ██║██╔██╗ ██║       ██║   █████╗  ███████║██╔████╔██║    
██║     ██╔══╝  ██║   ██║██║██║   ██║██║╚██╗██║       ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║    
███████╗███████╗╚██████╔╝██║╚██████╔╝██║ ╚████║       ██║   ███████╗██║  ██║██║ ╚═╝ ██║    
╚══════╝╚══════╝ ╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═══╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝                                                                                             
*/