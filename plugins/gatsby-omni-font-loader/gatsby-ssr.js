import { MODE_DEFAULT } from "./consts"
import { getFontConfig, getTestFonts } from "./generators"
import { getFontFiles, getFontNames } from "./utils"

export const onRenderBody = (
  { setHeadComponents, setPostBodyComponents, ...others },
  {
    enableListener,
    preconnect = [],
    preload = [],
    web = [],
    custom = [],
    mode = MODE_DEFAULT,
    ...otherOptions
  }
) => {
  console.log(others);
  console.log(otherOptions);
  const allFonts = [...web, ...custom]
  const allPreloads = preload.concat(getFontFiles(allFonts))
  const fontNames = getFontNames(allFonts)

  const preloadConfig = getFontConfig(
    preconnect,
    allPreloads,
    mode === "async" ? [] : allFonts
  )

  if (enableListener && Boolean(allFonts.length) && mode === "async") {
    const testFontConfig = getTestFonts(fontNames)
    setPostBodyComponents(testFontConfig)
  }

  if (preloadConfig && Boolean(preloadConfig.length)) {
    setHeadComponents(preloadConfig)
  }
}
