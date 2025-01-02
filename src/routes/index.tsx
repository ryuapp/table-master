import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { GridExample } from '../components/example'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  return (
    <div className="p-2 flex flex-col">
      <h3>Welcome Home!</h3>
      <div className='w-full h-[400px]'>
      <GridExample />
      </div>
    </div>
  )
}
