import prismadb from '@/lib/prismadb'
import { ThemeProvider } from '@/providers/theme-provider'
import { auth, UserButton } from '@clerk/nextjs'
import { The_Girl_Next_Door } from 'next/font/google'
import { redirect } from 'next/navigation'
import React from 'react'
import { MainNav } from './main-nav'
import StoreSwitcher from './store-switcher'

const Navbar = async () => {
const {userId} = auth()
if(!userId){
redirect('/sign-in')
}

const stores = await prismadb.store.findMany({
    where : {
        userId : userId,
    }
})

  return (
    <div className='border-b' >
    <div className='flex h-16 items-center px-4  ' >
  
        <StoreSwitcher  items={stores} /> 
        <MainNav className='mx-6' />  
      
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeProvider/>
            <UserButton afterSignOutUrl='/' />


        </div>


    </div>
    </div>
  )
}

export default Navbar