import { generateAntColors, primaryColor } from "../config/ThemeConfig";
// start(ant3使用属性)
// import { getThemeVariables } from "ant-design-vue/dist/theme";
// end
import { theme } from "ant-design-vue";
import convertLegacyToken from "ant-design-vue/lib/theme/convertLegacyToken";
import { resolve } from "path";
const { defaultAlgorithm, defaultSeed } = theme;
/**
 * less global variable
 */
export function generateModifyVars(dark = false) {
  console.log(dark, "更新ant4后属性暂时不需要，先保留");
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];
  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  // start(ant3使用属性)
  // const modifyVars = getThemeVariables({ dark });
  // end
  const mapToken = defaultAlgorithm(defaultSeed);
  const v3Token = convertLegacyToken(mapToken);
  return {
    // Used for global import to avoid the need to import each style file separately
    // reference:  Avoid repeated references
    // start(ant3使用属性)
    // ...modifyVars,
    // hack: `${modifyVars.hack} @import (reference) "${resolve("src/design/config.less")}";`,
    // end
    ...v3Token,
    hack: `true; @import (reference) "${resolve("src/design/config.less")}";`,
    "primary-color": primary,
    ...primaryColorObj,
    "info-color": primary,
    "processing-color": primary,
    "success-color": "#55D187", //  Success color
    "error-color": "#ED6F6F", //  False color
    "warning-color": "#EFBD47", //   Warning color
    //'border-color-base': '#EEEEEE',
    "font-size-base": "14px", //  Main font size
    "border-radius-base": "2px", //  Component/float fillet
    "link-color": primary, //   Link color
    "app-content-background": "#fafafa" //   Link color
  };
}
