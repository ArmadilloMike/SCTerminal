const editorTextValue = `SOLARI CO. | {DEPARTMENT}
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
const topBar = document.querySelector("#topbar");

function closeWindow(element) {
    element.dataset.prevDisplay = getComputedStyle(element).display;
    element.style.display = "none";
}
let biggestIndex;

function openWindow(element) {
    if (element.id === "quote" || element.id === "edd" || element.id === "orientation" || element.id === "project" || element.id === "anomaly" || element.id === "logistics") {
        element.style.display = "flex";
    } else {
        element.style.display = element.dataset.prevDisplay || "block";
    }

    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

// Add it so windows rise to the top when clicked
biggestIndex = 1;

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

    editor.value = editorTextValue
    const uptimeEl = document.getElementById("welcomeUptime")
    if (uptimeEl) {
        const startedAt = Date.now()

        const formatUptime = () => {
            const totalSeconds = Math.floor((Date.now() - startedAt) / 1000)
            const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0")
            const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0")
            const seconds = String(totalSeconds % 60).padStart(2, "0")
            uptimeEl.textContent = `${hours}h ${minutes}m ${seconds}s`
        }

        formatUptime()
        setInterval(formatUptime, 1000)
    }

})
// new report button
var newReportBut = document.querySelector("#reportNew")
newReportBut.addEventListener("mousedown", () => {
    var editor = document.getElementById("reportEditor")
    var text = editorTextValue
    if (editor.value === text) {
        editor.value = editorTextValue
    } else if (editor.value !== text) {
        var userConfirmed = confirm("There are changes. Are you sure you want to create a new report?")

        if (userConfirmed) {
            editor.value = editorTextValue
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

// terminal window
const terminalOutput = document.getElementById("terminalOutput")
const terminalInput = document.getElementById("terminalInput")

const fileSystem = {
    ".hidden": { 
        type: "text",
        content: "This is a hidden directory"
    },
    ".config": { 
        type: "text",
        content: "Configuration files"
    },
    ".secrets": { 
        type: "text",
        content: "Full list of Solari Co`s Secrets"
    },
    ".archive": { 
        type: "text",
        content: "Old project files"
    },
    ".system_log": { 
        type: "dynamic", 
        title: "SYSTEM LOGS",
        content: "[2026-04-08 15:23:01] System initialized\n[2026-04-08 15:24:15] All subsystems nominal\n[2026-04-08 15:25:42] Cache optimization complete\n[2026-04-08 15:26:08] Security protocols active"
    },
    ".welcome": { 
        type: "window", 
        target: "welcome"
    }
}

