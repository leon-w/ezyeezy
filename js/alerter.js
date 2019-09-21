fetch(chrome.runtime.getURL("config.json")).then(response => response.json().then(config => {
    setTimeout(() => {
        if ($(`*:contains(${config.keyword})`).length) {
            chrome.runtime.sendMessage({type: "play_sound"});
            let toggle = 0;
            setInterval(() => document.title = (++toggle) % 2 ? "!!!!!!!!!!!!!!!!!!!!!!!!!!!" : "DROP DROP DROP DROP", 1000);
        } else {
            setTimeout(() => location.reload(true), config.refresh);
        }
    }, 1000);
}));
