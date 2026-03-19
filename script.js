function updateTime() {
    var currentTime = new Date().toLocaleTimeString(undefined, {
        hour12: false
    })
    var timeText = document.querySelector("#timeElement")

    timeText.innerHTML = currentTime
}
setInterval(updateTime,1000)