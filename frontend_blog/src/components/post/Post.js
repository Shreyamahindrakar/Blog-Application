import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ id, img, title, content, date }) {
  return (
    <div className="post">
      <img className="postImg" src={img} alt={title} />
      <div className="postInfo">
        <div className="postCats">
          {/* Assuming categories will be added later */}
          <span className="postCat">
            <Link className="link" to="/posts?cat=Category">
              Category
            </Link>
          </span>
        </div>
        <span className="postTitle">
          {/* Use the `id` prop in the URL */}
          <Link to={`/post/${id}`} className="link">
            {title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{date}</span>
      </div>
      <p className="postDesc">{content}</p>
    </div>
  );
}
