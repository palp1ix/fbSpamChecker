document.getElementById('processAllTabs').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "processAllTabs"});
    window.close(); 
  });

const checkbox = document.getElementById('deleteTabCheckbox');
if (checkbox) {
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      chrome.runtime.sendMessage({action: "DeleteTabAfterSend"});
      console.log("Checkbox checked");
    } else {
      chrome.runtime.sendMessage({action: "NoNDeleteTabAfterSend"});
      console.log("Checkbox is not checked..");
    }
  });
} else {
  alert('Checkbox element not found');
}