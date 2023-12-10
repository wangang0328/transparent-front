import { useEffect } from 'react'

// 单页面监听路由， hash模式， hash改变可以通过 hashchange, popstate来监听
// history 模式也可通过 popState 监听
// 但是 监听不到 pushState 和 replaceState， 可以自定义事件 pushState 和 replaceState

const wrapHistoryEvent = (type: keyof History) => {
  const o = history[type]
  const e = new Event(type)
  return function (this: unknown, ...restParams: any[]) {
    window.dispatchEvent(e)
    return o.apply(this, restParams)
  }
}

history.replaceState = wrapHistoryEvent('replaceState')
history.pushState = wrapHistoryEvent('pushState')

const useHistoryChange = () => {
  // const [] = useState()

  useEffect(() => {
    const handleUrlChange = () => {
      // do something
    }

    window.addEventListener('popstate', handleUrlChange)
    window.addEventListener('pushState', handleUrlChange)
    window.addEventListener('replaceState', handleUrlChange)

    return () => {
      window.removeEventListener('popstate', handleUrlChange)
      window.removeEventListener('pushState', handleUrlChange)
      window.removeEventListener('replaceState', handleUrlChange)
    }
  }, [])
}

export default useHistoryChange
