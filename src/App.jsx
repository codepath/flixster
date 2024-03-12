import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import FilterDropdown from './components/FilterDropdown'
import MovieList from './components/MovieList'
import './App.css'
import './styles/SearchBar.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('popularity.desc')

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  return (
    <div className="App">
      <Header />

      <div className="App-header">
        <SearchBar onSearch={handleSearch} />
        <FilterDropdown onChange={handleFilterChange} />
      </div>

      <MovieList query={query} filter={filter} />
      <Footer />
    </div>
  )
}

export default App
