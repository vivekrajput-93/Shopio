import React from "react";

const Everything = () => {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-product", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="col-md-3">
        <h4 className="text-center">Filter By Category</h4>
        <div className="d-flex flex-column check">
          {categories?.map((c) => (
            <Checkbox
              key={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
              {c.name}
            </Checkbox>
          ))}
        </div>
        {/* price filter */}
        <h4 className="text-center mt-4 filter">Filter By Price</h4>
        <div className="d-flex flex-column check">
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
            {Price?.map((p) => (
              <div key={p._id}>
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>
        <div className="d-flex flex-column">
          <button
            className="btn btn-danger mt-3 btn-reset"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Everything;


import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
import { useNavigate,  } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../CSS/Home.css";
import LocalMallOutlined from "@mui/icons-material/LocalMallOutlined";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LocalAtmRoundedIcon from "@mui/icons-material/LocalAtmRounded";
import WifiProtectedSetupRoundedIcon from "@mui/icons-material/WifiProtectedSetupRounded";



// const HomePage = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useCart();
//   const [categories, setCategories] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();


//   const categoriesLimit = 4;
  

//   //get all cat
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/category/get-category");
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//     getTotal();
//   }, []);

//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   //get products
//   const getAllProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts(data.products);
//     } catch (error) {
//       setLoading(false);
//       console.log(error);
//     }
//   };

//   //getTOtal COunt
//   const getTotal = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/count-product");
//       setTotal(data?.total);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (page === 1) return;
//     loadMore();
//   }, [page]);
//   //load more
//   const loadMore = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
//       setLoading(false);
//       setProducts([...products, ...data?.products]);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const filteredProducts = products.reduce((acc, product) => {
//     if (!acc.some((item) => item.category === product.category) && acc.length < categoriesLimit) {
//       acc.push(product);
//     }
//     return acc;
//   }, []);

//   return (
//     <Layout>
//       <div className="container-fluid row mt-3">
//         <div className="home-section">
//           <img src="/assets/Main-Shoes.png" className="shoe-img" />
//           <div className="shoes-info">
//             <h2>Best Quality Shoes !</h2>
//             <h1>Fashion at Your Feet.</h1>
//             <h5>
//               Step into a world of timeless elegance and unparalleled comfort,
//               where every step embraces your unique sense of style.
//             </h5>
//             <button className="main-shoes-button">
//               {" "}
//               <LocalMallOutlined />
//               Shop Now
//             </button>
//           </div>
//         </div>
//         <div className="shoes-strip-section">
//           <section>
//             <LocalShippingRoundedIcon />
//             <span>
//             <span className="main-tag">Free Shipping</span>
//               <br />
//               Above ₹500 only
//             </span>
//           </section>
//           <section>
//             <AssignmentTurnedInRoundedIcon />
//             <span>
//             <span className="main-tag">Certified Products</span>
//               <br />
//               100% Guarantee
//             </span>
//           </section>
//           <section>
//             <LocalAtmRoundedIcon />
//             <span>
//               <span className="main-tag">Huge Savings</span>
//               <br/>
//               At lower price
//             </span>
//           </section>
//           <section>
//             <WifiProtectedSetupRoundedIcon />
//             <span>
//             <span className="main-tag">Easy Returns</span>
//               <br />
//               No Question Asked
//             </span>
//           </section>
//         </div>
//         <div className="main-product-container">
//           <h1 className="text-center best-tag">Best Selling Shoes</h1>
//           <div className="main-product-card">
//             {products?.map((p) => (
//               <div key={p._id} className="card card-product m-2" style={{ width: "18rem" }}>
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                   onClick={() => navigate(`/product/${p.slug}`)}
//                 />
//                 <div className="card-body">
//                   <h5 className="card-title">{p.name}</h5>
//                   <p className="text-center"> {p.description.substring(0, 30)}...</p>
//                   <p className="card-text"> $ {p.price}.00</p> 
                  
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="m-2 p-3">
//             {products && products.length < total && (
//               <button
//                 className="btn btn-warning btn-load"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? "Loading ..." : "Loadmore"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default HomePage;