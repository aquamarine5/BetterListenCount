(() => {
  // src/startup_script.ts
  (() => {
    window["blc_listencount"] = function() {
      document.querySelectorAll("#page_pc_songlist_songflow li.j-item").forEach((value) => {
        const songId = value["NE_DAWN_PARAMS"].params.s_songId;
        window["blc_queryRecord"](songId, (data) => {
          if (data.code === 200) {
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
              console.log(response);
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
      listenDisplayer.textContent = `\u9996\u6B21\u6536\u542C:${data.data.musicFirstListenDto.date}; \u542C\u6B4C\u6B21\u6570\uFF1A${data.data.musicTotalPlayDto.playCount}`;
    }
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3N0YXJ0dXBfc2NyaXB0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIoKCkgPT4ge1xyXG4gICAgd2luZG93W1wiYmxjX2xpc3RlbmNvdW50XCJdID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcGFnZV9wY19zb25nbGlzdF9zb25nZmxvdyBsaS5qLWl0ZW1cIikuZm9yRWFjaCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc29uZ0lkID0gdmFsdWVbXCJORV9EQVdOX1BBUkFNU1wiXS5wYXJhbXMuc19zb25nSWRcclxuICAgICAgICAgICAgd2luZG93W1wiYmxjX3F1ZXJ5UmVjb3JkXCJdKHNvbmdJZCwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmNvZGUgPT09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmeURPTSh2YWx1ZSwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggbGlzdGVuIGNvdW50IGZvciBzb25nSWQ6XCIsIHNvbmdJZCwgXCJFcnJvciBjb2RlOlwiLCBkYXRhLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvd1tcImJsY19xdWVyeVJlY29yZFwiXSA9IGZ1bmN0aW9uIChzb25nSWQ6IG51bWJlciwgb25maW5pc2g6ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgYGh0dHBzOi8vaW50ZXJmYWNlMy5tdXNpYy4xNjMuY29tL2FwaS9jb250ZW50L2FjdGl2aXR5L211c2ljL2ZpcnN0L2xpc3Rlbi9pbmZvP3NvbmdJZD0ke3NvbmdJZH1gKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25maW5pc2gocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkZhaWxlZCB0byBwYXJzZSByZXNwb25zZTpcIiwgZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXM6XCIsIHhoci5zdGF0dXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW9kaWZ5RE9NKGxpOiBFbGVtZW50LCBkYXRhOiBhbnkpIHtcclxuICAgICAgICBjb25zdCBmbG93ID0gbGkucXVlcnlTZWxlY3RvcihcIi5mbG93XCIpXHJcbiAgICAgICAgZmxvdy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IFwiKVxyXG4gICAgICAgIGZsb3cuaW5uZXJIVE1MID0gYDxkaXY+JHtmbG93LmlubmVySFRNTH08L2Rpdj48ZGl2IGNsYXNzPVwibGlzdGVuLWNvdW50XCI+PC9kaXY+YFxyXG4gICAgICAgIGNvbnN0IGxpc3RlbkRpc3BsYXllciA9IGZsb3cucXVlcnlTZWxlY3RvcihcIi5saXN0ZW4tY291bnRcIik7XHJcbiAgICAgICAgbGlzdGVuRGlzcGxheWVyLnRleHRDb250ZW50ID0gYFx1OTk5Nlx1NkIyMVx1NjUzNlx1NTQyQzoke2RhdGEuZGF0YS5tdXNpY0ZpcnN0TGlzdGVuRHRvLmRhdGV9OyBcdTU0MkNcdTZCNENcdTZCMjFcdTY1NzBcdUZGMUEke2RhdGEuZGF0YS5tdXNpY1RvdGFsUGxheUR0by5wbGF5Q291bnR9YFxyXG4gICAgfVxyXG59KSgpOyJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsR0FBQyxNQUFNO0FBQ0gsV0FBTyxpQkFBaUIsSUFBSSxXQUFZO0FBQ3BDLGVBQVMsaUJBQWlCLHNDQUFzQyxFQUFFLFFBQVEsQ0FBQyxVQUFVO0FBQ2pGLGNBQU0sU0FBUyxNQUFNLGdCQUFnQixFQUFFLE9BQU87QUFDOUMsZUFBTyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsU0FBUztBQUN4QyxjQUFJLEtBQUssU0FBUyxLQUFLO0FBQ25CLHNCQUFVLE9BQU8sSUFBSTtBQUFBLFVBQ3pCLE9BQU87QUFDSCxvQkFBUSxNQUFNLDRDQUE0QyxRQUFRLGVBQWUsS0FBSyxJQUFJO0FBQUEsVUFDOUY7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMLENBQUM7QUFBQSxJQUNMO0FBRUEsV0FBTyxpQkFBaUIsSUFBSSxTQUFVLFFBQWdCLFVBQWdDO0FBQ2xGLFlBQU0sTUFBTSxJQUFJLGVBQWU7QUFDL0IsVUFBSSxLQUFLLE9BQU8sd0ZBQXdGLFFBQVE7QUFDaEgsVUFBSSxxQkFBcUIsV0FBWTtBQUNqQyxZQUFJLElBQUksZUFBZSxHQUFHO0FBQ3RCLGNBQUksSUFBSSxXQUFXLEtBQUs7QUFDcEIsZ0JBQUk7QUFDQSxvQkFBTSxXQUFXLEtBQUssTUFBTSxJQUFJLFlBQVk7QUFDNUMsc0JBQVEsSUFBSSxRQUFRO0FBQ3BCLHVCQUFTLFFBQVE7QUFBQSxZQUNyQixTQUFTLEdBQVA7QUFDRSxzQkFBUSxNQUFNLDZCQUE2QixDQUFDO0FBQUEsWUFDaEQ7QUFBQSxVQUNKLE9BQU87QUFDSCxvQkFBUSxNQUFNLCtCQUErQixJQUFJLE1BQU07QUFBQSxVQUMzRDtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQ0EsVUFBSSxLQUFLO0FBQUEsSUFDYjtBQUVBLGFBQVMsVUFBVSxJQUFhLE1BQVc7QUFDdkMsWUFBTSxPQUFPLEdBQUcsY0FBYyxPQUFPO0FBQ3JDLFdBQUssYUFBYSxTQUFTLHlDQUF5QztBQUNwRSxXQUFLLFlBQVksUUFBUSxLQUFLO0FBQzlCLFlBQU0sa0JBQWtCLEtBQUssY0FBYyxlQUFlO0FBQzFELHNCQUFnQixjQUFjLDRCQUFRLEtBQUssS0FBSyxvQkFBb0IsdUNBQWMsS0FBSyxLQUFLLGtCQUFrQjtBQUFBLElBQ2xIO0FBQUEsRUFDSixHQUFHOyIsCiAgIm5hbWVzIjogW10KfQo=
