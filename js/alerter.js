chrome.storage.sync.get({
    refresh_delay: 30000,
    keyword: "warte",
    enable: true
}, settings => {
    if (settings.enable) {
        setTimeout(() => {
            if ($(`*:contains(${settings.keyword})`).length) {
                chrome.runtime.sendMessage({
                    type: "play_sound"
                });
                let toggle = 0;
                setInterval(() => document.title = (++toggle) % 2 ? "!!!!!!!!!!!!!!!!!!!!!!!!!!!" : "DROP DROP DROP DROP", 1000);
            } else {
                setTimeout(() => location.reload(true), settings.refresh_delay);
            }
        }, 1000);
    }
});
