import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './components/header'
import { HomePage, ChartPage, ErrorPage } from './pages'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './main.css'

const router = createBrowserRouter([
    {
        path: "*",
        Component: ErrorPage,
    },
    {
      path: "/",
      Component: HomePage,
    },
    {
        path: "/chart",
        Component: ChartPage,
    }
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="min-h-full">
        <Header /> 
        <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
