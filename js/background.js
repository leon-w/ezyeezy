let alertSound = new Audio(chrome.runtime.getURL("audio/alert.mp3"));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "play_sound") {
        alertSound.play();
    }
});
