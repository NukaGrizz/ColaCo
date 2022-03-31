import React, { useEffect , useState } from "react";
import ProductItem from "../ProductItem";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import spinner from "../../assets/spinner.gif";
import sodaGirl from '../../assets/soda-g660b20d09_1920.jpg';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if(data) {
      dispatch({
          type: UPDATE_PRODUCTS,
          products: data.products
        });
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
         products: products
       });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(product => product.category._id === currentCategory);
  }

  return (
    <div className="width">
      <div className="container justify high">
        <img className="img" src={sodaGirl} alt="Soda Girl" />
        <div className="headAd" >
          <h1 className="styleizeTitle">ColaCo</h1>
        
          <div className="container justify moneyBox " >
          <div className="moneyStats">
            <p >Money: </p>
            <p>$ {count}</p>
          </div>
          <button className="addMoneyBut padding" onClick={() => setCount(count + .25)}>Add Money</button>
        </div></div>
      </div>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  description ={product.description}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  count={count}
                  subtract={diff => setCount(count + diff)}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;