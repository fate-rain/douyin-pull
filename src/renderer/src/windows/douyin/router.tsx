import { createMemoryRouter } from 'react-router-dom'
import { type Router } from '@remix-run/router'

import App from './App'

export const router: Router = createMemoryRouter([
  {
    path: '/',
    element: <App />,
    children: []
  }
])
