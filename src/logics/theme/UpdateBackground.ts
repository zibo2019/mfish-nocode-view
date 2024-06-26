import { colorIsDark, lighten, darken } from "/@/utils/Color";
import { useAppStore } from "/@/store/modules/App";
import { ThemeEnum } from "/@/enums/AppEnum";
import { setCssVar } from "./Util";
import { MenuTypeEnum } from "/@/enums/MenuEnum";

const HEADER_BG_COLOR_VAR = "--header-bg-color";
const HEADER_COLOR = "--header-color";
const HEADER_BG_HOVER_COLOR_VAR = "--header-bg-hover-color";
const HEADER_ACTIVE_MENU_BG_COLOR_VAR = "--header-active-menu-bg-color";

const SIDER_DARK_BG_COLOR = "--sider-dark-bg-color";
const SIDER_DARK_DARKEN_BG_COLOR = "--sider-dark-darken-bg-color";
const SIDER_LIGHTEN_BG_COLOR = "--sider-dark-lighten-bg-color";

/**
 * Change the background color of the top header
 * @param color
 */
export function updateHeaderBgColor(color?: string) {
  const appStore = useAppStore();
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    color = appStore.getHeaderSetting.bgColor;
  }
  if (darkMode) {
    color = "#151515";
  }
  // bg color
  setCssVar(HEADER_BG_COLOR_VAR, color);

  // hover color
  const hoverColor = lighten(color!, 6);
  setCssVar(HEADER_BG_HOVER_COLOR_VAR, hoverColor);
  setCssVar(HEADER_ACTIVE_MENU_BG_COLOR_VAR, hoverColor);

  // Determine the depth of the color value and automatically switch the theme
  const isDark = colorIsDark(color!);
  if (appStore.getMenuSetting.type === MenuTypeEnum.TOP_MENU || appStore.getMenuSetting.type === MenuTypeEnum.MIX) {
    //为头部菜单时强制设置字体颜色，判断当前背景为深色时候设置浅色字体
    if (isDark) {
      setCssVar(HEADER_COLOR, "white");
    } else {
      setCssVar(HEADER_COLOR, "black");
    }
  }
  appStore.setProjectConfig({
    headerSetting: {
      theme: isDark || darkMode ? ThemeEnum.DARK : ThemeEnum.LIGHT
    }
  });
}

/**
 * Change the background color of the left menu
 * @param color  bg color
 */
export function updateSidebarBgColor(color?: string) {
  const appStore = useAppStore();
  const darkMode = appStore.getDarkMode === ThemeEnum.DARK;
  if (!color) {
    color = appStore.getMenuSetting.bgColor;
  }
  if (darkMode) {
    color = "#212121";
  }
  setCssVar(SIDER_DARK_BG_COLOR, color);
  setCssVar(SIDER_DARK_DARKEN_BG_COLOR, darken(color!, 6));
  setCssVar(SIDER_LIGHTEN_BG_COLOR, lighten(color!, 5));
  const isLight = !colorIsDark(color);
  //如果是亮色且不是深色模式，皮肤设置为亮
  appStore.setProjectConfig({
    menuSetting: {
      theme: isLight && !darkMode ? ThemeEnum.LIGHT : ThemeEnum.DARK
    }
  });
}
