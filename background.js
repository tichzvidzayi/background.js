/* 
This is the background script for the extension, it runs in the background of the browser.

Video walkthrough: https://vimeo.com/923628666

Goal: Ensure that there is a continuous stream of timestamps logged from contentScript.js

Rules: 
You can only change one file: this background.js file. 
No DOM manipulation allowed such as overriding document.visibilityState.
When testing your code we will use the original files and only update the background.js file.

Testing: Use this site for easy testing https://ai-stealth-challenge.web.app

Hint: The solution is only a few lines of code.
*/

// background console logs can be found by inspecting the extension in chrome://extensions > developer mode > then click on "service worker" > then go to console

/* YOUR CODE BELOW THIS LINE :) 
  - utilise the chrome.tabs API to actively communicate with the contentScript.js to maintain
  an open communication channel betwwen background.js and contentScript.js.

 This ensures that the webpage remains aware of user interaction even when the tab is inactive.

*/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Handle messages from content script
  if (message.type === "ping") {
    // Respond to ping message to keep connection alive
    sendResponse({ type: "pong" });
  }
});

// Regularly send a ping message to keep the connection alive
setInterval(() => {
  chrome.tabs.query({ active: true }, (tabs) => {
    // Send a ping message to the active tab
    chrome.tabs.sendMessage(tabs[0].id, { type: "ping" }, (response) => {
      // Handle response if needed
      /* if (response.status === 200){
            console.log('Ping responded');
        }
        */
    });
  });
}, 2000); // Adjust the interval as needed

// background.js
