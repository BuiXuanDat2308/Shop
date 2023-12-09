import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
//import Productdetail from "../Productdetail/Productdetail";
const Card = ({ id, img, title, star, reviews, prevPrice, newPrice }) => {
  console.log("🚀 ~ file: Card.js:5 ~ Card ~ id:", id)
  const navigate = useNavigate();

  function handleBagClick(id) {
    console.log("🚀 ~ file: Card.js:8 ~ handleBagClick ~ id:", id)
    navigate(`.`);
  }
  return (
    <>
      <section className="card">
        <img src={img} alt={title} className="card-img" />
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star} {star} {star} {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <div className="bag">
             <Link to= {`/productdetail/${id}`}> <  BsFillBagFill onClick={async () => {await handleBagClick(id)}}  className="bag-icon" /> </Link>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default Card;
