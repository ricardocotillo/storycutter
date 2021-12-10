import React from 'react'

const CutterForm = props => {
  const { onSubmit } = props
  return (
    <form onSubmit={onSubmit} action="/image/" method="post">
      <p><input type="file" name="video" id="video" /></p>
      <div>
      <input type="radio" value={10} name="length" id="length" checked /><label htmlFor="length"> 10s</label>
      </div>
      <button className='px-4 py-2 bg-indigo-600 text-white' type="submit">Submit</button>
    </form>
  )
}

export default CutterForm