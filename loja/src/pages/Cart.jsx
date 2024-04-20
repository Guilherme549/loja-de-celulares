import React, { useState } from 'react';
import { BsCartDashFill } from "react-icons/bs";
import { getItem, removeItemFromCart } from '../services/LocalStorageFuncs';

export const Cart = () => {
    const [data, setData] = useState(getItem('carrinhoYT') || [])

    const removeItem = (obj) => {
        const arrFilter = data.filter((e) => e.id !== obj.id)
        setData(arrFilter)
        removeItemFromCart('carrinhoYT', arrFilter)
    }

    return (
        <div>
            <h1>Cart</h1>
            <div>
                {
                    data.map((e) => (
                        <div key={e.id}>
                            <h4>{e.title}</h4>
                            <img src={e.thumbnail} alt="" />
                            <h4>{`R$ ${e.price}`}</h4>
                            <button onClick={() => removeItem(e)}>
                                <BsCartDashFill/>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};


export default Cart;