import React from "react";
import { useMutation } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { BUY_SODA } from "../../utils/mutations";
import sodaBottle from '../../assets/cola-bottle.png';

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const [getSoda] = useMutation(BUY_SODA);

  const {
    count,
    description,
    name,
    _id,
    price,
    quantity
  } = item;

  const { cart } = state

  let backgoundStyle = {
    backgroundImage: `url(${sodaBottle})`,
    backgroundSize: "90%",
    backgroundRepeat: "no-repeat"
  };

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(content, null, 2)], {type : contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
   }

  async function buySoda(name) {
    //do you have enough money
    if(count<price){
      alert("not enough money")
    } else {
    let saleArry = await getSoda({variables: {name}})
    if(saleArry.data.buyProduct.quantity == 0 || saleArry.data.buyProduct.quantity == null ) {
      alert("SOLDOUT")
    } else {
      item.subtract(-price)
      let sodaObject = {
        name : saleArry.data.buyProduct.name,
        description : saleArry.data.buyProduct.description,
        price : saleArry.data.buyProduct.price,
        maximumQuantity : saleArry.data.buyProduct.maximumQuantity
      }
      download(sodaObject, sodaObject.name, 'application/json')
    }
    //if no good report sold out
  
    }
  }

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="itemContainer">
        <div className="iteminfo">
          <p className="styleizeText" style={ backgoundStyle }>{name}</p>
          <p>{description}</p>
        </div>
      <div className="buySide">
        <div>STOCK: {quantity} </div>
        <div>COST: ${price}</div>
        <button className="buttonSoda" onClick={() => buySoda(name)}>Buy {name}</button>
      </div>
      
    </div>
  );
}

export default ProductItem;
