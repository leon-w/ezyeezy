fetch(chrome.runtime.getURL("config.json")).then(response => response.json().then(config => {
    setTimeout(() => {
        if ($(`*:contains(${config.keyword})`).length) {
            console.log("FOUND KEYWORD");
            new Audio(chrome.runtime.getURL("audio/alert.mp3")).play();
            let toggle = 0;
            setInterval(() => {
                document.title = ["!!!!!!!!!!!!!!!!!!!!!!!!!!!", "DROP DROP DROP DROP"][toggle];
                toggle = (toggle + 1) % 2;
            }, 1000);
        } else {
            setTimeout(() => location.reload(true), config.refresh);
        }
    }, 1000);
}));
