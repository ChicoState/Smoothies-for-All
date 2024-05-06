import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';

function Home() {
  // ** Hooks
  const query = useQuery({
    queryKey: 'posts',
    queryFn: async () => {
      const response = await fetch('http://localhost:6969/allposts', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        },
        mode: 'cors'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  return (
    <div className='home'>
      {query.isLoading && <h1>Loading...</h1>}
      {query.isError && <h1>Error...</h1>}
      {query.isSuccess &&
        query.data.posts.map(post => (
          <div className='card home-card'>
            <div className='card-image'>
              <img src={post.photo} />
            </div>
            <div className='card-content'>
              <i className='material-icons'>favorite_border</i>
              <i className='material-icons'>bookmark_border</i>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <h6>{post.postedBy.username}</h6>
                <h6>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATETIME_MED)}</h6>
              </div>
              <p>{post.body}</p>
              <input type='text' placeholder='Add comment' />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Home;
