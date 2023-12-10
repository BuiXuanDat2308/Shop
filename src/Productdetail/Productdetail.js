import './Productdetail.css'
import { useParams,Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { FaCartPlus, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { useContext } from 'react';
import { ItemContext } from '../Context/ItemContext';
function Productdetail() {
  const count2 = useContext(ItemContext)
  const params = useParams();
  const data = localStorage.getItem('data');
  // const location = useLocation();
  const [productData, setProductData] = useState(null);
  const [quantityProduct, setQuantityProduct] = useState(0);

  useEffect(() => {
    const x = JSON.parse(data)
    x.map(item=>{
      if(params.id == item.id){
        setProductData(item);
      }
    })
    //setProductData(JSON.parse(data)[params.id - 1]);

    // }
  }, []);

  if (!productData) {
    return <div>No product information available.</div>;
  }

  const { id: id, title: name, prevPrice: oldprice, newPrice: newprice, color: color, category: category, img: img } = productData;


  //productslide
  const imgs = document.querySelectorAll('.img-select11 a');
  const imgBtns = [...imgs];
  let imgId = 1;

  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const imgElement = document.querySelector('.img-showcase11 img:first-child');

    if (imgElement) {
        const displayWidth = imgElement.clientWidth;
        document.querySelector('.img-showcase11').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }
}


  window.addEventListener('resize', slideImage);
  // cart
  const getValueCart = (e) => {
    setQuantityProduct(e.target.value);
  }
  let x = {
    id: id,
    name: name,
    quantity: parseInt(quantityProduct),
    img: img,
    price: newprice
  }


 // const localStorageData = JSON.parse(localStorage.getItem('listProduct')) || [];
  //localStorage.setItem("listProduct", JSON.stringify(localStorageData));
  const addtoCart = () => {
    const localStorageData = JSON.parse(localStorage.getItem('listProduct')) || [];
    let z=1;
    if (quantityProduct > 0) {
      
      if (localStorageData.length > 0) {
        
        localStorageData.map((item) => {
          
          if (id === item.id) {
            //console.log(id,"==", item.id);
            const  quantity = parseInt(item.quantity) + parseInt(quantityProduct);
            item.quantity = quantity;
            z=0;
          }
        })
        if(z==1){
          localStorageData.push(x);
        }
         localStorage.setItem("listProduct", JSON.stringify(localStorageData));
      }
      else {
        localStorageData.push(x);
         localStorage.setItem("listProduct", JSON.stringify(localStorageData));
      }
    }
    setQuantityProduct(0);
    
  }
  return (
    <div className="card-wrapper11">
      <div className="card11">
        {/* card left */}
        <div className="product-imgs11">
          <div className="img-display11">
            <div className="img-showcase11">
              <img src={img} alt="shoe image" />
              <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt="shoe image" />
              <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt="shoe image" />
              <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt="shoe image" />
            </div>
          </div>
          <div className="img-select11">
            <div className="img-item11">
              <Link data-id={1}>
                <img src={img} alt="shoe image" />
              </Link>
            </div>
            <div className="img-item11">
              <Link data-id={2}>
                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_2.jpg" alt="shoe image" />
              </Link>
            </div>
            <div className="img-item11">
              <Link data-id={3}>
                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_3.jpg" alt="shoe image" />
              </Link>
            </div>
            <div className="img-item11">
              <Link data-id={4}>
                <img src="https://fadzrinmadu.github.io/hosted-assets/product-detail-page-design-with-image-slider-html-css-and-javascript/shoe_4.jpg" alt="shoe image" />
              </Link>
            </div>
          </div>
        </div>
        {/* card right */}
        <div className="product-content11">
          <h2 className="product-title11">{name}</h2>
          <Link className="product-link11">visit my store</Link>
          <div className="product-rating11">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star-half-alt" />
            <span>4.7(21)</span>
          </div>
          <div className="product-price11">
            <p className="last-price11">Old Price: <span>{oldprice}</span></p>
            <p className="new-price11">New Price: <span>{newprice}</span></p>
          </div>
          <div className="product-detail11">
            <h2>Chi tiết sản phẩm: </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo eveniet veniam tempora fuga tenetur placeat sapiente architecto illum soluta consequuntur, aspernatur quidem at sequi ipsa!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
            <ul>
              <li>Color: <span>{color}</span></li>
              <li>Available: <span>in stock</span></li>
              <li>Category: <span>{category}</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>
          <div className="purchase-info11">
            <input onChange={getValueCart} type="number" value={quantityProduct} min={0}  />
            <button onClick={() => { addtoCart(); count2.countItem(); }} type="button" className="btn11">
              Add to Cart <FaCartPlus className="fas fa-shopping-cart" />
            </button>
          </div>
          <div className="social-links11">
            <p>Share At: </p>
            <Link>
              <FaFacebook className="fab fa-facebook-f" />
            </Link>
            <Link>
              <FaTwitter className="fab fa-twitter" />
            </Link>
            <Link>
              <FaInstagram className="fab fa-instagram" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Productdetail