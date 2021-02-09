import React, { useState } from 'react'

const SearchForm = ({ searchText }) => {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    searchText(text)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g politics"
          onChange={(e) => setText(e.target.value)}
          className="py-1 px-2 rounded-l"
        />
        <button
          type="submit"
          className="bg-green-400 py-1 px-2 text-white rounded-r"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default SearchForm
