import {createWidget} from "discourse/widgets/widget";
import {h} from "virtual-dom";
import panelMessage from "../lib/panel-message";
import getTheme from "../lib/theme";
import DiscourseURL from "discourse/lib/url";

createWidget("playg-chat-menu", {
    tagName: "div.playg-panel",

    html() {
        const playgURLbase = 'https://' + window.location.hostname + '/xjtumen-g/';

        // if (this.site.mobileView) {
        //     return DiscourseURL.routeTo(playgURLbase);
        // }

        return this.attach("menu-panel", {
            contents: () =>
                h("iframe", {
                    src: playgURLbase,
                    sandbox:
                        "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-forms",
                    width: "350",
                    height: "500",
                    allowtransparency: "true",
                    frameborder: "0",
                    id: "chatwidget",
                    name: "chatwidget",
                }),
        });
    },

    clickOutside() {
        this.sendWidgetAction("toggleplayg");
    },
});
