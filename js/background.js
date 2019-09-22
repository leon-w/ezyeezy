let alertSound = new Audio(chrome.runtime.getURL("audio/alert.mp3"));

function play_sound() {
    chrome.storage.sync.get({
        loop: false,
    }, settings => {
        alertSound.play();
        if (settings.loop) {
            setTimeout(play_sound, 5000);
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "play_sound") {
        play_sound();
    }
});
