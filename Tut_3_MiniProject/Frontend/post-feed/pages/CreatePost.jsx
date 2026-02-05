import react from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        axios.post("http://localhost:3000/create-post", formData)
            .then((result) => {
                navigate("/feed");
            })
            .catch((err) => {
                console.log(err);
                alert("error creating the posts please try again");
            })
    }

    return (
        <section className="create-post-section">
            <h1>Create Post</h1>

            <form className="create-post-form" onSubmit={handleSubmit} >
                <input type="file" name="image" accept="image/*" />

                <input
                    type="text"
                    name="caption"
                    required
                    placeholder="Enter caption..."
                />

                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default CreatePost