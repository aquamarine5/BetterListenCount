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

#page_pc_songlist_songflow li.j-item:before {
    height: 50px;
    line-height: 50px;
}

#page_pc_songlist_songflow li.j-item .ico {
    margin-top: 15px;
}

#page_pc_songlist_songflow li.j-item .td{
    height: 50px;
    line-height: 40px;
}

#page_pc_songlist_songflow li.j-item .fmc-cover-container, #page_pc_songlist_songflow li.j-item .tit , #page_pc_songlist_songflow li.j-item div.ellipsis .s-fc3 {
    line-height: 40px;
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
            if (index > 100) return;
            index++;
            const songId = value["NE_DAWN_PARAMS"].params.s_songId
            window["blc_queryRecord"](songId, (data) => {
                if (data.code === 200 && data.data) {
                    value.setAttribute("style", `--item-height: ${modifyDOM(value, data)}px;`)
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

    function modifyDOM(li: Element, data: any): number {

        let offsetHeight = 50;
        if (!data.data || Object.keys(data.data).length === 0) return offsetHeight;
        const flow = li.querySelector(".flow")
        li.classList.add("blc-listen-count");
        flow.setAttribute("style", "display: flex; flex-direction: column; ")
        flow.innerHTML = `<div>${flow.innerHTML}</div><div class="listen-count"></div>`
        const listenDisplayer = flow.querySelector(".listen-count");
        let duration = data.data.musicTotalPlayDto.duration.toString();
        if (duration < 2) {
            const durationStr = flow.querySelector("div.s-fc4")
            const timeComponents = durationStr.textContent.split(':')
            const minutes = parseInt(timeComponents[0]);
            const seconds = parseInt(timeComponents[1]);
            const songDurationInMinutes = minutes + seconds / 60;
            const playCount = data.data.musicTotalPlayDto.playCount;
            duration = Math.round(songDurationInMinutes * playCount).toString() + "*";
        }
        let text = `首次收听:${data.data.musicFirstListenDto.date}; 听歌次数：${data.data.musicTotalPlayDto.playCount}; 听歌时长：${duration}min`
        offsetHeight = 72;
        if (data.data.musicPlayMostDto && data.data.musicPlayMostDto.date && data.data.musicPlayMostDto.mostPlayedCount) {
            let date = new Date(data.data.musicPlayMostDto.date);
            text += `<br/>最多听歌天数：${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}，次数：${data.data.musicPlayMostDto.mostPlayedCount}`;
            offsetHeight = 87;
        }
        listenDisplayer.innerHTML = text;
    }
})