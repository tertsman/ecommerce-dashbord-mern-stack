import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaPix } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { IoColorPalette } from "react-icons/io5";
import { MdSummarize } from "react-icons/md";
import { MdSell } from "react-icons/md";
import { IoIosCart } from "react-icons/io";
import { MdHotelClass } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { GrStar } from "react-icons/gr";
import { IoMdStarHalf } from "react-icons/io";
import { MdReply } from "react-icons/md";
import { getData } from "../../util/api";
const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (id) {
      setLoading(true);
      getData(`/product/${id}`)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch(() => {
          setError("Failed to load product details.");
          setLoading(false);
        });
    }
  }, [id]);
  console.log("product", product);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No product found.</p>;
  return (
    <>
      <div className="container">
        <div className="breadcrumbContainer">
          <div className="breadcrumb">
            <h2>Product View</h2>
            <div className="breadRight">
              <span>
                <Link to="/">Home</Link>~
              </span>
              <span>
                <Link to="/">Product</Link>~
              </span>
              <span className=" text-secondary ">Product View</span>
            </div>
          </div>
        </div>
        <div className="productViewContainer card p-lg-4 border-0 shadow mt-4 mb-5">
          <div className="row">
            <div className="col-md-5 ">
              <div className="productGallery p-3">
                <h3>product gallery</h3>
                <div className="productViewGallery mt-4">
                 
                  {product.images && product.images.length > 0 ? (
                    product.images.map((imgUrl, index) => (
                      <img
                        key={index}
                        src={imgUrl}
                        alt={`product-img-${index}`}
                      />
                    ))
                  ) : (
                    <p>No images available</p>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <div className="productDetail p-3 ">
                <h3>product details</h3>
                <div className="productViewInfoGP mt-4">
                  <h2 className="product-view-info-title">
                  {product.name}
                  </h2>
                  <div className="product-view-meta">
                    <SiHomeassistantcommunitystore />
                    <h5>Brand</h5>
                    <span>:</span>
                    <p>{product.brand || "N/A"}</p>
                  </div>
                  <div className="product-view-meta">
                    <FaPix />
                    <h5>category</h5>
                    <span>:</span>
                    <p>{product.category?.name || "N/A"}</p>
                  </div>
                  <div className="product-view-meta">
                    <IoSettingsSharp />
                    <h5>tags</h5>
                    <span>:</span>
                    <ul>
                      <li>suite</li>
                      <li>party</li>
                      <li>dress</li>
                      <li>smart</li>
                      <li>man</li>
                      <li>styles</li>
                    </ul>
                  </div>
                  <div className="product-view-meta">
                    <IoColorPalette />
                    <h5>colors</h5>
                    <span>:</span>
                    <ul>
                      {product.colors && product.colors.length > 0 ? (
                    product.colors.map((value, label) => (
                      <li key={label}>{value}</li>
                    ))
                  ) : (
                    <p>No colors available</p>
                  )}
                      {/* <li>red</li>
                      <li>green</li>
                      <li>Pink</li>
                      <li>black</li>
                      <li>white</li> */}
                    </ul>
                  </div>
                  <div className="product-view-meta">
                    <MdSummarize />
                    <h5>size</h5>
                    <span>:</span>
                    <ul>
                        {product.sizes && product.sizes.length > 0 ? (
                    product.sizes.map((value, label) => (
                      <li key={label}>{value}</li>
                    ))
                  ) : (
                    <p>No sizes available</p>
                  )}
                    </ul>
                  </div>
                  <div className="product-view-meta">
                    <MdSell />
                    <h5>price</h5>
                    <span>:</span>
                    <p className=" text-danger fs-5 fw-medium ">
                      ${product.price} <del> ${product.oldPrice}</del>
                    </p>
                  </div>
                  <div className="product-view-meta">
                    <IoIosCart />
                    <h5>stock</h5>
                    <span>:</span>
                    <p>({product.countInStock}) price </p>
                  </div>
                  <div className="product-view-meta">
                    <MdHotelClass />
                    <h5>review</h5>
                    <span>:</span>
                    <p>({product.numReviews}) review </p>
                  </div>
                  <div className="product-view-meta">
                    <MdVerified />
                    <h5>published</h5>
                    <span>:</span>
                    <p>{new Date(product.dateCreated).toLocaleDateString()} </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <div className="descriptions p-3">
                <h3>descriptions</h3>
                <p>
                  {product.description}
                </p>
              </div>
            </div>
            <div className="col-md-12 mt-3">
              <div className="ratingAnalyticContainer p-3">
                <h3>rating analytics</h3>
                <div className="review-analytic-gr mt-3">
                  <div className="review-analytic-graph-gr">
                    <ul>
                      <li>
                        <div className="review-analytic-count"> {product.rating} star</div>
                        <div className="review-analytic-graph">
                          <span style={{ width: "90%" }}></span>
                        </div>
                        <div className="review-analytic-user">(22)</div>
                      </li>
                      <li>
                        <div className="review-analytic-count"> {product.rating >= 4 ? '4' : product.rating } star</div>
                        <div className="review-analytic-graph">
                          <span style={{ width: "60%" }}></span>
                        </div>
                        <div className="review-analytic-user">(06)</div>
                      </li>
                      <li>
                        <div className="review-analytic-count"> {product.rating >= 3 ? '3' : product.rating } star</div>
                        <div className="review-analytic-graph">
                          <span style={{ width: "45%" }}></span>
                        </div>
                        <div className="review-analytic-user">(05)</div>
                      </li>
                      <li>
                        <div className="review-analytic-count"> {product.rating >= 2 ? '2' : product.rating } star</div>
                        <div className="review-analytic-graph">
                          <span style={{ width: "30%" }}></span>
                        </div>
                        <div className="review-analytic-user">(03)</div>
                      </li>
                      <li>
                        <div className="review-analytic-count"> {product.rating >= 1 ? '1' : product.rating } star</div>
                        <div className="review-analytic-graph">
                          <span style={{ width: "10%" }}></span>
                        </div>
                        <div className="review-analytic-user">(02)</div>
                      </li>
                    </ul>
                  </div>
                  <div className="review-analytic-details-gr">
                    <h4>total reviews (38)</h4>
                    <h2>4.9</h2>
                    <div className="startReview">
                      <GrStar />
                      <GrStar />
                      <GrStar />
                      <GrStar />
                      <IoMdStarHalf />
                    </div>
                    <p>your average rating star</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="reviewContainer p-3">
                <h3>customer review</h3>
                <ul className="review-list mt-3">
                  <li className="review-item">
                    <div className="review-group">
                      <div className="review-data card shadow p-3">
                        <div className="review-head">
                          <div className="review-user">
                            <div className="user-avatar">
                              <img
                                src="https://th.bing.com/th/id/OIP.c971SFkTAdWQvF65WSJTLgHaEY?r=0&rs=1&pid=ImgDetMain"
                                alt="user-review"
                              />
                            </div>
                            <div className="duel-text">
                              <h3 className="mc-duel-text-title">
                                miron mahmud
                              </h3>
                              <p className="mc-duel-text-descrip">
                                25 minutes ago!
                              </p>
                            </div>
                          </div>
                          <div className="review-reply">
                            <button className="reply-btn shadow-sm border-0">
                              <MdReply />
                              <span>reply</span>
                            </button>
                          </div>
                        </div>
                        <div className="review-star">
                          <GrStar />
                          <GrStar />
                          <GrStar />
                          <GrStar />
                          <IoMdStarHalf />
                        </div>
                        <p className="review-describe">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Ex minus cumque labore omnis eligendi ea magni
                          nobis eum corrupti suscipit amet minima quos sint,
                          dolor excepturi numquam esse voluptates est.
                        </p>
                      </div>
                    </div>
                    <ul className="mt-3">
                      <li>
                        <div className="review-group">
                          <div className="review-data card shadow p-3">
                            <div className="review-head">
                              <div className="review-user">
                                <div className="user-avatar">
                                  <img
                                    src="https://th.bing.com/th/id/OIP.c971SFkTAdWQvF65WSJTLgHaEY?r=0&rs=1&pid=ImgDetMain"
                                    alt="user-review"
                                  />
                                </div>
                                <div className="duel-text">
                                  <h3 className="mc-duel-text-title">
                                    miron mahmud
                                  </h3>
                                  <p className="mc-duel-text-descrip">
                                    25 minutes ago!
                                  </p>
                                </div>
                                <span className="review-admin">admin</span>
                              </div>
                              <div className="review-reply">
                                <button className="reply-btn shadow-sm border-0">
                                  <MdReply />
                                  <span>reply</span>
                                </button>
                              </div>
                            </div>
                            <div className="review-star">
                              <GrStar />
                              <GrStar />
                              <GrStar />
                              <GrStar />
                              <IoMdStarHalf />
                            </div>
                            <p className="review-describe">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Ex minus cumque labore omnis
                              eligendi ea magni nobis eum corrupti suscipit amet
                              minima quos sint, dolor excepturi numquam esse
                              voluptates est.
                            </p>
                          </div>
                        </div>
                      </li>
                      <li className="mt-3">
                        <div className="review-group">
                          <div className="review-data card shadow p-3">
                            <div className="review-head">
                              <div className="review-user">
                                <div className="user-avatar">
                                  <img
                                    src="https://th.bing.com/th?id=OIF.QVB%2bYkWlrbgvhMxEIRGUXQ&w=122&h=184&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
                                    alt="user-review"
                                  />
                                </div>
                                <div className="duel-text">
                                  <h3 className="mc-duel-text-title">
                                    miron mahmud
                                  </h3>
                                  <p className="mc-duel-text-descrip">
                                    25 minutes ago!
                                  </p>
                                </div>
                              </div>
                              <div className="review-reply">
                                <button className="reply-btn shadow-sm border-0">
                                  <MdReply />
                                  <span>reply</span>
                                </button>
                              </div>
                            </div>
                            <div className="review-star">
                              <GrStar />
                              <GrStar />
                              <GrStar />
                              <GrStar />
                              <IoMdStarHalf />
                            </div>
                            <p className="review-describe">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Ex minus cumque labore omnis
                              eligendi ea magni nobis eum corrupti suscipit amet
                              minima quos sint, dolor excepturi numquam esse
                              voluptates est.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="review-item mt-3">
                    <div className="review-group">
                      <div className="review-data card shadow p-3">
                        <div className="review-head">
                          <div className="review-user">
                            <div className="user-avatar">
                              <img
                                src="https://th.bing.com/th/id/OIP.c971SFkTAdWQvF65WSJTLgHaEY?r=0&rs=1&pid=ImgDetMain"
                                alt="user-review"
                              />
                            </div>
                            <div className="duel-text">
                              <h3 className="mc-duel-text-title">
                                miron mahmud
                              </h3>
                              <p className="mc-duel-text-descrip">
                                25 minutes ago!
                              </p>
                            </div>
                          </div>
                          <div className="review-reply">
                            <button className="reply-btn shadow-sm border-0">
                              <MdReply />
                              <span>reply</span>
                            </button>
                          </div>
                        </div>
                        <div className="review-star">
                          <GrStar />
                          <GrStar />
                          <GrStar />
                          <GrStar />
                          <IoMdStarHalf />
                        </div>
                        <p className="review-describe">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Ex minus cumque labore omnis eligendi ea magni
                          nobis eum corrupti suscipit amet minima quos sint,
                          dolor excepturi numquam esse voluptates est.
                        </p>
                      </div>
                    </div>
                    <ul className="mt-3">
                      <li>
                        <div className="review-group">
                          <div className="review-data card shadow p-3">
                            <div className="review-head">
                              <div className="review-user">
                                <div className="user-avatar">
                                  <img
                                    src="https://th.bing.com/th/id/OIP.c971SFkTAdWQvF65WSJTLgHaEY?r=0&rs=1&pid=ImgDetMain"
                                    alt="user-review"
                                  />
                                </div>
                                <div className="duel-text">
                                  <h3 className="mc-duel-text-title">
                                    miron mahmud
                                  </h3>
                                  <p className="mc-duel-text-descrip">
                                    25 minutes ago!
                                  </p>
                                </div>
                                <span className="review-admin">admin</span>
                              </div>
                              <div className="review-reply">
                                <button className="reply-btn shadow-sm border-0">
                                  <MdReply />
                                  <span>reply</span>
                                </button>
                              </div>
                            </div>
                            <div className="review-star">
                              <GrStar />
                              <GrStar />
                              <GrStar />
                              <GrStar />
                              <IoMdStarHalf />
                            </div>
                            <p className="review-describe">
                              Lorem ipsum dolor sit amet consectetur,
                              adipisicing elit. Ex minus cumque labore omnis
                              eligendi ea magni nobis eum corrupti suscipit amet
                              minima quos sint, dolor excepturi numquam esse
                              voluptates est.
                            </p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="review-item mt-3">
                    <div className="review-group">
                      <div className="review-data card shadow p-3">
                        <div className="review-head">
                          <div className="review-user">
                            <div className="user-avatar">
                              <img
                                src="https://th.bing.com/th/id/OIP.c971SFkTAdWQvF65WSJTLgHaEY?r=0&rs=1&pid=ImgDetMain"
                                alt="user-review"
                              />
                            </div>
                            <div className="duel-text">
                              <h3 className="mc-duel-text-title">
                                miron mahmud
                              </h3>
                              <p className="mc-duel-text-descrip">
                                25 minutes ago!
                              </p>
                            </div>
                          </div>
                          <div className="review-reply">
                            <button className="reply-btn shadow-sm border-0">
                              <MdReply />
                              <span>reply</span>
                            </button>
                          </div>
                        </div>
                        <div className="review-star">
                          <GrStar />
                          <GrStar />
                          <GrStar />
                          <GrStar />
                          <IoMdStarHalf />
                        </div>
                        <p className="review-describe">
                          Lorem ipsum dolor sit amet consectetur, adipisicing
                          elit. Ex minus cumque labore omnis eligendi ea magni
                          nobis eum corrupti suscipit amet minima quos sint,
                          dolor excepturi numquam esse voluptates est.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-12">
              <div className="review-reply-form mt-3 p-3">
                <h3 className="mb-2">Review reply form</h3>
                <div className="label-field-group">
                  <textarea name="reply" id="reply" placeholder="type here.." />
                </div>
                <button className="review-form-btn shadow-sm">
                  drop your reply
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="footer">
          <p>&copy; copyright reserved ! 2025, developer Tert codding❤️</p>
        </div>
      </div>
    </>
  );
};

export default ProductView;
