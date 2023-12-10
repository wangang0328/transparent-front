import { GlobalInfoProvider } from './GlobalInfo'
export * from './GlobalInfo'

const StoreProvider = ({ children }: { children: JSX.Element }) => {
  // 后续可以增加其他的 provider
  return <GlobalInfoProvider>{children}</GlobalInfoProvider>
}

export default StoreProvider
