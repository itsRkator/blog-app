import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost, getPost } from "../../services/api";
import { Box, TextField, Button, Card } from "@mui/material";

const CreatePost = ({ setIsLoading }) => {
  const [blog, setBlog] = useState({
    title: "",
    body: "",
  });
  const [error, setError] = useState(false);
  const { id } = useParams();
  const formHeaderTexts = id ? "Edit Blog" : "Add Blog";
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setBlog({ ...blog, title: event.target.value });
  };

  const handleBodyChange = (event) => {
    setBlog({ ...blog, body: event.target.value });
  };

  const handleError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 10000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (id) {
        await updatePost(id, blog);
        navigate(`/posts/${id}`);
        setIsLoading(false);
      } else {
        const apiResponse = await createPost(blog);
        const data = apiResponse.data;
        navigate(`/posts/${data.id}`);
        setIsLoading(false);
      }
    } catch (err) {
      handleError();
      console.error(err);
    }
  };

  useEffect(() => {
    setIsLoading(id ? true : false);
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiResponse = await getPost(id);
        const data = apiResponse.data;
        setBlog(data);
        setIsLoading(false);
      } catch (err) {
        handleError();
        console.error(err);
        setIsLoading(false);
      }
    };
    if (id) {
      fetchData();
    }
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
          <h4 style={{ color: "red", textAlign: "center" }}>
            Error {id ? "updating" : "creating"} blog
          </h4>
        </div>
      )}
      <Card sx={{ p: 5, m: 5, textAlign: "center" }}>
        <h2>{formHeaderTexts}</h2>
        <div className="create-form">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ textAlign: "center", width: "100%" }}>
              <TextField
                margin="normal"
                id="title"
                label="Title"
                name="title"
                value={blog.title ? blog.title : ""}
                fullWidth
                required
                autoFocus
                onChange={handleTitleChange}
                variant="outlined"
              />
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              <TextField
                margin="normal"
                id="body"
                label="Body"
                name="body"
                variant="outlined"
                fullWidth
                required
                multiline
                rows={4}
                value={blog.body ? blog.body : ""}
                onChange={handleBodyChange}
              />
            </div>
            <div style={{ textAlign: "center", width: "100%" }}>
              <Button
                fullWidth
                type="button"
                onClick={handleSubmit}
                variant="contained"
                color="success"
              >
                {id ? "Update" : "Add"} Blog
              </Button>
            </div>
          </Box>
        </div>
      </Card>
    </>
  );
};

export default CreatePost;
