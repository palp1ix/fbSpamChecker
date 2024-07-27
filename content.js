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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "checkTab") {
    const elements = document.querySelectorAll('span[dir="auto"]');
    const joinedElement = Array.from(elements).find(el => 
    el.textContent.includes('Joined Facebook in')
  );

  if (joinedElement.textContent == "Joined Facebook in 2024") {
    sendResponse({status: "close", message: "Это индус, скип"});
  }  
  else {
    sendResponse({status: "next", message: "Все хорошо"});
  }
    return true; 
  }
});

// В вашем content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkElement") {
    const element = document.querySelector("div.x78zum5.x1q0g3np.x11i5rnm.x1mh8g0r.x1yrsyyn");
    sendResponse({exists: !!element});
  }
});
/*
██╗     ███████╗ ██████╗ ██╗ ██████╗ ███╗   ██╗    ████████╗███████╗ █████╗ ███╗   ███╗    
██║     ██╔════╝██╔════╝ ██║██╔═══██╗████╗  ██║    ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║    
██║     █████╗  ██║  ███╗██║██║   ██║██╔██╗ ██║       ██║   █████╗  ███████║██╔████╔██║    
██║     ██╔══╝  ██║   ██║██║██║   ██║██║╚██╗██║       ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║    
███████╗███████╗╚██████╔╝██║╚██████╔╝██║ ╚████║       ██║   ███████╗██║  ██║██║ ╚═╝ ██║    
╚══════╝╚══════╝ ╚═════╝ ╚═╝ ╚═════╝ ╚═╝  ╚═══╝       ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝                                                                                             
*/