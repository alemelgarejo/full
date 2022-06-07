import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import * as React from 'react'
import Layout from '../components/Layout'
import EmojiCard from '../components/EmojiCard'
import List from '../components/List'
import emojisData from '../data/emojis'
import CategoryCard from '../components/CategoryCard'

const Home: NextPage = () => {
  const [filteredEmojis, setFilterEmojis] = React.useState(
    emojisData.slice(0, 99),
  )

  function handleFilterBySearch(search: string) {
    if (search.length > 0) {
      setFilterEmojis(
        emojisData.filter((emoji) => {
          return emoji.name.toUpperCase().includes(search.toUpperCase().trim())
        }),
      )
    } else {
      setFilterEmojis(emojisData.slice(0, 99))
    }
  }

  function handleFilterByCategory(category: string) {
    setFilterEmojis(
      emojisData.filter((emoji) => emoji.group.toUpperCase().includes(category.toUpperCase()))
    )
  }

  return (
    <Layout>
      <h1 className="text-2xl md:text-5xl font-bold text-gray-600 text-center tracking-wide">
        Welcome to Infoji
      </h1>
      <div className='flex justify-center'>
        <input
          onChange={(e) => {
            handleFilterBySearch(e.target.value)
          }}
          type={'text'}
          id="name"
          placeholder="Search for an emoji"
          className="w-full max-w-xl border border-gray-300 p-3 rounded-md my-8 bg-white shadow-md focus:outline-none focus:border-cyan-500 focus:ring-1"
        />
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="😀"
              group={'Smileys & Emotion'}
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="👨🏻"
              group={'People & Body'}
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="🐶"
              group={'Animals & Nature'}
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="🍔"
              group={'Food & Drink'}
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="⚽️"
              group="Activities"
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="🏨"
              group={'Travel & Places'}
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="💡"
              group="Objects"
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="⚛️"
              group="Symbols"
            />
            <CategoryCard
              handleFilter={handleFilterByCategory}
              emoji="🚩"
              group="Flags"
            />
          </div>
      <List emojis={filteredEmojis.slice(0, 99)} />
    </Layout>
  )
}

export default Home
