import React from 'react'

export const LoadingContext = React.createContext({ start: null, stop: null, loading: false })

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  function startLoadingFn() {
    setLoading(true)
  }

  function stopLoadingFn() {
    setLoading(false)
  }

  return <LoadingContext.Provider value={
    {
      start: startLoadingFn,
      stop: stopLoadingFn,
      loading
    }
  }>{children}</LoadingContext.Provider>
}

