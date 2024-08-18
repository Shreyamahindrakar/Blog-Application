import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config/config";
import "./deletePost.css";

export default function DeletePost() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/blogapi/get-post-list/?posts_id=${id}`);
        const postData = response.data.data[0];
        setPost(postData);
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
    try {
      await axios.post(
        `${config.API_BASE_URL}/api/blogapi/post-delete/?post_id=${id}`
      );
      alert("Post deleted successfully");
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error("Failed to delete post:", error.response ? error.response.data : error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="deletePost">
      <h1>Delete Post</h1>
      {post && (
        <div className="deletePostContent">
          <img
            src={`${config.API_BASE_URL}${post.image}`}
            alt={post.title}
            className="deletePostImage"
          />
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <button className="deletePostButton" onClick={handleDelete}>
            Confirm Delete
          </button>
        </div>
      )}
    </div>
  );
}
