(() => {
  // src/ui/config.tsx
  function Config() {
    return /* @__PURE__ */ h("div", null, /* @__PURE__ */ h("h1", null, "BetterNCM Plugin Config"));
  }

  // src/main.ts
  plugin.onConfig(() => {
    const element = document.createElement("div");
    ReactDOM.render(Config(), element);
    return element;
  });
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
}`;
    document.head.appendChild(style);
  }
  plugin.onLoad(() => {
    addStylesheet();
    document.onkeydown = (e) => {
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        window["blc_listencount"]();
      }
    };
    window["blc_listencount"] = function() {
      let index = 0;
      document.querySelectorAll("#page_pc_songlist_songflow li.j-item:not(.blc-listen-count)").forEach((value) => {
        if (index > 100)
          return;
        index++;
        const songId = value["NE_DAWN_PARAMS"].params.s_songId;
        window["blc_queryRecord"](songId, (data) => {
          if (data.code === 200 && data.data) {
            value.setAttribute("style", `--item-height: ${modifyDOM(value, data)}px;`);
          } else {
            console.error("Failed to fetch listen count for songId:", songId, "Error code:", data.code);
          }
        });
      });
    };
    window["blc_queryRecord"] = function(songId, onfinish) {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `https://interface3.music.163.com/api/content/activity/music/first/listen/info?songId=${songId}`);
      xhr.onreadystatechange = function() {
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
      };
      xhr.send();
    };
    function modifyDOM(li, data) {
      let offsetHeight = 50;
      if (!data.data || Object.keys(data.data).length === 0)
        return offsetHeight;
      const flow = li.querySelector(".flow");
      li.classList.add("blc-listen-count");
      flow.setAttribute("style", "display: flex; flex-direction: column; ");
      flow.innerHTML = `<div>${flow.innerHTML}</div><div class="listen-count"></div>`;
      const listenDisplayer = flow.querySelector(".listen-count");
      let duration = data.data.musicTotalPlayDto.duration.toString();
      if (duration < 2) {
        const durationStr = flow.querySelector("div.s-fc4");
        const timeComponents = durationStr.textContent.split(":");
        const minutes = parseInt(timeComponents[0]);
        const seconds = parseInt(timeComponents[1]);
        const songDurationInMinutes = minutes + seconds / 60;
        const playCount = data.data.musicTotalPlayDto.playCount;
        duration = Math.round(songDurationInMinutes * playCount).toString() + "*";
      }
      let text = `\u9996\u6B21\u6536\u542C:${data.data.musicFirstListenDto.date}; \u542C\u6B4C\u6B21\u6570\uFF1A${data.data.musicTotalPlayDto.playCount}; \u542C\u6B4C\u65F6\u957F\uFF1A${duration}min`;
      offsetHeight = 72;
      if (data.data.musicPlayMostDto && data.data.musicPlayMostDto.date && data.data.musicPlayMostDto.mostPlayedCount) {
        let date = new Date(data.data.musicPlayMostDto.date);
        text += `<br/>\u6700\u591A\u542C\u6B4C\u5929\u6570\uFF1A${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}\uFF0C\u6B21\u6570\uFF1A${data.data.musicPlayMostDto.mostPlayedCount}`;
        offsetHeight = 87;
      }
      listenDisplayer.innerHTML = text;
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3VpL2NvbmZpZy50c3giLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiBDb25maWcoKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgxPkJldHRlck5DTSBQbHVnaW4gQ29uZmlnPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSIsICJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi91aS9jb25maWdcIjtcclxuXHJcbnBsdWdpbi5vbkNvbmZpZygoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIFJlYWN0RE9NLnJlbmRlcihDb25maWcoKSwgZWxlbWVudCk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufSlcclxuZnVuY3Rpb24gYWRkU3R5bGVzaGVldCgpIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBgI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtIHtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtOmJlZm9yZSB7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogNTBweDtcclxufVxyXG5cclxuI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtIC5pY28ge1xyXG4gICAgbWFyZ2luLXRvcDogMTVweDtcclxufVxyXG5cclxuI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtIC50ZHtcclxuICAgIGhlaWdodDogNTBweDtcclxuICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xyXG59XHJcblxyXG4jcGFnZV9wY19zb25nbGlzdF9zb25nZmxvdyBsaS5qLWl0ZW0gLmZtYy1jb3Zlci1jb250YWluZXIsICNwYWdlX3BjX3NvbmdsaXN0X3NvbmdmbG93IGxpLmotaXRlbSAudGl0ICwgI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtIGRpdi5lbGxpcHNpcyAucy1mYzMge1xyXG4gICAgbGluZS1oZWlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbi5saXN0ZW4tY291bnQge1xyXG4gICAgY29sb3I6IHJnYmEodmFyKC0tbWQtYWNjZW50LWNvbG9yLXNlY29uZGFyeS1yZ2IpLCAwLjgpICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogN3B4O1xyXG59YFxyXG5cclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG59XHJcbnBsdWdpbi5vbkxvYWQoKCkgPT4ge1xyXG4gICAgYWRkU3R5bGVzaGVldCgpO1xyXG4gICAgZG9jdW1lbnQub25rZXlkb3duID0gKGUpID0+IHtcclxuICAgICAgICBpZiAoZS5jdHJsS2V5ICYmIGUua2V5ID09PSAndScpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB3aW5kb3dbXCJibGNfbGlzdGVuY291bnRcIl0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB3aW5kb3dbXCJibGNfbGlzdGVuY291bnRcIl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcGFnZV9wY19zb25nbGlzdF9zb25nZmxvdyBsaS5qLWl0ZW06bm90KC5ibGMtbGlzdGVuLWNvdW50KVwiKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAxMDApIHJldHVybjtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgY29uc3Qgc29uZ0lkID0gdmFsdWVbXCJORV9EQVdOX1BBUkFNU1wiXS5wYXJhbXMuc19zb25nSWRcclxuICAgICAgICAgICAgd2luZG93W1wiYmxjX3F1ZXJ5UmVjb3JkXCJdKHNvbmdJZCwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT09IDIwMCAmJiBkYXRhLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgLS1pdGVtLWhlaWdodDogJHttb2RpZnlET00odmFsdWUsIGRhdGEpfXB4O2ApXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggbGlzdGVuIGNvdW50IGZvciBzb25nSWQ6XCIsIHNvbmdJZCwgXCJFcnJvciBjb2RlOlwiLCBkYXRhLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1tcImJsY19xdWVyeVJlY29yZFwiXSA9IGZ1bmN0aW9uIChzb25nSWQ6IG51bWJlciwgb25maW5pc2g6ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgYGh0dHBzOi8vaW50ZXJmYWNlMy5tdXNpYy4xNjMuY29tL2FwaS9jb250ZW50L2FjdGl2aXR5L211c2ljL2ZpcnN0L2xpc3Rlbi9pbmZvP3NvbmdJZD0ke3NvbmdJZH1gKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZmluaXNoKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgcmVzcG9uc2U6XCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzOlwiLCB4aHIuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vZGlmeURPTShsaTogRWxlbWVudCwgZGF0YTogYW55KTogbnVtYmVyIHtcclxuXHJcbiAgICAgICAgbGV0IG9mZnNldEhlaWdodCA9IDUwO1xyXG4gICAgICAgIGlmICghZGF0YS5kYXRhIHx8IE9iamVjdC5rZXlzKGRhdGEuZGF0YSkubGVuZ3RoID09PSAwKSByZXR1cm4gb2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGZsb3cgPSBsaS5xdWVyeVNlbGVjdG9yKFwiLmZsb3dcIilcclxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiYmxjLWxpc3Rlbi1jb3VudFwiKTtcclxuICAgICAgICBmbG93LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgXCIpXHJcbiAgICAgICAgZmxvdy5pbm5lckhUTUwgPSBgPGRpdj4ke2Zsb3cuaW5uZXJIVE1MfTwvZGl2PjxkaXYgY2xhc3M9XCJsaXN0ZW4tY291bnRcIj48L2Rpdj5gXHJcbiAgICAgICAgY29uc3QgbGlzdGVuRGlzcGxheWVyID0gZmxvdy5xdWVyeVNlbGVjdG9yKFwiLmxpc3Rlbi1jb3VudFwiKTtcclxuICAgICAgICBsZXQgZHVyYXRpb24gPSBkYXRhLmRhdGEubXVzaWNUb3RhbFBsYXlEdG8uZHVyYXRpb24udG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPCAyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uU3RyID0gZmxvdy5xdWVyeVNlbGVjdG9yKFwiZGl2LnMtZmM0XCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVDb21wb25lbnRzID0gZHVyYXRpb25TdHIudGV4dENvbnRlbnQuc3BsaXQoJzonKVxyXG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gcGFyc2VJbnQodGltZUNvbXBvbmVudHNbMF0pO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gcGFyc2VJbnQodGltZUNvbXBvbmVudHNbMV0pO1xyXG4gICAgICAgICAgICBjb25zdCBzb25nRHVyYXRpb25Jbk1pbnV0ZXMgPSBtaW51dGVzICsgc2Vjb25kcyAvIDYwO1xyXG4gICAgICAgICAgICBjb25zdCBwbGF5Q291bnQgPSBkYXRhLmRhdGEubXVzaWNUb3RhbFBsYXlEdG8ucGxheUNvdW50O1xyXG4gICAgICAgICAgICBkdXJhdGlvbiA9IE1hdGgucm91bmQoc29uZ0R1cmF0aW9uSW5NaW51dGVzICogcGxheUNvdW50KS50b1N0cmluZygpICsgXCIqXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0ZXh0ID0gYFx1OTk5Nlx1NkIyMVx1NjUzNlx1NTQyQzoke2RhdGEuZGF0YS5tdXNpY0ZpcnN0TGlzdGVuRHRvLmRhdGV9OyBcdTU0MkNcdTZCNENcdTZCMjFcdTY1NzBcdUZGMUEke2RhdGEuZGF0YS5tdXNpY1RvdGFsUGxheUR0by5wbGF5Q291bnR9OyBcdTU0MkNcdTZCNENcdTY1RjZcdTk1N0ZcdUZGMUEke2R1cmF0aW9ufW1pbmBcclxuICAgICAgICBvZmZzZXRIZWlnaHQgPSA3MjtcclxuICAgICAgICBpZiAoZGF0YS5kYXRhLm11c2ljUGxheU1vc3REdG8gJiYgZGF0YS5kYXRhLm11c2ljUGxheU1vc3REdG8uZGF0ZSAmJiBkYXRhLmRhdGEubXVzaWNQbGF5TW9zdER0by5tb3N0UGxheWVkQ291bnQpIHtcclxuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShkYXRhLmRhdGEubXVzaWNQbGF5TW9zdER0by5kYXRlKTtcclxuICAgICAgICAgICAgdGV4dCArPSBgPGJyLz5cdTY3MDBcdTU5MUFcdTU0MkNcdTZCNENcdTU5MjlcdTY1NzBcdUZGMUEke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtkYXRlLmdldE1vbnRoKCkgKyAxfS0ke2RhdGUuZ2V0RGF0ZSgpfVx1RkYwQ1x1NkIyMVx1NjU3MFx1RkYxQSR7ZGF0YS5kYXRhLm11c2ljUGxheU1vc3REdG8ubW9zdFBsYXllZENvdW50fWA7XHJcbiAgICAgICAgICAgIG9mZnNldEhlaWdodCA9IDg3O1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0ZW5EaXNwbGF5ZXIuaW5uZXJIVE1MID0gdGV4dDtcclxuICAgIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiOztBQUFPLFdBQVMsU0FBUTtBQUNwQixXQUNJLGtCQUFDLGFBQ0csa0JBQUMsWUFBRyx5QkFBdUIsQ0FDL0I7QUFBQSxFQUVSOzs7QUNKQSxTQUFPLFNBQVMsTUFBTTtBQUNsQixVQUFNLFVBQVUsU0FBUyxjQUFjLEtBQUs7QUFDNUMsYUFBUyxPQUFPLE9BQU8sR0FBRyxPQUFPO0FBQ2pDLFdBQU87QUFBQSxFQUNYLENBQUM7QUFDRCxXQUFTLGdCQUFnQjtBQUNyQixVQUFNLFFBQVEsU0FBUyxjQUFjLE9BQU87QUFDNUMsVUFBTSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEyQnBCLGFBQVMsS0FBSyxZQUFZLEtBQUs7QUFBQSxFQUNuQztBQUNBLFNBQU8sT0FBTyxNQUFNO0FBQ2hCLGtCQUFjO0FBQ2QsYUFBUyxZQUFZLENBQUMsTUFBTTtBQUN4QixVQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsS0FBSztBQUM1QixVQUFFLGVBQWU7QUFDakIsZUFBTyxpQkFBaUIsRUFBRTtBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUNBLFdBQU8saUJBQWlCLElBQUksV0FBWTtBQUNwQyxVQUFJLFFBQVE7QUFDWixlQUFTLGlCQUFpQiw2REFBNkQsRUFBRSxRQUFRLENBQUMsVUFBVTtBQUN4RyxZQUFJLFFBQVE7QUFBSztBQUNqQjtBQUNBLGNBQU0sU0FBUyxNQUFNLGdCQUFnQixFQUFFLE9BQU87QUFDOUMsZUFBTyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsU0FBUztBQUN4QyxjQUFJLEtBQUssU0FBUyxPQUFPLEtBQUssTUFBTTtBQUNoQyxrQkFBTSxhQUFhLFNBQVMsa0JBQWtCLFVBQVUsT0FBTyxJQUFJLE1BQU07QUFBQSxVQUM3RSxPQUFPO0FBQ0gsb0JBQVEsTUFBTSw0Q0FBNEMsUUFBUSxlQUFlLEtBQUssSUFBSTtBQUFBLFVBQzlGO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDTDtBQUVBLFdBQU8saUJBQWlCLElBQUksU0FBVSxRQUFnQixVQUFnQztBQUNsRixZQUFNLE1BQU0sSUFBSSxlQUFlO0FBQy9CLFVBQUksS0FBSyxPQUFPLHdGQUF3RixRQUFRO0FBQ2hILFVBQUkscUJBQXFCLFdBQVk7QUFDakMsWUFBSSxJQUFJLGVBQWUsR0FBRztBQUN0QixjQUFJLElBQUksV0FBVyxLQUFLO0FBQ3BCLGdCQUFJO0FBQ0Esb0JBQU0sV0FBVyxLQUFLLE1BQU0sSUFBSSxZQUFZO0FBQzVDLHVCQUFTLFFBQVE7QUFBQSxZQUNyQixTQUFTLEdBQVA7QUFDRSxzQkFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQUEsWUFDaEQ7QUFBQSxVQUNKLE9BQU87QUFDSCxvQkFBUSxNQUFNLCtCQUErQixJQUFJLE1BQU07QUFBQSxVQUMzRDtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQ0EsVUFBSSxLQUFLO0FBQUEsSUFDYjtBQUVBLGFBQVMsVUFBVSxJQUFhLE1BQW1CO0FBRS9DLFVBQUksZUFBZTtBQUNuQixVQUFJLENBQUMsS0FBSyxRQUFRLE9BQU8sS0FBSyxLQUFLLElBQUksRUFBRSxXQUFXO0FBQUcsZUFBTztBQUM5RCxZQUFNLE9BQU8sR0FBRyxjQUFjLE9BQU87QUFDckMsU0FBRyxVQUFVLElBQUksa0JBQWtCO0FBQ25DLFdBQUssYUFBYSxTQUFTLHlDQUF5QztBQUNwRSxXQUFLLFlBQVksUUFBUSxLQUFLO0FBQzlCLFlBQU0sa0JBQWtCLEtBQUssY0FBYyxlQUFlO0FBQzFELFVBQUksV0FBVyxLQUFLLEtBQUssa0JBQWtCLFNBQVMsU0FBUztBQUM3RCxVQUFJLFdBQVcsR0FBRztBQUNkLGNBQU0sY0FBYyxLQUFLLGNBQWMsV0FBVztBQUNsRCxjQUFNLGlCQUFpQixZQUFZLFlBQVksTUFBTSxHQUFHO0FBQ3hELGNBQU0sVUFBVSxTQUFTLGVBQWUsQ0FBQyxDQUFDO0FBQzFDLGNBQU0sVUFBVSxTQUFTLGVBQWUsQ0FBQyxDQUFDO0FBQzFDLGNBQU0sd0JBQXdCLFVBQVUsVUFBVTtBQUNsRCxjQUFNLFlBQVksS0FBSyxLQUFLLGtCQUFrQjtBQUM5QyxtQkFBVyxLQUFLLE1BQU0sd0JBQXdCLFNBQVMsRUFBRSxTQUFTLElBQUk7QUFBQSxNQUMxRTtBQUNBLFVBQUksT0FBTyw0QkFBUSxLQUFLLEtBQUssb0JBQW9CLHVDQUFjLEtBQUssS0FBSyxrQkFBa0IsNENBQW1CO0FBQzlHLHFCQUFlO0FBQ2YsVUFBSSxLQUFLLEtBQUssb0JBQW9CLEtBQUssS0FBSyxpQkFBaUIsUUFBUSxLQUFLLEtBQUssaUJBQWlCLGlCQUFpQjtBQUM3RyxZQUFJLE9BQU8sSUFBSSxLQUFLLEtBQUssS0FBSyxpQkFBaUIsSUFBSTtBQUNuRCxnQkFBUSxrREFBZSxLQUFLLFlBQVksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssUUFBUSw0QkFBUSxLQUFLLEtBQUssaUJBQWlCO0FBQ3BILHVCQUFlO0FBQUEsTUFDbkI7QUFDQSxzQkFBZ0IsWUFBWTtBQUFBLElBQ2hDO0FBQUEsRUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
