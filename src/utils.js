//util.js

// Function to display dialogue text character by character
export function displayDialogue(text, onDisplayEnd) {
    // Get references to the dialogue UI elements
    const dialogueUI = document.getElementById("textbox-container");
    const dialogue = document.getElementById("dialogue");
  
    // Make the dialogue UI visible
    dialogueUI.style.display = "block";
    
    // Initialize variables for displaying text one character at a time
    let index = 0;
    let currentText = "";
    
    // Start an interval to display the text character by character
    const intervalRef = setInterval(() => {
        if (index < text.length) {
            // Append the current character to the dialogue text
            currentText += text[index];
            dialogue.innerHTML = currentText;
            index++;
            return;
        }
  
        // Clear the interval once all text has been displayed
        clearInterval(intervalRef);
    }, 1);
  
    // Get reference to the close button
    const closeBtn = document.getElementById("close");
  
    // Function to handle the close button click event
    function onCloseBtnClick() {
        // Call the callback function to handle any state changes or reset controls
        onDisplayEnd();
        
        // Hide the dialogue UI and clear the displayed text
        dialogueUI.style.display = "none";
        dialogue.innerHTML = "";
        
        // Clear the interval to stop the text display (if it's still running)
        clearInterval(intervalRef);
        
        // Remove the event listener to prevent multiple bindings
        closeBtn.removeEventListener("click", onCloseBtnClick);
        
        // Refocus the canvas to ensure it captures keyboard input
        const canvas = document.querySelector("canvas");
        if (canvas) canvas.focus();
    }
  
    // Add an event listener to the close button
    closeBtn.addEventListener("click", onCloseBtnClick);
  }
  
  // Function to set the camera scale based on the aspect ratio
  export function setCamScale(k) {
      // Calculate the resize factor based on the aspect ratio of the canvas
      const resizeFactor = k.width() / k.height();
      
      // If the aspect ratio is less than 1, set the camera scale to normal (1)
      if (resizeFactor < 1) {
          k.camScale(k.vec2(1));
          return; 
      } 
  
      // If the aspect ratio is 1 or greater, increase the camera scale
      k.camScale(k.vec2(1.5)); 
  }
  
 
