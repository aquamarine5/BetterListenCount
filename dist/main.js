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
      document.querySelectorAll("#page_pc_songlist_songflow li.j-item").forEach((value) => {
        if (index > 10)
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
      const flow = li.querySelector(".flow");
      flow.setAttribute("style", "display: flex; flex-direction: column; ");
      flow.innerHTML = `<div>${flow.innerHTML}</div><div class="listen-count"></div>`;
      const listenDisplayer = flow.querySelector(".listen-count");
      let duration = data.data.musicTotalPlayDto.duration;
      if (duration < 2) {
        const durationStr = flow.querySelector("div.s-fc4");
        const timeComponents = durationStr.textContent.split(":");
        console.log(timeComponents);
        const minutes = parseInt(timeComponents[0]);
        const seconds = parseInt(timeComponents[1]);
        const songDurationInMinutes = minutes + seconds / 60;
        const playCount = data.data.musicTotalPlayDto.playCount;
        duration = Math.round(songDurationInMinutes * playCount);
      }
      listenDisplayer.textContent = `\u9996\u6B21\u6536\u542C:${data.data.musicFirstListenDto.date}; \u542C\u6B4C\u6B21\u6570\uFF1A${data.data.musicTotalPlayDto.playCount}; \u542C\u6B4C\u5E02\u573A\uFF1A${duration}min`;
      li.classList.add("blc-listen-count");
    }
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3VpL2NvbmZpZy50c3giLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiBDb25maWcoKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgxPkJldHRlck5DTSBQbHVnaW4gQ29uZmlnPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSIsICJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi91aS9jb25maWdcIjtcclxuXHJcbnBsdWdpbi5vbkNvbmZpZygoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIFJlYWN0RE9NLnJlbmRlcihDb25maWcoKSwgZWxlbWVudCk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufSlcclxuZnVuY3Rpb24gYWRkU3R5bGVzaGVldCgpIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBgI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtIHtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG4gICAgXHJcbi5saXN0ZW4tY291bnQge1xyXG4gICAgY29sb3I6IHJnYmEodmFyKC0tbWQtYWNjZW50LWNvbG9yLXNlY29uZGFyeS1yZ2IpLCAwLjgpICFpbXBvcnRhbnQ7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogN3B4O1xyXG59YFxyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XHJcbn1cclxucGx1Z2luLm9uTG9hZCgoKSA9PiB7XHJcbiAgICBhZGRTdHlsZXNoZWV0KCk7XHJcbiAgICBkb2N1bWVudC5vbmtleWRvd24gPSAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLmN0cmxLZXkgJiYgZS5rZXkgPT09ICd1Jykge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHdpbmRvd1tcImJsY19saXN0ZW5jb3VudFwiXSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHdpbmRvd1tcImJsY19saXN0ZW5jb3VudFwiXSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNwYWdlX3BjX3NvbmdsaXN0X3NvbmdmbG93IGxpLmotaXRlbVwiKS5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPiAxMCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBjb25zdCBzb25nSWQgPSB2YWx1ZVtcIk5FX0RBV05fUEFSQU1TXCJdLnBhcmFtcy5zX3NvbmdJZFxyXG4gICAgICAgICAgICB3aW5kb3dbXCJibGNfcXVlcnlSZWNvcmRcIl0oc29uZ0lkLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuY29kZSA9PT0gMjAwICYmIGRhdGEuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmeURPTSh2YWx1ZSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggbGlzdGVuIGNvdW50IGZvciBzb25nSWQ6XCIsIHNvbmdJZCwgXCJFcnJvciBjb2RlOlwiLCBkYXRhLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1tcImJsY19xdWVyeVJlY29yZFwiXSA9IGZ1bmN0aW9uIChzb25nSWQ6IG51bWJlciwgb25maW5pc2g6ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgYGh0dHBzOi8vaW50ZXJmYWNlMy5tdXNpYy4xNjMuY29tL2FwaS9jb250ZW50L2FjdGl2aXR5L211c2ljL2ZpcnN0L2xpc3Rlbi9pbmZvP3NvbmdJZD0ke3NvbmdJZH1gKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZmluaXNoKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gcGFyc2UgcmVzcG9uc2U6XCIsIGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzOlwiLCB4aHIuc3RhdHVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG1vZGlmeURPTShsaTogRWxlbWVudCwgZGF0YTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgZmxvdyA9IGxpLnF1ZXJ5U2VsZWN0b3IoXCIuZmxvd1wiKVxyXG4gICAgICAgIGZsb3cuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBcIilcclxuICAgICAgICBmbG93LmlubmVySFRNTCA9IGA8ZGl2PiR7Zmxvdy5pbm5lckhUTUx9PC9kaXY+PGRpdiBjbGFzcz1cImxpc3Rlbi1jb3VudFwiPjwvZGl2PmBcclxuICAgICAgICBjb25zdCBsaXN0ZW5EaXNwbGF5ZXIgPSBmbG93LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdGVuLWNvdW50XCIpO1xyXG4gICAgICAgIGxldCBkdXJhdGlvbiA9IGRhdGEuZGF0YS5tdXNpY1RvdGFsUGxheUR0by5kdXJhdGlvbjtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPCAyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uU3RyID0gZmxvdy5xdWVyeVNlbGVjdG9yKFwiZGl2LnMtZmM0XCIpXHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVDb21wb25lbnRzID0gZHVyYXRpb25TdHIudGV4dENvbnRlbnQuc3BsaXQoJzonKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aW1lQ29tcG9uZW50cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBwYXJzZUludCh0aW1lQ29tcG9uZW50c1swXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSBwYXJzZUludCh0aW1lQ29tcG9uZW50c1sxXSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNvbmdEdXJhdGlvbkluTWludXRlcyA9IG1pbnV0ZXMgKyBzZWNvbmRzIC8gNjA7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYXlDb3VudCA9IGRhdGEuZGF0YS5tdXNpY1RvdGFsUGxheUR0by5wbGF5Q291bnQ7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uID0gTWF0aC5yb3VuZChzb25nRHVyYXRpb25Jbk1pbnV0ZXMgKiBwbGF5Q291bnQpO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGlzdGVuRGlzcGxheWVyLnRleHRDb250ZW50ID0gYFx1OTk5Nlx1NkIyMVx1NjUzNlx1NTQyQzoke2RhdGEuZGF0YS5tdXNpY0ZpcnN0TGlzdGVuRHRvLmRhdGV9OyBcdTU0MkNcdTZCNENcdTZCMjFcdTY1NzBcdUZGMUEke2RhdGEuZGF0YS5tdXNpY1RvdGFsUGxheUR0by5wbGF5Q291bnR9OyBcdTU0MkNcdTZCNENcdTVFMDJcdTU3M0FcdUZGMUEke2R1cmF0aW9ufW1pbmBcclxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiYmxjLWxpc3Rlbi1jb3VudFwiKTtcclxuICAgIH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiOztBQUFPLFdBQVMsU0FBUTtBQUNwQixXQUNJLGtCQUFDLGFBQ0csa0JBQUMsWUFBRyx5QkFBdUIsQ0FDL0I7QUFBQSxFQUVSOzs7QUNKQSxTQUFPLFNBQVMsTUFBTTtBQUNsQixVQUFNLFVBQVUsU0FBUyxjQUFjLEtBQUs7QUFDNUMsYUFBUyxPQUFPLE9BQU8sR0FBRyxPQUFPO0FBQ2pDLFdBQU87QUFBQSxFQUNYLENBQUM7QUFDRCxXQUFTLGdCQUFnQjtBQUNyQixVQUFNLFFBQVEsU0FBUyxjQUFjLE9BQU87QUFDNUMsVUFBTSxjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRcEIsYUFBUyxLQUFLLFlBQVksS0FBSztBQUFBLEVBQ25DO0FBQ0EsU0FBTyxPQUFPLE1BQU07QUFDaEIsa0JBQWM7QUFDZCxhQUFTLFlBQVksQ0FBQyxNQUFNO0FBQ3hCLFVBQUksRUFBRSxXQUFXLEVBQUUsUUFBUSxLQUFLO0FBQzVCLFVBQUUsZUFBZTtBQUNqQixlQUFPLGlCQUFpQixFQUFFO0FBQUEsTUFDOUI7QUFBQSxJQUNKO0FBQ0EsV0FBTyxpQkFBaUIsSUFBSSxXQUFZO0FBQ3BDLFVBQUksUUFBUTtBQUNaLGVBQVMsaUJBQWlCLHNDQUFzQyxFQUFFLFFBQVEsQ0FBQyxVQUFVO0FBQ2pGLFlBQUksUUFBUTtBQUFJO0FBQ2hCO0FBQ0EsY0FBTSxTQUFTLE1BQU0sZ0JBQWdCLEVBQUUsT0FBTztBQUM5QyxlQUFPLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxTQUFTO0FBQ3hDLGNBQUksS0FBSyxTQUFTLE9BQU8sS0FBSyxNQUFNO0FBQ2hDLHNCQUFVLE9BQU8sSUFBSTtBQUFBLFVBQ3pCLE9BQU87QUFDSCxvQkFBUSxNQUFNLDRDQUE0QyxRQUFRLGVBQWUsS0FBSyxJQUFJO0FBQUEsVUFDOUY7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMLENBQUM7QUFBQSxJQUNMO0FBRUEsV0FBTyxpQkFBaUIsSUFBSSxTQUFVLFFBQWdCLFVBQWdDO0FBQ2xGLFlBQU0sTUFBTSxJQUFJLGVBQWU7QUFDL0IsVUFBSSxLQUFLLE9BQU8sd0ZBQXdGLFFBQVE7QUFDaEgsVUFBSSxxQkFBcUIsV0FBWTtBQUNqQyxZQUFJLElBQUksZUFBZSxHQUFHO0FBQ3RCLGNBQUksSUFBSSxXQUFXLEtBQUs7QUFDcEIsZ0JBQUk7QUFDQSxvQkFBTSxXQUFXLEtBQUssTUFBTSxJQUFJLFlBQVk7QUFDNUMsdUJBQVMsUUFBUTtBQUFBLFlBQ3JCLFNBQVMsR0FBUDtBQUNFLHNCQUFRLE1BQU0sNkJBQTZCLENBQUM7QUFBQSxZQUNoRDtBQUFBLFVBQ0osT0FBTztBQUNILG9CQUFRLE1BQU0sK0JBQStCLElBQUksTUFBTTtBQUFBLFVBQzNEO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFDQSxVQUFJLEtBQUs7QUFBQSxJQUNiO0FBRUEsYUFBUyxVQUFVLElBQWEsTUFBVztBQUN2QyxZQUFNLE9BQU8sR0FBRyxjQUFjLE9BQU87QUFDckMsV0FBSyxhQUFhLFNBQVMseUNBQXlDO0FBQ3BFLFdBQUssWUFBWSxRQUFRLEtBQUs7QUFDOUIsWUFBTSxrQkFBa0IsS0FBSyxjQUFjLGVBQWU7QUFDMUQsVUFBSSxXQUFXLEtBQUssS0FBSyxrQkFBa0I7QUFDM0MsVUFBSSxXQUFXLEdBQUc7QUFDZCxjQUFNLGNBQWMsS0FBSyxjQUFjLFdBQVc7QUFDbEQsY0FBTSxpQkFBaUIsWUFBWSxZQUFZLE1BQU0sR0FBRztBQUN4RCxnQkFBUSxJQUFJLGNBQWM7QUFDMUIsY0FBTSxVQUFVLFNBQVMsZUFBZSxDQUFDLENBQUM7QUFDMUMsY0FBTSxVQUFVLFNBQVMsZUFBZSxDQUFDLENBQUM7QUFDMUMsY0FBTSx3QkFBd0IsVUFBVSxVQUFVO0FBQ2xELGNBQU0sWUFBWSxLQUFLLEtBQUssa0JBQWtCO0FBQzlDLG1CQUFXLEtBQUssTUFBTSx3QkFBd0IsU0FBUztBQUFBLE1BRTNEO0FBQ0Esc0JBQWdCLGNBQWMsNEJBQVEsS0FBSyxLQUFLLG9CQUFvQix1Q0FBYyxLQUFLLEtBQUssa0JBQWtCLDRDQUFtQjtBQUNqSSxTQUFHLFVBQVUsSUFBSSxrQkFBa0I7QUFBQSxJQUN2QztBQUFBLEVBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
