import React from 'react'
import Post from '../Post'

const Posts = () => {
  return (
    <div>
      {
        [1, 2, 3, 4].map((index, item) => <Post key={index} />)
      }
    </div>
  )
}

export default Posts