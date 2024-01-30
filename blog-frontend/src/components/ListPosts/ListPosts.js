import { useEffect, useState } from "react";

import { getPosts } from "../../services/api";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 10000);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        const data = response.data;
        setPosts(data);
      } catch (error) {
        handleError();
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {error && (
        <div
          style={{
            width: "90%",
            margin: "3.5rem auto",
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#ff00001a",
            border: "1px solid red",
            borderRadius: "5px",
          }}
        >
          <h4 style={{ color: "red", textAlign: "center" }}>Error Occurred</h4>
        </div>
      )}
      <div
        style={{
          margin: "10px",
          padding: "10px",
          boxShadow: "#8694a4 0px 0px 5px 1px",
          background: "#9c9c9c29",
          borderRadius: "5px",
        }}
      >
        <List sx={{ width: "100%"}}>
          {posts.map((post) => (
            <ListItem
              key={post.id}
              disableGutters
              secondaryAction={
                <Link to={`/posts/${post.id}`}>
                  <Button
                    variant="contained"
                    color="primary"
                    aria-label="Read More"
                  >
                    Read More
                  </Button>
                </Link>
              }
            >
              <ListItemText primary={post.title} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export default ListPosts;
