"use client"
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs'
import Code from './Code'
import SimpleBar from "simplebar-react"
import { nodejs, python } from '@/helpers/documentation-code'
import "simplebar-react/dist/simplebar.min.css"




const DocumentationTabs = () => {
  return (
    <Tabs defaultValue='nodejs' className='w-full max-w-2xl'>
        <TabsList>
            <TabsTrigger value='nodejs'>Node JS</TabsTrigger>
            <TabsTrigger value='python'>Python</TabsTrigger>
        </TabsList>
        <TabsContent value='nodejs'>
            <SimpleBar>
            <Code language='javascript' code={nodejs} show animated animationDelay={100}></Code>
            </SimpleBar>
        </TabsContent>
        <TabsContent value='python'>
            <SimpleBar>
            <Code language='python' code={python} show animated animationDelay={100}></Code>
            </SimpleBar>

        </TabsContent>
    </Tabs>
  )
}

export default DocumentationTabs