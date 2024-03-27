import React, { useRef, useState, useEffect } from 'react';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';

function Home() {
  // ** States
  const [filteredPosts, setFilteredPosts] = useState([]);

  // ** Hooks
  const query = useQuery({
    queryKey: 'posts',
    queryFn: () => fetch('http://localhost:6969/allposts').then(res => res.json())
  });
  const searchRef = useRef(null);

  // ** Functions
  const handleSearch = () => {
    const search = searchRef.current.value;

    console.log('search', search);

    if (!search) {
      setFilteredPosts(query.data.posts);

      return;
    }

    const filtered = query.data.posts.filter(post => post.body.includes(search) || post.title.includes(search));

    console.log('filtered', filtered);

    setFilteredPosts(filtered);
  };

  useEffect(() => {
    if (query.isSuccess) {
      setFilteredPosts(query.data.posts);
    }
  }, [query.data]);

  return (
    <div className='home'>
      <input type='text' placeholder='Search' className='search' ref={searchRef} onChange={handleSearch} />
      {query.isLoading && <h1>Loading...</h1>}
      {query.isError && <h1>Error...</h1>}
      {query.isSuccess &&
        filteredPosts.map(post => (
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
