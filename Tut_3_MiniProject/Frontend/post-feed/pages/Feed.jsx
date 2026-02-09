import react, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([
        {
            id: "1",
            image_url: "https://images.pexels.com/photos/34870436/pexels-photo-34870436.jpeg",
            caption: "mobile photoGraphy"
        }
    ])
    const handleGoBack = (e) => {
        e.preventDefault();
        navigate("/create-post");

    }

    useEffect(() => {
        const result = axios.get('http://localhost:3000/posts')
            .then((result) => {
                console.log("this is coming fron backend", result);
                const formattedPosts = result.data.posts.map(post => ({
                    id: post._id,
                    image_link: post.image_link,
                    caption: post.caption
                }));

                setPosts(formattedPosts);
            })
    }, [])

    // console.log(posts[0].image_url)
    return (
        <section className='feed-section' >
            {
                posts.length > 0 ?
                    posts.map((item) => (
                        <div key={item._id} className='feed-card' >
                            <img src={item.image_link} alt={item.caption} />
                            <p>{item.caption}</p>
                        </div>
                    )) : (<h1>Not available</h1>)
            }
            <button className='navigate-back-btn'  onClick={handleGoBack} >Create New Post</button>
        </section>
    )
}

export default Feed