import type { NextPage, NextPageContext } from 'next'

import { Contact, PrismaClient } from '@prisma/client'
import { useState } from 'react'

const prisma = new PrismaClient()


/*export const getServerSideProps = async () => {
  const contacts = await prisma.contact.findMany()
  return { contacts: { contacts } }
}
 async function saveContact(contact: Contact) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(contact)
  })

  if(!response.ok) {
    throw Error(response.statusText)
  }

  return await response.json()
} */

const Home: NextPage = (contacts) => {
  
  return (
    <div>
      
        {contacts.map((c: Contact) => {
          c.firstName
        })}
      
    </div>
  )
} 

export default Home 

export async function getServerSideProps() {
  const contacts: Contact[] = await  prisma.contact.findMany()

  if (!contacts) return {
    redirect: {
      destination: '/',
      permanent: false
    }
  }

  return {
    props: {
      contacts: contacts,
    },
  }
} 