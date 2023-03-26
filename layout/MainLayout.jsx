import React, { Fragment } from 'react'
import Haeder from './Header'
import SideBar from './SideBar'

function MainLayout({children}) {
  return (
    <Fragment>
        <Haeder/>
        <SideBar/>
        <main>
            {children}
        </main>
    </Fragment>
  )
}

export default MainLayout