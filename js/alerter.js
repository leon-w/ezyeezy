chrome.storage.sync.get({
    refresh_delay: 30000,
    keyword: "warte",
    enable: true
}, settings => {
    let time_left = settings.refresh_delay;

    $("body").append(`
        <div class='alerter'>
            <div>Bot: <span class="${settings.enable ? "state_active" : "state_disabled"}"></span></div>
            <div id="refresh_time">${settings.enable ? `Refreshing in ${(time_left/1000).toFixed(1)}s` : "Refreshing disabled"}</div>
            <button id="stop_sound">Stop sound</button>
            <a>⚙️</a>
        </div>
    `);

    $(".alerter a").click(() => chrome.runtime.sendMessage({
        type: "open_options_page"
    }));


    if (settings.enable) {
        // reload timer
        let i = setInterval(() => {
            time_left -= 100;
            $("#refresh_time").text(`Refreshing in ${(time_left/1000).toFixed(1)}s`)
            if (time_left <= 0) {
                $("#refresh_time").text("Refreshing...");
                clearInterval(i);
                location.reload(true);
            }
        }, 100)

        // let the page load, then check for keyword
        setTimeout(() => {
            if ($(`*:contains(${settings.keyword})`).length) {
                clearInterval(i);
                $("#refresh_time").text("Drop active")
                chrome.runtime.sendMessage({
                    type: "play_sound"
                });
                let toggle = 0;
                setInterval(() => document.title = (++toggle) % 2 ? "🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨" : "DROP DROP DROP DROP", 1000);

                $("#stop_sound").click(() => chrome.runtime.sendMessage({
                    type: "stop_sound"
                }));
            }
        }, 1000);
    }
});
