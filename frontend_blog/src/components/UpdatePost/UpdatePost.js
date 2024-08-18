import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config/config";
import "./updatePost.css";

export default function UpdatePost() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // To store current image URL

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/blogapi/get-post-list/?posts_id=${id}`);
        const postData = response.data.data[0];
        setTitle(postData.title);
        setContent(postData.content);
        setCurrentImage(postData.image); // Set current image URL
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.put(
        `${config.API_BASE_URL}/api/blogapi/post-update/?post_id=${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Post updated successfully");
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error("Failed to update post:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="updatePost">
      <form className="updatePostForm" onSubmit={handleSubmit}>
        <div className="updatePostFormGroup">
          {currentImage && (
            <div className="imagePreview">
              <img
                src={`${config.API_BASE_URL}${currentImage}`}
                alt="Current post"
                className="currentPostImage"
              />
            </div>
          )}
          <label htmlFor="fileInput">
            <i className="updatePostIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input
            className="updatePostInput"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="updatePostFormGroup">
          <textarea
            className="updatePostInput updatePostText"
            placeholder="Update your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button className="updatePostSubmit" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}
