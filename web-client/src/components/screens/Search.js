import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';

function Search() {
  // ** Hooks
  const searchRef = useRef();
  const query = useQuery({
    queryKey: 'posts',
    queryFn: async () => {
      const response = await fetch('http://localhost:6969/allposts', {
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

  // ** States
  const [filteredPosts, setFilteredPosts] = useState([]);

  // ** Functions
  const handleSearch = () => {
    const search = searchRef.current.value;

    if (!search) {
      setFilteredPosts([]);

      return;
    }

    const filtered = query.data.posts.filter(
      post => post.body.includes(search) || post.title.includes(search) || post.postedBy.username.includes(search)
    );

    setFilteredPosts(filtered);
  };

  return (
    <>
      <div className='mycard'>
        <div className='card auth-card'>
          <input type='text' placeholder='Enter your query.' ref={searchRef} />
          <button className='btn waves-effect waves-light' onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
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
    </>
  );
}

export default Search;
