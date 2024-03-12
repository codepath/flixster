import '../styles/FilterDropdown.css'

const FilterDropdown = ({ onChange }) => {
  return (
    <select onChange={onChange} defaultValue="">
      <option value="" disabled>Sort by</option>
      <option value="popularity.desc">Popularity Descending</option>
      <option value="release_date.desc">Release Date Descending</option>
      <option value="vote_average.desc">Rating Descending</option>
    </select>
  )
}

export default FilterDropdown
