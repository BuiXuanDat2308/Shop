import './Sidebar.css';
import Catetory from './Catetory/Catetory'
import Color from './Colors/Color'
import Price from './Price/Price'
function Sidebar(prop) {
  const handleChange = prop.handleChange;
  const handleChangeColor = prop.handleChangeColor
  const handleChangePrice = prop.handleChangePrice
  return (
    <>
    <section className='sidebar'>
        <div className='logo-container'>
            <h1>🛒</h1>
        </div>
        <Catetory handleChange = {handleChange}/>
        <Price handleChange = {handleChangePrice}/>
        <Color handleChange = {handleChangeColor}/>
    </section>
    </>
  )
}
export default Sidebar
