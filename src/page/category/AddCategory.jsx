import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaImages } from "react-icons/fa6";
import { MdOutlineCloudUpload } from "react-icons/md";
import { postData, getData, putData } from "../../util/api";
import { Snackbar, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
const AddCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [getFields, setGetFields] = useState({
    name: "",
    color: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {

    if (id) {
      getData(`/category/${id}`).then((res) => {
        setGetFields({ name: res.name, color: res.color });
        setExistingImages(res.images || []);
      });
    } else {
      setGetFields({ name: "", color: "" });
      setExistingImages([]);
    }
  }, [id]);


  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const [message, setMessage] = useState({ open: false, type: "", text: "" });

  const handleClose = () => {
    setMessage({ ...message, open: false });
  };
  const changInput = (e) => {
    setGetFields((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...newImages]);
  };
  const clearFrom = () => {
    setGetFields({
      name: "",
      color: "",
    });
    setExistingImages([]);
    setNewImages([]);
  };
  const AddCategory = async (e) => {
    e.preventDefault();
    // e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", getFields.name);
    formData.append("color", getFields.color);
    formData.append("existingImages", JSON.stringify(existingImages));
    newImages.forEach((img) => formData.append("images", img.file));

    // images.forEach((img) => {
    //   formData.append("images", img.file); // img.file = original File object
    // });

    try {
      if (id) {
        const res = await putData(`/category/${id}`, formData);
        setMessage({
          open: true,
          type: "success",
          text: res.message || "update successfully",
        });
        setIsLoading(false);
      } else {
        const res = await postData("/category/create", formData);
        setMessage({
          open: true,
          type: "success",
          text: res.message || "Created successfully",
        });
        setIsLoading(false);
      }
      clearFrom();
      navigate("/categoryList");
    } catch (error) {
      setMessage({
        open: true,
        type: "error",
        text: error.message || "Something went wrong!",
      });
      setIsLoading(false);
    }
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="container">
        <div className="addCategoryContainer">
          <div className="breadcrumbContainer">
            <div className="breadcrumb">
              <h2>Category List</h2>
              <div className="breadRight">
                <span>
                  <Link to="/">Home</Link>~
                </span>
                <span>
                  <Link to="/">Category</Link>~
                </span>
                <span className=" text-secondary "> Add Category</span>
              </div>
            </div>
          </div>
          <Snackbar
            open={message.open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={handleClose}
              severity={message.type}
              sx={{ width: "100%" }}
            >
              {message.text}
            </Alert>
          </Snackbar>
          <form onSubmit={AddCategory} className="form">
            <div className="row">
              <div className="col-md-9 mt-4">
                <div className="addCategory card p-3 shadow">
                  <div className="form-group">
                    <label htmlFor="">Category name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="type here..."
                      onChange={changInput}
                      value={getFields.name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">color</label>
                    <input
                      type="text"
                      name="color"
                      placeholder="type here..."
                      onChange={changInput}
                      value={getFields.color}
                    />
                  </div>
                  <div className="mediaAndPublished  border-0 p-3 mt-2 mb-2">
                    <h3>Media And Published</h3>
                    <div className="image-grid">
                      {existingImages.map((url, index) => (
                        <div
                          className="image-box"
                          key={`existing-${url}-${index}`}
                        >
                          <img src={url} alt={`existing-${index}`} />
                          <button
                            type="button"
                            className="delete-img-btn"
                            onClick={() => removeExistingImage(index)}
                          >
                            x
                          </button>
                        </div>
                      ))}

                      {newImages.map((img, index) => (
                        <div
                          className="image-box"
                          key={`new-${img.preview}-${index}`}
                        >
                          <img src={img.preview} alt={`upload-${index}`} />
                          <button
                            type="button"
                            className="delete-img-btn"
                            onClick={() => removeNewImage(index)}
                          >
                            x
                          </button>
                        </div>
                      ))}

                      {existingImages.length + newImages.length < 5 && (
                        <label className="upload-box">
                          <input
                            type="file"
                            onChange={handleImageUpload}
                            hidden
                            multiple
                            name="images"
                          />
                          <div className="upload-placeholder">
                            <FaImages />
                            <p>image upload</p>
                          </div>
                        </label>
                      )}
                    </div>

                    <button type="submit" className="publish-button w-100">
                      {isLoading === true ? (
                        <CircularProgress color="inherit" className="loading" />
                      ) : (
                        <>
                          {" "}
                          <MdOutlineCloudUpload /> PUBLISH AND VIEW{" "}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
