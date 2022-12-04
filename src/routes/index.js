import { useRoutes } from "react-router-dom";
import GuestGuard from '../auth/GuestGuard'; 

import {
  LoginPage
} from './elements';

export default function Router () {

  const AuthRoutes = {
    path: 'auth',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <LoginPage />
          </GuestGuard>
        )
      }
    ]
  }


  return useRoutes([
    AuthRoutes
  ])
}