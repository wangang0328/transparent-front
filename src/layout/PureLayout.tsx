import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const PureLayout = () => (
  <Suspense fallback={<div>loading....</div>}>
    <Outlet />
  </Suspense>
)

export default PureLayout
