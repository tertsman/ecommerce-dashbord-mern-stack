import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaImages } from "react-icons/fa6";
import { MdOutlineCloudUpload } from "react-icons/md";
import { postData, getData, putData } from "../../util/api";
import { Snackbar, Alert } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const BannerButtom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [existingImage, setExistingImage] = useState(""); // ONE old image
const [newImage, setNewImage] = useState(null); // ONE new image


  useEffect(() => {
    if (id) {
      getData(`/bannerButtom/${id}`).then((res) => {
        setExistingImage(res.image || "");
        console.log(res)
      });
    } else {
      setExistingImage("");
    }
  }, [id]);

 const removeExistingImage = () => {
  setExistingImage("");
};

  const [message, setMessage] = useState({ open: false, type: "", text: "" });

  const handleClose = () => {
    setMessage({ ...message, open: false });
  };


const handleImageUpload = (e) => {
  const file = e.target.files[0]; // only 1 image
  if (file) {
    setNewImage({
      file,
      preview: URL.createObjectURL(file),
    });
  }
};
const clearFrom = () => {
  setExistingImage("");
  setNewImage(null);
};
  const AddCategory = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const formData = new FormData();
  formData.append("existingImage", existingImage); // if still kept

  if (newImage) {
    formData.append("image", newImage.file); // only one image
  }

  try {
    if (id) {
      const res = await putData(`/bannerButtom/${id}`, formData);
      setMessage({
        open: true,
        type: "success",
        text: res.message || "Update successfully",
      });
    } else {
      const res = await postData("/bannerButtom/create", formData);
      setMessage({
        open: true,
        type: "success",
        text: res.message || "Created successfully",
      });
    }
    clearFrom();
    navigate("/bannerButtomList");
  } catch (error) {
    setMessage({
      open: true,
      type: "error",
      text: error.message || "Something went wrong!",
    });
  } finally {
    setIsLoading(false);
  }
};


  const removeNewImage = () => {
  setNewImage(null);
};
  return (
    <>
      <div className="container">
        <div className="addCategoryContainer">
          <div className="breadcrumbContainer">
            <div className="breadcrumb">
              <h2>Banner Bottom Upload</h2>
              <div className="breadRight">
                <span>
                  <Link to="/">Home</Link>~
                </span>
                <span>
                  <Link to="/bannerButtomList">Banner Bottom</Link>
                </span>
                
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
                  <div className="mediaAndPublished  border-0 p-3 mt-2 mb-2">
                    <h3>Media And Published</h3>
                    {/* <div className="image-grid">
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

                      {existingImages.length + newImages.length < 1 && (
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
                    </div> */}

                    <div className="image-grid">
                      {existingImage && (
                        <div className="image-box">
                          <img src={existingImage} alt="existing" />
                          <button
                            type="button"
                            className="delete-img-btn"
                            onClick={removeExistingImage}
                          >
                            x
                          </button>
                        </div>
                      )}

                      {!existingImage && newImage && (
                        <div className="image-box">
                          <img src={newImage.preview} alt="preview" />
                          <button
                            type="button"
                            className="delete-img-btn"
                            onClick={removeNewImage}
                          >
                            x
                          </button>
                        </div>
                      )}

                      {!existingImage && !newImage && (
                        <label className="upload-box">
                          <input
                            type="file"
                            onChange={handleImageUpload}
                            hidden
                            name="image"
                            accept="image/*"
                          />
                          <div className="upload-placeholder">
                            <FaImages />
                            <p>Image upload</p>
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

export default BannerButtom;
