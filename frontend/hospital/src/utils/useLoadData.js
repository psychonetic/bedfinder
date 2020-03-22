import React from 'react'
import { LoadingContext } from './useLoading';
import { withAPI } from './withAPI';

export const DataContext = React.createContext({ reloadfn: null, data: null, hid: null })


export function DataProvider({ children }) {
  const [data, setData] = React.useState(null);
  const [hid, setHid] = React.useState(null);
  const api = withAPI();
  const loading = React.useContext(LoadingContext);


  async function reload(hid) {
    setHid(hid)
    try {
      loading.start()
      const res = await api.getHospital(hid);
      setData(res.data.data)

    } catch (error) {
      console.log(error)
    } finally {
      loading.stop()
    }

    
  }

  return (
    <DataContext.Provider value={{ hid, reloadfn: reload, data }}>{children}</DataContext.Provider>
  )
}
