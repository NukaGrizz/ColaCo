import React from "react";
import { useMutation } from "@apollo/client";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { BUY_SODA } from "../../utils/mutations";

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
    <div className="ccontainer">
        
        <p>{name}</p>
        <p>{description}</p>
      
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={() => buySoda(name)}>buy soda</button>
    </div>
  );
}

export default ProductItem;
