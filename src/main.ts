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
}`
    document.head.appendChild(style);
}
plugin.onLoad(() => {
    addStylesheet();
})