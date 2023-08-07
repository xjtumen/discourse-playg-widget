import { apiInitializer } from "discourse/lib/api";
import User from "discourse/models/user";
import DiscourseURL from "discourse/lib/url";

export default apiInitializer("0.11.1", (api) => {
  // If login is required
  if (settings.require_login && !api.getCurrentUser()) {
    return;
  }

  // If a trust level is required
  if (User.currentProp("trust_level") < settings.minimum_trust_level) {
    return;
  }

  // If user must be staff
  if (settings.require_staff && !api.getCurrentUser().staff) {
    return;
  }

  // If user must be a group member
  if (settings.required_groups.length > 0) {
    const requiredGroups = settings.required_groups
      .split("|")
      .map((g) => Number(g));

    const currentUserGroups = api.getCurrentUser().groups.map((g) => g.id);

    if (!currentUserGroups.some((g) => requiredGroups.includes(g))) {
      return;
    }
  }

  api.decorateWidget("header-icons:before", (helper) => {
    const headerState = helper.widget.parentWidget.state;
    return helper.attach("header-dropdown", {
      title: themePrefix("playg_widget.title"),
      icon: "fab-discord",
      active: headerState.playgChatVisible,
      action: "toggleplayg",
      classNames: ["playg-button"],
    });
  });

  api.decorateWidget("header-icons:after", (helper) => {
    const headerState = helper.widget.parentWidget.state;
    if (headerState.playgChatVisible) {
      return [helper.attach("playg-chat-menu")];
    }
  });

  api.attachWidgetAction("header", "toggleplayg", function () {
    if (this.site.mobileView) {
      const playgURLbase = 'https://' + window.location.hostname + '/xjtumen-g/';
      DiscourseURL.redirectAbsolute(playgURLbase);
    } else{
      this.state.playgChatVisible = !this.state.playgChatVisible;
    }
  });
});
