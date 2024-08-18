import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import "./singlePost.css";

export default function SinglePost() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [post, setPost] = useState(null); // State to store the post data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch the post using the id from the API
        const response = await axios.get(`${config.API_BASE_URL}/api/blogapi/get-post-list/?posts_id=${id}`);
        const postData = response.data.data[0];
        setPost(postData); // Set the post data
      } catch (error) {
        setError("Failed to fetch post");
        console.error("Failed to fetch post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.post(`${config.API_BASE_URL}/api/blogapi/post-delete/?post_id=${id}`);
        alert("Post deleted successfully");
        navigate(-1); // Navigate back to the previous page
      } catch (error) {
        console.error("Failed to delete post:", error.response ? error.response.data : error.message);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={`${config.API_BASE_URL}${post.image}`} // Prepend the base URL to the image path
          alt={post.title}
        />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <Link to={`/update-post/${id}`}>
              <i className="singlePostIcon far fa-edit"></i>
            </Link>
            <i
              className="singlePostIcon far fa-trash-alt"
              onClick={handleDelete}
              style={{ cursor: 'pointer' }}
            ></i>
          </div>
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.author || "Unknown"}`}>
                {post.author || "Unknown"}
              </Link>
            </b>
          </span>
          <span>{new Date(post.created_at).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.content}
        </p>
      </div>
    </div>
  );
}
