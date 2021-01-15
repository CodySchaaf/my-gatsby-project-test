import React from "react"
import { AsyncFonts, FontListener } from "./components"
import { INTERVAL_DEFAULT, MODE_DEFAULT, TIMEOUT_DEFAULT } from "./consts"
import { getFontFiles, getFontNames } from "./utils"

export const wrapRootElement = (
  { element, ...others },
  {
    custom = [],
    web = [],
    enableListener,
    interval = INTERVAL_DEFAULT,
    timeout = TIMEOUT_DEFAULT,
    mode = MODE_DEFAULT,
    ...otherOptions
  }
) => {
  if (mode !== "async") {
    return element
  }
  console.log(others);
  console.log(otherOptions);

  const allFonts = [...custom, ...web]
  const fontFiles = getFontFiles(allFonts)
  const fontNames = getFontNames(allFonts)

  const listenerProps = { fontNames, interval, timeout }

  const hasFontFiles = Boolean(fontFiles.length)
  const hasFontNames = Boolean(fontNames.length)

  return (
    <>
      {hasFontNames && <AsyncFonts hrefs={fontFiles} />}
      {enableListener && hasFontFiles && <FontListener {...listenerProps} />}
      {element}
    </>
  )
}
