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
}`;
    document.head.appendChild(style);
  }
  plugin.onLoad(() => {
    addStylesheet();
  });
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL3VpL2NvbmZpZy50c3giLCAiLi4vc3JjL21haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiBDb25maWcoKXtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGgxPkJldHRlck5DTSBQbHVnaW4gQ29uZmlnPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIClcclxufSIsICJpbXBvcnQgeyBDb25maWcgfSBmcm9tIFwiLi91aS9jb25maWdcIjtcclxuXHJcbnBsdWdpbi5vbkNvbmZpZygoKSA9PiB7XHJcbiAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIFJlYWN0RE9NLnJlbmRlcihDb25maWcoKSwgZWxlbWVudCk7XHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufSlcclxuZnVuY3Rpb24gYWRkU3R5bGVzaGVldCgpIHtcclxuICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG4gICAgc3R5bGUudGV4dENvbnRlbnQgPSBgI3BhZ2VfcGNfc29uZ2xpc3Rfc29uZ2Zsb3cgbGkuai1pdGVtIHtcclxuICAgIGhlaWdodDogYXV0bztcclxufWBcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG59XHJcbnBsdWdpbi5vbkxvYWQoKCkgPT4ge1xyXG4gICAgYWRkU3R5bGVzaGVldCgpO1xyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7O0FBQU8sV0FBUyxTQUFRO0FBQ3BCLFdBQ0ksa0JBQUMsYUFDRyxrQkFBQyxZQUFHLHlCQUF1QixDQUMvQjtBQUFBLEVBRVI7OztBQ0pBLFNBQU8sU0FBUyxNQUFNO0FBQ2xCLFVBQU0sVUFBVSxTQUFTLGNBQWMsS0FBSztBQUM1QyxhQUFTLE9BQU8sT0FBTyxHQUFHLE9BQU87QUFDakMsV0FBTztBQUFBLEVBQ1gsQ0FBQztBQUNELFdBQVMsZ0JBQWdCO0FBQ3JCLFVBQU0sUUFBUSxTQUFTLGNBQWMsT0FBTztBQUM1QyxVQUFNLGNBQWM7QUFBQTtBQUFBO0FBR3BCLGFBQVMsS0FBSyxZQUFZLEtBQUs7QUFBQSxFQUNuQztBQUNBLFNBQU8sT0FBTyxNQUFNO0FBQ2hCLGtCQUFjO0FBQUEsRUFDbEIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
