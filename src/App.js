import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navigation from './Navigation/Nav';
import Product from './Products/Product';
import Recommended from './Recommended/Recommended';
import Sidebar from './Sidebar/Sidebar';
import './index.css'
import Card from './component/Card';
import { AiFillStar } from "react-icons/ai";
import Login from './Login/Login';
import PrivateRoute from './Routes/PrivateRoute';
import Productdetail from './Productdetail/Productdetail';
import { ItemProvider } from './Context/ItemContext';
import Payment from './Payment/Payment';
import Admin from './admin/Admin';
// import data from './db/data';
// localStorage.setItem('data', JSON.stringify(data));
function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [products, setProducts] = useState([]);


  //input filter
  const [query, setQuery] = useState("")
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }
  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleChangeColor = (event) => {
    setSelectedColor(event.target.value)
  }
  const handleChangePrice = (event) => {
    setSelectedPrice(event.target.value)
  }
  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCompany(event.target.value);
  };
  //local strorage
  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được tải lần đầu
    let storedList = localStorage.getItem("data");
    console.log("🚀 ~ file: App.js:41 ~ useEffect ~ storedList:", typeof storedList)
    if (storedList) {
      setProducts(JSON.parse(storedList));
    }
  }, []); // Chỉ chạy một lần khi component được tải
  //check giá
  function pricecheck(price) {
    if (parseInt(price) <= 50) {
      return "50";
    }
    else if (parseInt(price) > 50 && parseInt(price) <= 100) {
      return "100";
    }
    else if (parseInt(price) > 100 && parseInt(price) <= 150) {
      return "150";
    }
    else {
      return "200";
    }
  }
  function filteredData(products, selectedCategory, selectedColor, selectedCompany, selectedPrice, query) {


    const data = products.filter(item => {
      let a = true, b = true, c = true, d = true, name = true;
      if (selectedCategory) {
        a = item.category === selectedCategory;
      }
      if (selectedColor) {
        b = item.color === selectedColor;
      }
      if (selectedCompany) {
        c = item.company === selectedCompany;
      }
      if (selectedPrice) {
        d = pricecheck(item.newPrice) === `${selectedPrice}`;
      }

      if (query) {
        name = item.title.includes(query);
      }

      return a && b && c && d & name;
    })

    return data.map((item, index) => (
      <Card
        id={item.id}
        key={index} // Sử dụng index như key
        img={item.img}
        title={item.title}
        star={<AiFillStar className="rating-star" />}
        reviews={item.reviews}
        prevPrice={item.prevPrice}
        newPrice={item.newPrice}
      />
      // console.log(item)
    ));
  }

  let result = [...filteredData(products, selectedCategory, selectedColor, selectedCompany, selectedPrice, query)];

  return (

    <Router>
      <ItemProvider>
        <Routes>
          <Route path="/" element={<Login  />} />

          {/* Sử dụng PrivateRoute cho các route được bảo vệ */}
          <Route
            path="/home"
            element={<PrivateRoute>
              <>
                <Sidebar
                  handleChangeColor={handleChangeColor}
                  handleChangePrice={handleChangePrice}
                  handleChange={handleChange}
                />
                <Navigation query={query} handleInputChange={handleInputChange} />
                <Recommended handleClick={handleClick} />
                <Product result={result} />
              </>
            </PrivateRoute>}
          />

          <Route
            path="/productdetail/:id"
            element={<PrivateRoute>
              <>
                <Navigation query={query} handleInputChange={handleInputChange} />
                <Productdetail />
              </>
            </PrivateRoute>}
          />

          <Route path="*" element={<h1>Unauthorized</h1>} />

          <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path='/admin' element = {<PrivateRoute><Admin /></PrivateRoute>}/>
        </Routes>
      </ItemProvider>
    </Router>

  );
}
export default App;
