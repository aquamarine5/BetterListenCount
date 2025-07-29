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

.pl-di {
    --item-height: 50px;
}

.m-plylist-pl2 ul .lst {
    --item-height:;
}

.fixed-scroll-management {
    --item-height:;
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
            modifyDOM(value, data);
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
      if (!data.data || Object.keys(data.data).length === 0)
        return;
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
      if (data.data.musicPlayMostDto && data.data.musicPlayMostDto.date && data.data.musicPlayMostDto.mostPlayedCount) {
        let date = new Date(data.data.musicPlayMostDto.date);
        text += `<br/>\u6700\u591A\u542C\u6B4C\u5929\u6570\uFF1A${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}\uFF0C\u6B21\u6570\uFF1A${data.data.musicPlayMostDto.mostPlayedCount}`;
      }
      listenDisplayer.innerHTML = text;
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3VpL2NvbmZpZy50c3giLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiBDb25maWcoKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgxPkJldHRlck5DTSBQbHVnaW4gQ29uZmlnPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSIsICJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi91aS9jb25maWdcIjtcclxuXHJcbnBsdWdpbi5vbkNvbmZpZygoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIFJlYWN0RE9NLnJlbmRlcihDb25maWcoKSwgZWxlbWVudCk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufSlcclxuZnVuY3Rpb24gYWRkU3R5bGVzaGVldCgpIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBgI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtIHtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLnBsLWRpIHtcclxuICAgIC0taXRlbS1oZWlnaHQ6IDUwcHg7XHJcbn1cclxuXHJcbi5tLXBseWxpc3QtcGwyIHVsIC5sc3Qge1xyXG4gICAgLS1pdGVtLWhlaWdodDo7XHJcbn1cclxuXHJcbi5maXhlZC1zY3JvbGwtbWFuYWdlbWVudCB7XHJcbiAgICAtLWl0ZW0taGVpZ2h0OjtcclxufVxyXG5cclxuLmxpc3Rlbi1jb3VudCB7XHJcbiAgICBjb2xvcjogcmdiYSh2YXIoLS1tZC1hY2NlbnQtY29sb3Itc2Vjb25kYXJ5LXJnYiksIDAuOCkgIWltcG9ydGFudDtcclxuICAgIHBhZGRpbmctYm90dG9tOiA3cHg7XHJcbn1gXHJcblxyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcbn1cclxucGx1Z2luLm9uTG9hZCgoKSA9PiB7XHJcbiAgICBhZGRTdHlsZXNoZWV0KCk7XHJcbiAgICBkb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS5rZXkgPT09ICd1Jykge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHdpbmRvd1tcImJsY19saXN0ZW5jb3VudFwiXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdpbmRvd1tcImJsY19saXN0ZW5jb3VudFwiXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNwYWdlX3BjX3NvbmdsaXN0X3NvbmdmbG93IGxpLmotaXRlbTpub3QoLmJsYy1saXN0ZW4tY291bnQpXCIpLmZvckVhY2goKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+IDEwMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBjb25zdCBzb25nSWQgPSB2YWx1ZVtcIk5FX0RBV05fUEFSQU1TXCJdLnBhcmFtcy5zX3NvbmdJZFxyXG4gICAgICAgICAgICB3aW5kb3dbXCJibGNfcXVlcnlSZWNvcmRcIl0oc29uZ0lkLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PT0gMjAwICYmIGRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmeURPTSh2YWx1ZSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggbGlzdGVuIGNvdW50IGZvciBzb25nSWQ6XCIsIHNvbmdJZCwgXCJFcnJvciBjb2RlOlwiLCBkYXRhLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1tcImJsY19xdWVyeVJlY29yZFwiXSA9IGZ1bmN0aW9uIChzb25nSWQ6IG51bWJlciwgb25maW5pc2g6ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgYGh0dHBzOi8vaW50ZXJmYWNlMy5tdXNpYy4xNjMuY29tL2FwaS9jb250ZW50L2FjdGl2aXR5L211c2ljL2ZpcnN0L2xpc3Rlbi9pbmZvP3NvbmdJZD0ke3NvbmdJZH1gKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZmluaXNoKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgcmVzcG9uc2U6XCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzOlwiLCB4aHIuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vZGlmeURPTShsaTogRWxlbWVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmRhdGEgfHwgT2JqZWN0LmtleXMoZGF0YS5kYXRhKS5sZW5ndGggPT09IDApIHJldHVybjtcclxuICAgICAgICBjb25zdCBmbG93ID0gbGkucXVlcnlTZWxlY3RvcihcIi5mbG93XCIpXHJcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImJsYy1saXN0ZW4tY291bnRcIik7XHJcbiAgICAgICAgZmxvdy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IFwiKVxyXG4gICAgICAgIGZsb3cuaW5uZXJIVE1MID0gYDxkaXY+JHtmbG93LmlubmVySFRNTH08L2Rpdj48ZGl2IGNsYXNzPVwibGlzdGVuLWNvdW50XCI+PC9kaXY+YFxyXG4gICAgICAgIGNvbnN0IGxpc3RlbkRpc3BsYXllciA9IGZsb3cucXVlcnlTZWxlY3RvcihcIi5saXN0ZW4tY291bnRcIik7XHJcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gZGF0YS5kYXRhLm11c2ljVG90YWxQbGF5RHRvLmR1cmF0aW9uLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uIDwgMikge1xyXG4gICAgICAgICAgICBjb25zdCBkdXJhdGlvblN0ciA9IGZsb3cucXVlcnlTZWxlY3RvcihcImRpdi5zLWZjNFwiKVxyXG4gICAgICAgICAgICBjb25zdCB0aW1lQ29tcG9uZW50cyA9IGR1cmF0aW9uU3RyLnRleHRDb250ZW50LnNwbGl0KCc6JylcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IHBhcnNlSW50KHRpbWVDb21wb25lbnRzWzBdKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHBhcnNlSW50KHRpbWVDb21wb25lbnRzWzFdKTtcclxuICAgICAgICAgICAgY29uc3Qgc29uZ0R1cmF0aW9uSW5NaW51dGVzID0gbWludXRlcyArIHNlY29uZHMgLyA2MDtcclxuICAgICAgICAgICAgY29uc3QgcGxheUNvdW50ID0gZGF0YS5kYXRhLm11c2ljVG90YWxQbGF5RHRvLnBsYXlDb3VudDtcclxuICAgICAgICAgICAgZHVyYXRpb24gPSBNYXRoLnJvdW5kKHNvbmdEdXJhdGlvbkluTWludXRlcyAqIHBsYXlDb3VudCkudG9TdHJpbmcoKSArIFwiKlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGV4dCA9IGBcdTk5OTZcdTZCMjFcdTY1MzZcdTU0MkM6JHtkYXRhLmRhdGEubXVzaWNGaXJzdExpc3RlbkR0by5kYXRlfTsgXHU1NDJDXHU2QjRDXHU2QjIxXHU2NTcwXHVGRjFBJHtkYXRhLmRhdGEubXVzaWNUb3RhbFBsYXlEdG8ucGxheUNvdW50fTsgXHU1NDJDXHU2QjRDXHU2NUY2XHU5NTdGXHVGRjFBJHtkdXJhdGlvbn1taW5gXHJcbiAgICAgICAgaWYgKGRhdGEuZGF0YS5tdXNpY1BsYXlNb3N0RHRvICYmIGRhdGEuZGF0YS5tdXNpY1BsYXlNb3N0RHRvLmRhdGUgJiYgZGF0YS5kYXRhLm11c2ljUGxheU1vc3REdG8ubW9zdFBsYXllZENvdW50KSB7XHJcbiAgICAgICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoZGF0YS5kYXRhLm11c2ljUGxheU1vc3REdG8uZGF0ZSk7XHJcbiAgICAgICAgICAgIHRleHQgKz0gYDxici8+XHU2NzAwXHU1OTFBXHU1NDJDXHU2QjRDXHU1OTI5XHU2NTcwXHVGRjFBJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7ZGF0ZS5nZXRNb250aCgpICsgMX0tJHtkYXRlLmdldERhdGUoKX1cdUZGMENcdTZCMjFcdTY1NzBcdUZGMUEke2RhdGEuZGF0YS5tdXNpY1BsYXlNb3N0RHRvLm1vc3RQbGF5ZWRDb3VudH1gO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsaXN0ZW5EaXNwbGF5ZXIuaW5uZXJIVE1MID0gdGV4dDtcclxuICAgIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiOztBQUFPLFdBQVMsU0FBUTtBQUNwQixXQUNJLGtCQUFDLGFBQ0csa0JBQUMsWUFBRyx5QkFBdUIsQ0FDL0I7QUFBQSxFQUVSOzs7QUNKQSxTQUFPLFNBQVMsTUFBTTtBQUNsQixVQUFNLFVBQVUsU0FBUyxjQUFjLEtBQUs7QUFDNUMsYUFBUyxPQUFPLE9BQU8sR0FBRyxPQUFPO0FBQ2pDLFdBQU87QUFBQSxFQUNYLENBQUM7QUFDRCxXQUFTLGdCQUFnQjtBQUNyQixVQUFNLFFBQVEsU0FBUyxjQUFjLE9BQU87QUFDNUMsVUFBTSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFxQnBCLGFBQVMsS0FBSyxZQUFZLEtBQUs7QUFBQSxFQUNuQztBQUNBLFNBQU8sT0FBTyxNQUFNO0FBQ2hCLGtCQUFjO0FBQ2QsYUFBUyxZQUFZLENBQUMsTUFBTTtBQUN4QixVQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsS0FBSztBQUM1QixVQUFFLGVBQWU7QUFDakIsZUFBTyxpQkFBaUIsRUFBRTtBQUFBLE1BQzlCO0FBQUEsSUFDSjtBQUNBLFdBQU8saUJBQWlCLElBQUksV0FBWTtBQUNwQyxVQUFJLFFBQVE7QUFDWixlQUFTLGlCQUFpQiw2REFBNkQsRUFBRSxRQUFRLENBQUMsVUFBVTtBQUN4RyxZQUFJLFFBQVE7QUFBSztBQUNqQjtBQUNBLGNBQU0sU0FBUyxNQUFNLGdCQUFnQixFQUFFLE9BQU87QUFDOUMsZUFBTyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsU0FBUztBQUN4QyxjQUFJLEtBQUssU0FBUyxPQUFPLEtBQUssTUFBTTtBQUNoQyxzQkFBVSxPQUFPLElBQUk7QUFBQSxVQUN6QixPQUFPO0FBQ0gsb0JBQVEsTUFBTSw0Q0FBNEMsUUFBUSxlQUFlLEtBQUssSUFBSTtBQUFBLFVBQzlGO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTCxDQUFDO0FBQUEsSUFDTDtBQUVBLFdBQU8saUJBQWlCLElBQUksU0FBVSxRQUFnQixVQUFnQztBQUNsRixZQUFNLE1BQU0sSUFBSSxlQUFlO0FBQy9CLFVBQUksS0FBSyxPQUFPLHdGQUF3RixRQUFRO0FBQ2hILFVBQUkscUJBQXFCLFdBQVk7QUFDakMsWUFBSSxJQUFJLGVBQWUsR0FBRztBQUN0QixjQUFJLElBQUksV0FBVyxLQUFLO0FBQ3BCLGdCQUFJO0FBQ0Esb0JBQU0sV0FBVyxLQUFLLE1BQU0sSUFBSSxZQUFZO0FBQzVDLHVCQUFTLFFBQVE7QUFBQSxZQUNyQixTQUFTLEdBQVA7QUFDRSxzQkFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQUEsWUFDaEQ7QUFBQSxVQUNKLE9BQU87QUFDSCxvQkFBUSxNQUFNLCtCQUErQixJQUFJLE1BQU07QUFBQSxVQUMzRDtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQ0EsVUFBSSxLQUFLO0FBQUEsSUFDYjtBQUVBLGFBQVMsVUFBVSxJQUFhLE1BQVc7QUFDdkMsVUFBSSxDQUFDLEtBQUssUUFBUSxPQUFPLEtBQUssS0FBSyxJQUFJLEVBQUUsV0FBVztBQUFHO0FBQ3ZELFlBQU0sT0FBTyxHQUFHLGNBQWMsT0FBTztBQUNyQyxTQUFHLFVBQVUsSUFBSSxrQkFBa0I7QUFDbkMsV0FBSyxhQUFhLFNBQVMseUNBQXlDO0FBQ3BFLFdBQUssWUFBWSxRQUFRLEtBQUs7QUFDOUIsWUFBTSxrQkFBa0IsS0FBSyxjQUFjLGVBQWU7QUFDMUQsVUFBSSxXQUFXLEtBQUssS0FBSyxrQkFBa0IsU0FBUyxTQUFTO0FBQzdELFVBQUksV0FBVyxHQUFHO0FBQ2QsY0FBTSxjQUFjLEtBQUssY0FBYyxXQUFXO0FBQ2xELGNBQU0saUJBQWlCLFlBQVksWUFBWSxNQUFNLEdBQUc7QUFDeEQsY0FBTSxVQUFVLFNBQVMsZUFBZSxDQUFDLENBQUM7QUFDMUMsY0FBTSxVQUFVLFNBQVMsZUFBZSxDQUFDLENBQUM7QUFDMUMsY0FBTSx3QkFBd0IsVUFBVSxVQUFVO0FBQ2xELGNBQU0sWUFBWSxLQUFLLEtBQUssa0JBQWtCO0FBQzlDLG1CQUFXLEtBQUssTUFBTSx3QkFBd0IsU0FBUyxFQUFFLFNBQVMsSUFBSTtBQUFBLE1BQzFFO0FBQ0EsVUFBSSxPQUFPLDRCQUFRLEtBQUssS0FBSyxvQkFBb0IsdUNBQWMsS0FBSyxLQUFLLGtCQUFrQiw0Q0FBbUI7QUFDOUcsVUFBSSxLQUFLLEtBQUssb0JBQW9CLEtBQUssS0FBSyxpQkFBaUIsUUFBUSxLQUFLLEtBQUssaUJBQWlCLGlCQUFpQjtBQUM3RyxZQUFJLE9BQU8sSUFBSSxLQUFLLEtBQUssS0FBSyxpQkFBaUIsSUFBSTtBQUNuRCxnQkFBUSxrREFBZSxLQUFLLFlBQVksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssUUFBUSw0QkFBUSxLQUFLLEtBQUssaUJBQWlCO0FBQUEsTUFDeEg7QUFDQSxzQkFBZ0IsWUFBWTtBQUFBLElBQ2hDO0FBQUEsRUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