function createDynamicWindow(filename, title, content) {
    // create a unique window id
    const windowId = `dynamic_${filename.replace(/[^a-z0-9]/gi, '')}`

    if (document.getElementById(windowId)) {
        const existing = document.getElementById(windowId)
        openWindow(existing)
        return `Window ${filename} already open`
    }

    const newWindow = document.createElement("div")
    newWindow.className = "window"
    newWindow.id = windowId
    newWindow.style.display = "block"
    newWindow.style.position = "absolute"
    newWindow.style.top = "200px"
    newWindow.style.left = "200px"
    // newWindow.style.transform = "translate(-50%, -50%)"
    newWindow.style.transform = "none"
    newWindow.style.zIndex = biggestIndex + 1

    newWindow.innerHTML = `
        <div id="${windowId}header" class="header">
            <p>${title}</p>
            <p style="cursor: pointer;" id="${windowId}close">[X]</p>
        </div>
        <div style="padding: 12px; overflow-y: auto; white-space: pre-wrap; height: 400px; font-size: 12px">
            ${content.replace(/\n/g, '<br>')}
        </div>
    `

    document.body.appendChild(newWindow)

    initializeWindow(windowId)

    biggestIndex++
    newWindow.style.zIndex = biggestIndex
    topBar.style.zIndex = biggestIndex + 1

    return `Executed ${filename} - window opened`
}
function processCommand(command) {
    const args = command.trim().split(" ")
    const cmd = args[0]

    let output = ""

    switch (cmd) {
        case "ls":
            output = Object.keys(fileSystem).join("\n")
            break
        case "cat":
            if (args[1]) {
                const file = fileSystem[args[1]]
                if (file) {
                    if (file.type === "dynamic" || file.type === "window") {
                        output = `[EXECUTABLE] - Use 'run ${args[1]}' to execute`
                    } else {
                        output = file.content
                    }
                } else {
                    output = `File not found ${args[1]}`
                }
            } else {
                output = "Usage: cat [filename]"
            }
            break
        case "run":
            if (args[1]) {
                output = executeFile(args[1])
            } else {
                output = "Usage: run [filename]"
            }
            break
        case "help":
            output = `Available Commands:
ls              - list files
cat [file]      - view file contents
run [file]      - execute a window file
clear           - clear terminal screen
help            - show this help message
            `
            break
        case "clear":
            terminalOutput.innerHTML = ""
            return
        default:
            output = `Command not found ${cmd}`
    }

    terminalOutput.innerHTML += `$ ${command}\n${output}\n\n`
    terminalOutput.scrollTop = terminalOutput.scrollHeight
}
function executeFile(filename) {
    if (!fileSystem[filename]) {
        return `Error: File not found ${filename}`
    }

    const file = fileSystem[filename]

    if (file.type === "window") {
        // Open an existing window
        const windowElement = document.getElementById(file.target)
        if (windowElement) {
            openWindow(windowElement)
            return `Opened ${file.target} window`
        }
        return `Error: Window ${file.target} not found`
    } else if (file.type === "text") {
        return file.content
    } else if (file.type === "dynamic") {
        createDynamicWindow(filename, file.title, file.content)
    }
}

terminalInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const command = terminalInput.value
        if (command) {
            processCommand(command)
            terminalInput.value = ""
        }
    }
})


// helper functions
function makeClosable(element) {
    var openButton = document.querySelector("#" + element.id +"open")
    var closeButton = document.querySelector("#" + element.id +"close")
    
    if (closeButton) {
        closeButton.addEventListener("click", function () {
            closeWindow(element)
        })
    }
    if (openButton) {
        openButton.addEventListener("click", function () {
            openWindow(element)
        })
    }
}
function initializeWindow(element) {
    var screen = document.querySelector("#" + element)
    addWindowTapHandling(screen)
    makeClosable(screen)
    dragElement(screen)
}
function setupSidebarFilters(buttonSelector, groupSelector, showAll=true) {
    var buttons = document.querySelectorAll(buttonSelector)
    var groups = document.querySelectorAll(groupSelector)
    
    if (groups.length > 0) {
        groups.forEach((group, index) => {
            group.style.display = index === 0 ? "block": "none"
        })
    }
    
    buttons.forEach(button => {
        button.addEventListener("click" ,() => {
            var target = button.dataset.target
            if (showAll === true) {
                groups.forEach(group => {
                    if (target === "all" || group.dataset.group === target) {
                        group.style.display = "block"
                    } else {
                        group.style.display = "none"
                    }
                })
            } else {
                groups.forEach(group => {
                    if (group.dataset.group === target) {
                        group.style.display = "block"
                    } else {
                        group.style.display = "none"
                    }
                })
            }
            if (groups.length > 0) {
                groups[0].parentElement.scrollTop = 0;
            }
        })
    })
}


// window creation
initializeWindow("welcome")
initializeWindow("report")
initializeWindow("quote")
initializeWindow("edd")
initializeWindow("orientation")
initializeWindow("project")
initializeWindow("anomaly")
initializeWindow("logistics")
initializeWindow("terminal")

setupSidebarFilters(".quote-filter", ".quote-group", true)
setupSidebarFilters(".edd-filter", ".edd-group", false)
setupSidebarFilters(".ore-filter", ".ore-group", false)
setupSidebarFilters(".project-filter", ".project-group", false)
setupSidebarFilters(".anomaly-filter", ".anomaly-group", false)
setupSidebarFilters(".logistics-filter", ".logistics-group", false)


