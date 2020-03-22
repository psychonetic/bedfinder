import React from 'react'

export const FilterComponentContext = React.createContext({ currentComponent: null })

export default function ({ children }) {
  const [currentComponent, setCurrentComponent] = React.useState(null)


  return (
    <FilterComponentContext.Provider value={{ currentComponent, setCurrentComponent }}>{children}</FilterComponentContext.Provider>
  )
}