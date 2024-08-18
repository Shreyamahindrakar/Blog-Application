import Post from "../post/Post";
import "./posts.css";


export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post 
          key={post.id}
          id={post.id} 
          title={post.title} 
          img={`http://127.0.0.1:8000${post.image}`}  // Adjust this based on your image path
          content={post.content}
          date={post.created_at}
        />
      ))}
    </div>
  );
}
