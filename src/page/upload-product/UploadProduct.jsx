import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaImages } from "react-icons/fa6";
import { MdOutlineCloudUpload } from "react-icons/md";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { getData, postData, putData } from "../../util/api";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar, Alert } from "@mui/material";

const colorOptions = [
  { value: "red", label: "Red", color: "#ff4d4f" },
  { value: "green", label: "Green", color: "#73d13d" },
  { value: "blue", label: "Blue", color: "#40a9ff" },
];

const weightOptions = [
  { value: "light", label: "Light", color: "#ffe58f" },
  { value: "medium", label: "Medium", color: "#ffd666" },
  { value: "heavy", label: "Heavy", color: "#faad14" },
];

const sizeOptions = [
  { value: "small", label: "Small", color: "#e6f7ff" },
  { value: "medium", label: "Medium", color: "#91d5ff" },
  { value: "large", label: "Large", color: "#69c0ff" },
];

const UploadProduct = () => {
  // const [images, setImages] = useState([]);
  const { id } = useParams();
  const [message, setMessage] = useState({ open: false, type: "", text: "" });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    brand: "",
    category: "",
    countInStock: "",
    rating: 0,
    numReviews: 0,
    isFeatured: false,
    tag: "",
  });

  const clearForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      oldPrice: "",
      brand: "",
      category: "",
      countInStock: "",
      rating: 0,
      numReviews: "",
      isFeatured: "false",
      take: "",
    });
    setNewImages([]);
    setExistingImages([]);
  };
  const handleClose = () => {
    setMessage({ ...message, open: false });
  };
  useEffect(() => {
    if (id) {
      getData(`/product/${id}`)
        .then((data) => {
          setForm({
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
            oldPrice: data.oldPrice || "",
            brand: data.brand || "",
            category: data.category?._id || data.category || "",
            countInStock: data.countInStock || "",
            rating: data.rating || 0,
            numReviews: data.numReviews || 0,
            isFeatured: data.isFeatured?.toString() || "false",
            take: data.take || "",
          });
          setExistingImages(data.images || []);
          setSelectedColors(data.colors || [])
          setSelectedWeights(data.weights || []) 
          setSelectedSizes(data.sizes ||[])
        })
        .catch((err) => {
          console.error("Failed to fetch product:", err);
        });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        oldPrice: "",
        brand: "",
        category: "",
        countInStock: "",
        rating: 0,
        numReviews: "",
        isFeatured: "false",
        take: "",
      });
      setExistingImages([]);
       setSelectedColors([])
          setSelectedWeights([]) 
          setSelectedSizes([])
    }

    getData("/category")
      .then((res) => setCategories(res))
      .catch((err) => console.error(err));
  }, [id]);
  // const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const [existingImages, setExistingImages] = useState([]); // URLs
  const [newImages, setNewImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (existingImages.length + newImages.length + files.length > 5) {
      alert("Max 5 images allowed");
      return;
    }

    const mappedFiles = files.map((file) => ({
      raw: file,
      preview: URL.createObjectURL(file),
    }));

    setNewImages((prev) => [...prev, ...mappedFiles]);
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();

  //   // Append all form fields
  //   for (let key in form) {
  //     formData.append(key, form[key]);
  //   }

  //   // Append images
  //   newImages.forEach((img) => {
  //     formData.append("images", img.file);
  //   });

  //   try {
  //     setIsLoading(true);
  //     const res = await postData("/product/create", formData);
  //     const data = await res.json();
  //     if (res.ok) {
  //       setMessage({
  //         open: true,
  //         type: "success",
  //         text: data.message || "Created successfully",
  //       });

  //       clearForm();
  //     } else {
  //       alert("Create failed");
  //       console.error(data);
  //     }
  //   } catch (err) {
  //     console.error("Submit Error:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Confirm delete

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append product fields
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("oldPrice", form.oldPrice);
      formData.append("brand", form.brand);
      formData.append("category", form.category);
      formData.append("countInStock", form.countInStock);
      formData.append("rating", form.rating);
      formData.append("numReviews", form.numReviews);
      formData.append("isFeatured", form.isFeatured);
      formData.append("take", form.take);

      // Append existing images JSON string (to keep)
      formData.append("existingImages", JSON.stringify(existingImages));

      // Append new images (File objects)
      newImages.forEach((img) => formData.append("images", img.raw));
      // ប្រសិនបើ newImages មាន property file: => img.file

      selectedColors.forEach(color => formData.append("colors", color));
    selectedWeights.forEach(weight => formData.append("weights", weight));
    selectedSizes.forEach(size => formData.append("sizes", size));

      let res;
      if (id) {
        // Update product
        res = await putData(`/product/${id}`, formData);
      } else {
        // Create new product
        res = await postData("/product/create", formData);
      }
      setMessage({
        open: true,
        type: "success",
        text:
          res.message ||
          (id
            ? "Product updated successfully"
            : "Product created successfully"),
      });

      clearForm();
      navigate("/productList"); // ឬផ្លូវដែលអ្នកចង់ទៅបន្ទាប់
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

  const handleChange = (e, setter) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setter(selected);
    console.log(selected);
  };

  return (
    <>
      <div className="container">
        <div className="breadcrumbContainer">
          <div className="breadcrumb">
            <h2>Product List</h2>
            <div className="breadRight">
              <span>
                <Link to="/">Home</Link>~
              </span>
              <span>
                <Link to="/">Product</Link>~
              </span>
              <span className=" text-secondary ">Upload Product</span>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <form onSubmit={handleSubmit} className="form">
            <div className="row">
              <div className="col-md-7 mb-2">
                <div className="basicInformation card shadow p-3 border-0">
                  <h2>Basic Information</h2>

                  <div className="label-control">
                    <label htmlFor="name">Product Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="type here..."
                    />
                  </div>
                  <div className="label-control">
                    <label htmlFor="description">description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      placeholder="type here.."
                    />
                  </div>
                  <div className="label-control">
                    <div className="label2-grid row">
                      <div className="label-control col-md-6">
                        <label htmlFor="">category</label>
                        <select
                          name="category"
                          value={form.category}
                          onChange={handleInputChange}
                        >
                          <option value="">Select</option>
                          {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="label-control col-md-6">
                        <label htmlFor="">brands</label>
                        <select
                          name="brand"
                          value={form.brand}
                          onChange={handleInputChange}
                        >
                          <option value="nike">Nike</option>
                          <option value="iphone">Iphone</option>
                          <option value="ecstasy">Ecstasy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="label-control">
                    <div className="label2-grid row">
                      <div className="label-control col-md-6">
                        <label htmlFor="">regular price</label>
                        <input
                          name="oldPrice"
                          value={form.oldPrice}
                          onChange={handleInputChange}
                          placeholder="type here..."
                        />
                      </div>
                      <div className="label-control col-md-6">
                        <label htmlFor="">discount price</label>
                        <input
                          name="price"
                          value={form.price}
                          onChange={handleInputChange}
                          placeholder="type here..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="label-control">
                    <div className="label2-grid row">
                      <div className="label-control col-md-6">
                        <label htmlFor="">numReviews</label>
                        <input
                          name="numReviews"
                          value={form.numReviews}
                          onChange={handleInputChange}
                          placeholder="type here..."
                        />
                      </div>
                      <div className="label-control col-md-6">
                        <label htmlFor="">isFeatured</label>
                        <select
                          name="isFeatured"
                          value={form.isFeatured}
                          onChange={handleInputChange}
                        >
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="label-control">
                    <div className="label2-grid row">
                      <div className="label-control col-md-6">
                        <label htmlFor="">stock</label>
                        <input
                          name="countInStock"
                          value={form.countInStock}
                          onChange={handleInputChange}
                          placeholder="type here..."
                        />
                      </div>
                      <div className="label-control col-md-6">
                        <label htmlFor="">rating</label>
                        <Rating
                          className="rating mt-2"
                          name="simple-controlled"
                          value={parseFloat(form.rating)}
                          onChange={(e, value) =>
                            setForm({ ...form, rating: value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="label-control">
                    <label htmlFor="">Tag</label>
                    <textarea
                      name="take"
                      value={form.take}
                      onChange={handleInputChange}
                      placeholder="type here..."
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="specification card shadow border-0 p-3 mt-2">
                  <h2>specification</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="label-control">
                        <label>Weight:</label>
                        <select
                          multiple
                          value={selectedWeights}
                          onChange={(e) => handleChange(e, setSelectedWeights)}
                          style={{ width: "100%", height: "80px" }}
                        >
                          {weightOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="label-control">
                        <label>Color:</label>
                        <select
                          multiple
                          value={selectedColors}
                          onChange={(e) => handleChange(e, setSelectedColors)}
                          style={{ width: "100%", height: "80px" }}
                        >
                          {colorOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="label-control">
                        {/* <label htmlFor="stock">Stock</label>
                        <input
                          name="stock"
                          type="text"
                          placeholder="type here..."
                        /> */}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="label-control">
                        <label>Size:</label>
                        <select
                          multiple
                          value={selectedSizes}
                          onChange={(e) => handleChange(e, setSelectedSizes)}
                          style={{ width: "100%", height: "80px" }}
                        >
                          {sizeOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mediaAndPublished card shadow border-0 p-3 mt-2 mb-2">
                <h3>Media And Published</h3>
                <div className="image-grid">
                  {existingImages.map((url, index) => (
                    <div className="image-box" key={`existing-${url}-${index}`}>
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

                <button className="publish-button" type="submit">
                  {isLoading ? (
                    <CircularProgress color="inherit" className="loading" />
                  ) : (
                    <>
                      <MdOutlineCloudUpload /> PUBLISH AND VIEW
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
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
    </>
  );
};

export default UploadProduct;
