# BetterListenCount

[![wakatime](https://wakatime.com/badge/user/55ef6b7f-91f7-434b-a743-74ba0005afc1/project/57c15aad-8136-4274-aa63-2524eee79de0.svg)](https://wakatime.com/badge/user/55ef6b7f-91f7-434b-a743-74ba0005afc1/project/57c15aad-8136-4274-aa63-2524eee79de0)

## 作者其他的BetterNCM插件

- [BetterCloudRematcher](https://github.com/aquamarine5/BetterCloudRematcher) 对无版权音乐右击从云盘自动搜索匹配并绑定
- [BetterCloudSearch](https://github.com/aquamarine5/BetterCloudSearch) 直接在搜索页搜索云盘音乐而不用再去云盘进行搜索

## 功能

- 在专辑/歌单内摁下`Ctrl+U`会自动查询歌曲的首次播放时间，播放次数，总播放时长

## 实现

- `blc_listenCount()`:

```js
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
```
