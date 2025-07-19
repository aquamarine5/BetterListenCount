(() => {
    window["blc_listencount"] = function () {
        document.querySelectorAll("#page_pc_songlist_songflow li.j-item").forEach((value) => {
            const songId = value["NE_DAWN_PARAMS"].params.s_songId
            window["blc_queryRecord"](songId, (data) => {
                if (data.code === 200) {
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
                        console.log(response);
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
        flow.setAttribute("style", "display: flex; flex-direction: column; ")
        flow.innerHTML = `<div>${flow.innerHTML}</div><div class="listen-count"></div>`
        const listenDisplayer = flow.querySelector(".listen-count");
        listenDisplayer.textContent = `首次收听:${data.data.musicFirstListenDto.date}; 听歌次数：${data.data.musicTotalPlayDto.playCount}`
    }
})();