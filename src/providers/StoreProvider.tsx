'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, makeStore } from '@/redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from '@/components/Loaders/Loader'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  const persistedStore = persistStore(storeRef.current)

  return <Provider store={storeRef.current}>
    <PersistGate loading={<Loader/>} persistor={persistedStore}>
    {children}
    </PersistGate>
    </Provider>
}