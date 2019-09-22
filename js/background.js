let alertSound = new Audio(chrome.runtime.getURL("audio/alert.mp3"));
let sound_active = false;

function play_sound() {
    chrome.storage.sync.get({
        loop: false,
    }, settings => {
        if (sound_active) {
            alertSound.play();
            if (settings.loop) {
                setTimeout(play_sound, 5000);
            } else {
                sound_active = false;
            }
        }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "play_sound") {
        sound_active = true;
        play_sound();
    } else if (request.type == "open_options_page") {
        chrome.runtime.openOptionsPage();
    } else if (request.type == "stop_sound") {
        sound_active = false;
        alertSound.pause();
        alertSound.currentTime = 0;
    } else if (request.type == "reload_pages") {
        chrome.tabs.query({
            url: "https://www.adidas.de/yeezy/*"
        }, tabs => {
            tabs.forEach(tab => chrome.tabs.reload(tab.id, {
                bypassCache: true
            }));
        });
    }
});

chrome.browserAction.onClicked.addListener(() => chrome.tabs.create({
    url: "https://www.adidas.de/yeezy"
}));
