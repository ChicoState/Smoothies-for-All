import React from 'react';
import { useQuery } from '@tanstack/react-query';

function Weekly() {
  // ** Hooks
  const query = useQuery({
    queryKey: 'weekly',
    queryFn: async () => {
        const response = await fetch('http://localhost:6969/likes/weekly', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }
  });

  return (
    <div>
      {query.data && (
        <div className='card home-card'>
          <div className='card-image'>
            <img src={query.data.photo} />
          </div>
          <div className='card-content'>
            <i className='material-icons'>favorite_border</i>
            <i className='material-icons'>bookmark_border</i>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <h6>{query.data.postedBy.username}</h6>
              <h6>{DateTime.fromISO(query.data.createdAt).toLocaleString(DateTime.DATETIME_MED)}</h6>
            </div>
            <p>{query.data.body}</p>
            <input type='text' placeholder='Add comment' />
          </div>
        </div>
      )}
    </div>
  );
}

export default Weekly;
