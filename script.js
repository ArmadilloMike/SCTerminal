function updateTime() {
    var currentTime = new Date().toLocaleTimeString(undefined, {
        hour12: false
    })
    var timeText = document.querySelector("#timeElement")

    timeText.innerHTML = currentTime
}
setInterval(updateTime,1000)

// Make the DIV element draggable:
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}


// Add opening and closing of windows
var topBar = document.querySelector("#topbar")

function closeWindow(element) {
    element.dataset.prevDisplay = getComputedStyle(element).display;
    element.style.display = "none";
}
function openWindow(element) {
    if (element.id === "quote") {
        element.style.display = "flex";
    } else {
        element.style.display = element.dataset.prevDisplay || "block";
    }

    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

// Add it so windows rise to the top when clicked
var biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}
function handleWindowTap(element) {
    biggestIndex ++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex+1;
}

//report editor functions
// set the starting text of the report editor
window.addEventListener("DOMContentLoaded", () => {
    const editor = document.getElementById("reportEditor")

    editor.value = `SOLARI CO. | {DEPARTMENT}
{TITLE}

Clearance Level: {REQUIRED CLEARANCE LEVEL}
Prepared For: {IF NEEDED}
Compiled By: {TIER-COLOR}
Reference: {INCLUDE IF NEEDED}

{SINGLE SMALL PARAGRAPH SUMMARIZING THE REPORT}

{MAIN BODY}

I. {SECTION I}
Cras ut augue at arcu accumsan congue sit amet non.
Vestibulum pellentesque metus: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis porta pulvinar. Suspendisse potenti. Curabitur maximus massa at congue venenatis.
Donec nec tristique: Aliquam at ultrices nulla. Pellentesque convallis finibus cursus. Integer quis egestas massa. Pellentesque at lobortis enim.

II. {SECTION II}
{ADD MORE SECTIONS IF NEEDED

SOLARI CO.
{QUOTE FROM QUOTE LIST}
    `

})
// new report button
var newReportBut = document.querySelector("#reportNew")
newReportBut.addEventListener("mousedown", () => {
    var editor = document.getElementById("reportEditor")
    var text = `SOLARI CO. | {DEPARTMENT}
{TITLE}

Clearance Level: {REQUIRED CLEARANCE LEVEL}
Prepared For: {IF NEEDED}
Compiled By: {TIER-COLOR}
Reference: {INCLUDE IF NEEDED}

{SINGLE SMALL PARAGRAPH SUMMARIZING THE REPORT}

{MAIN BODY}

I. {SECTION I}
Cras ut augue at arcu accumsan congue sit amet non.
Vestibulum pellentesque metus: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis porta pulvinar. Suspendisse potenti. Curabitur maximus massa at congue venenatis.
Donec nec tristique: Aliquam at ultrices nulla. Pellentesque convallis finibus cursus. Integer quis egestas massa. Pellentesque at lobortis enim.

II. {SECTION II}
{ADD MORE SECTIONS IF NEEDED

SOLARI CO.
{QUOTE FROM QUOTE LIST}
    `
    if (editor.value === text) {
        editor.value = `SOLARI CO. | {DEPARTMENT}
{TITLE}

Clearance Level: {REQUIRED CLEARANCE LEVEL}
Prepared For: {IF NEEDED}
Compiled By: {TIER-COLOR}
Reference: {INCLUDE IF NEEDED}

{SINGLE SMALL PARAGRAPH SUMMARIZING THE REPORT}

{MAIN BODY}

I. {SECTION I}
Cras ut augue at arcu accumsan congue sit amet non.
Vestibulum pellentesque metus: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis porta pulvinar. Suspendisse potenti. Curabitur maximus massa at congue venenatis.
Donec nec tristique: Aliquam at ultrices nulla. Pellentesque convallis finibus cursus. Integer quis egestas massa. Pellentesque at lobortis enim.

II. {SECTION II}
{ADD MORE SECTIONS IF NEEDED

SOLARI CO.
{QUOTE FROM QUOTE LIST}
    `
    } else if (editor.value !== text) {
        var userConfirmed = confirm("There are changes. Are you sure you want to create a new report?")

        if (userConfirmed) {
            editor.value = `SOLARI CO. | {DEPARTMENT}
{TITLE}

Clearance Level: {REQUIRED CLEARANCE LEVEL}
Prepared For: {IF NEEDED}
Compiled By: {TIER-COLOR}
Reference: {INCLUDE IF NEEDED}

{SINGLE SMALL PARAGRAPH SUMMARIZING THE REPORT}

{MAIN BODY}

I. {SECTION I}
Cras ut augue at arcu accumsan congue sit amet non.
Vestibulum pellentesque metus: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis porta pulvinar. Suspendisse potenti. Curabitur maximus massa at congue venenatis.
Donec nec tristique: Aliquam at ultrices nulla. Pellentesque convallis finibus cursus. Integer quis egestas massa. Pellentesque at lobortis enim.

II. {SECTION II}
{ADD MORE SECTIONS IF NEEDED

SOLARI CO.
{QUOTE FROM QUOTE LIST}
    `
        }
    }
})
// save button
document.getElementById("reportSave").addEventListener("click", () => {
    var text = document.getElementById("reportEditor").value
    var blob = new Blob([text], {type: "text/plain"})
    var url = URL.createObjectURL(blob)

    var a = document.createElement("a")
    a.href = url
    a.download = "report.txt"
    a.click()

    URL.revokeObjectURL(url)
})
// open button
document.getElementById('reportOpenFile').addEventListener("change", function (event) {
    var file = event.target.files[0]
    var editor = document.getElementById("reportEditor")
    if (file) {
        const reader = new FileReader()
        reader.onload = function (e) {
            editor.value = e.target.result
        }
        reader.readAsText(file)
    }
})

// quote sections functions
var filters = document.querySelectorAll(".quote-filter")
var groups = document.querySelectorAll(".quote-group")

filters.forEach(button => {
    button.addEventListener("click", () => {
        var target = button.dataset.target
        
        groups.forEach(group => {
            if (target === "all" || group.dataset.group === target) {
                group.style.display = "block";
            } else {
                group.style.display = "none"
            }
        })
    })
})

// helper functions
function makeClosable(element) {
    var openButton = document.querySelector("#" + element.id +"open")
    var closeButton = document.querySelector("#" + element.id +"close")

    closeButton.addEventListener("click", function () {
        closeWindow(element)
    })
    openButton.addEventListener("click", function () {
        openWindow(element)
    })
}
function initializeWindow(element) {
    var screen = document.querySelector("#" + element)
    addWindowTapHandling(screen)
    makeClosable(screen)
    dragElement(screen)
}
initializeWindow("welcome")
initializeWindow("report")
initializeWindow("quote")

//other functions


