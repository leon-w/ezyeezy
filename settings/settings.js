function save_options() {
    let enable = document.getElementById("cb_enable").checked;
    let refresh_delay = document.getElementById("tb_refresh_delay").value;
    let load_time = document.getElementById("tb_load_time").value;
    let keyword = document.getElementById("tb_keyword").value;
    let loop = document.getElementById("cb_loop").checked;
    chrome.storage.sync.set({
        enable,
        refresh_delay,
        load_time,
        keyword,
        loop
    }, () => {
        chrome.runtime.sendMessage({
            type: "reload_pages"
        });
        document.getElementById("save").innerText = "Saved!";
        setTimeout(() => {
            document.getElementById("save").innerText = "Save";
        }, 1500);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        refresh_delay: 30000,
        load_time: 3000,
        keyword: "warte",
        loop: false,
        enable: true
    }, data => {
        document.getElementById("cb_enable").checked = data.enable;
        document.getElementById("tb_refresh_delay").value = data.refresh_delay;
        document.getElementById("tb_load_time").value = data.load_time;
        document.getElementById("tb_keyword").value = data.keyword;
        document.getElementById("cb_loop").checked = data.loop;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    restore_options();
    document.getElementById("save").addEventListener("click", save_options);
});
