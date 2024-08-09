document.getElementById('processAllTabs').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "processAllTabs"});
    window.close(); 
  });

document.getElementById('sortAllTabs').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "sortAllTabs"});
    window.close(); 
  });
  
const checkbox = document.getElementById('deleteTabCheckbox');
if (checkbox) {
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      chrome.runtime.sendMessage({action: "DeleteTabAfterSend"});
    } else {
      chrome.runtime.sendMessage({action: "NoNDeleteTabAfterSend"});
    }
  });
}

// Функция, которая будет выполнена при обнаружении изменений
function mutationCallback(mutationsList, observer) {
  for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
          // Проверяем, был ли удален элемент с классом "auth-container"
          for (let removedNode of mutation.removedNodes) {
              if (removedNode.classList && removedNode.classList.contains('auth-container')) {
                  window.close();
              }
          }
      }
  }
}

//ПРОВЕРКА на случай если чел удалил auth до запуска
if(!document.querySelector('.auth-container'))
  window.close();

// Создаем экземпляр MutationObserver и передаем ему callback функцию
const observer = new MutationObserver(mutationCallback);

// Настройки для наблюдателя (следим за изменениями в дочерних элементах)
const config = { childList: true, subtree: true };

// Начинаем наблюдение за элементом body
observer.observe(document.body, config);
