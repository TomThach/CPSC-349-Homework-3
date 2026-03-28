function Controls({ search, sortBy, onSearch, onSort }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
      <select value={sortBy} onChange={e => onSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="release_date.asc">Release Date (Asc)</option>
        <option value="release_date.desc">Release Date (Desc)</option>
        <option value="vote_average.asc">Rating (Asc)</option>
        <option value="vote_average.desc">Rating (Desc)</option>
      </select>
    </div>
  );
}

export default Controls;