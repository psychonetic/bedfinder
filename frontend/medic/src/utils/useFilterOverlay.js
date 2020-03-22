import React from 'react'

export const FilterOverlayContext = React.createContext({ close: null, open: null, active: false })

export default function FilterOverlayProvider({ children }) {
  const [filterOverlay, setFilterOverlay] = React.useState(false)
  function open() {
    setFilterOverlay(true)
  }

  function close() {
    setFilterOverlay(false)
  }
  return (
    <FilterOverlayContext.Provider value={{
      close,
      open,
      active: filterOverlay
    }}>{children}</FilterOverlayContext.Provider>
  )
}
