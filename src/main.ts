import { Config } from "./ui/config";

plugin.onConfig(() => {
    const element = document.createElement("div");
    ReactDOM.render(Config(), element);
    return element;
})
function addStylesheet() {
    const style = document.createElement("style");
    style.textContent = `#page_pc_songlist_songflow li.j-item {
    height: auto;
}
    
.listen-count {
    color: rgba(var(--md-accent-color-secondary-rgb), 0.8) !important;
    padding-bottom: 7px;
}`
    document.head.appendChild(style);
}
plugin.onLoad(() => {
    addStylesheet();
    document.onkeydown = (e) => {
        if (e.ctrlKey && e.key === 'u') {
            e.preventDefault();
            window["blc_listencount"]();
        }
    }
    window["blc_listencount"] = function () {
        let index = 0
        document.querySelectorAll("#page_pc_songlist_songflow li.j-item:not(.blc-listen-count)").forEach((value) => {
            if (index > 10) return;
            index++;
            const songId = value["NE_DAWN_PARAMS"].params.s_songId
            window["blc_queryRecord"](songId, (data) => {
                if (data.code === 200 && data.data) {
                    modifyDOM(value, data);
                } else {
                    console.error("Failed to fetch listen count for songId:", songId, "Error code:", data.code);
                }
            });
        })
    }

    window["blc_queryRecord"] = function (songId: number, onfinish: (value: any) => void) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://interface3.music.163.com/api/content/activity/music/first/listen/info?songId=${songId}`);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        onfinish(response);
                    } catch (e) {
                        console.error("Failed to parse response:", e);
                    }
                } else {
                    console.error("Request failed with status:", xhr.status);
                }
            }
        }
        xhr.send();
    }

    function modifyDOM(li: Element, data: any) {
        const flow = li.querySelector(".flow")
        li.classList.add("blc-listen-count");
        flow.setAttribute("style", "display: flex; flex-direction: column; ")
        flow.innerHTML = `<div>${flow.innerHTML}</div><div class="listen-count"></div>`
        const listenDisplayer = flow.querySelector(".listen-count");
        let duration = data.data.musicTotalPlayDto.duration;
        if (duration < 2) {
            const durationStr = flow.querySelector("div.s-fc4")
            const timeComponents = durationStr.textContent.split(':')
            console.log(timeComponents);
            const minutes = parseInt(timeComponents[0]);
            const seconds = parseInt(timeComponents[1]);
            const songDurationInMinutes = minutes + seconds / 60;
            const playCount = data.data.musicTotalPlayDto.playCount;
            duration = Math.round(songDurationInMinutes * playCount);

        }
        listenDisplayer.textContent = `首次收听:${data.data.musicFirstListenDto.date}; 听歌次数：${data.data.musicTotalPlayDto.playCount}; 听歌市场：${duration}min`

    }
})