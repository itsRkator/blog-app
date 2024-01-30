import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

import { getPost, deletePost } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const ViewPost = () => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 10000);
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      navigate("/");
    } catch (error) {
      handleError();
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const apiResponse = await getPost(id);
        const data = apiResponse.data;
        setPost(data);
      } catch (error) {
        handleError();
        console.log(error);
      }
    };
    fetchPost();
  }, [id]);

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
      <div style={{ marginTop: "1rem" }}>
        {post && (
          <Card style={{ marginBottom: "10px" }}>
            <CardContent>
              <Typography
                align="center"
                variant="h5"
                component="div"
                sx={{ mb: 2, mt: 2, borderBottom: "1px solid black" }}
              >
                {post.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, mt: 2, px: 2 }}
              >
                {post.body}
              </Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignContent: "center",
                }}
              >
                <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  color="success"
                  onClick={() => handleEdit(post.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ViewPost;
