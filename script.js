const inputField = document.getElementById('userInput');
const openingText = document.getElementById('openingText');
const labelName = document.getElementById('label');
const output = document.getElementById('output');
const newElement = document.createElement('button');
newElement.textContent = "Let's get Started";
newElement.onclick=function(){
    window.location.href="quiz.html";
};
const tryElement =document.createElement('button');
tryElement.textContent = "try Again";
tryElement.onclick= function(){
    inputField.style.display="block";
    labelName.style.display="block";
    output.innerHTML="";
    output.nextElementSibling?.remove();
}
// window.addEventListener("DOMContentLoaded",() =>{
//    if(localStorage.getItem('elementToHide') === 'true')
//    {
//      inputField.value='';
//      localStorage.removeItem('elementToHide');
//    }
// });
// Listen for 'Enter' key press
if (window.performance) {
    const navEntries = performance.getEntriesByType("navigation");
    
    if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        localStorage.removeItem('userName');
        sessionStorage.removeItem('quizWin');
        inputField.value='';
        // Your reload-specific code here
    }
    else{
        inputField.value='';
    }
}


window.addEventListener('beforeunload', () => {
    sessionStorage.removeItem('pageReloaded');
});
inputField.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const userText = inputField.value; // Capture input text
    if(userText.toLowerCase() === "gayathri senthilnathan" || userText.toLowerCase() === "gayathri" || userText.toLowerCase() === "g3" || userText.toLowerCase() === "gaajish")
    {
    output.innerHTML = 'Welcome, <span style="color:red;">'+ userText +'</span>'; // Display it
    localStorage.setItem("userName",userText);
    output.after(newElement);
    }
    else{
        output.innerHTML = "Unakku Edhukku Soulmate";
        output.after(tryElement);
    }
    inputField.style.display="none";
    labelName.style.display="none";
    openingText.style.display="none";
  }
});

    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const openGame = document.getElementById('game');
    const openTimeline = document.getElementById('timeline');
    const openGrievance = document.getElementById('grievance');
    // Open popup
    openGrievance.addEventListener('click', function(event) {
        if(sessionStorage.getItem('quizWin') !== "true"){
            event.preventDefault();
            popup.style.display = 'flex';
        }
    });
    openGame.addEventListener('click', function(event) {
        if(sessionStorage.getItem('quizWin') !== "true"){
            event.preventDefault();
            popup.style.display = 'flex';
        }
    });
    openTimeline.addEventListener('click', function(event) {
        if(sessionStorage.getItem('quizWin') !== "true"){
            event.preventDefault();
            popup.style.display = 'flex';
        }
    });

    // Close popup
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Close when clicking outside content
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    });

