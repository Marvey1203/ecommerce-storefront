'use client'
import {useEffect, useState } from "react";
interface CartData {
    data:{
        data:{
            cartCreate:{
                cart:{
                    id: string;
                }
            }
        }
    }
    
}
const Cart = ({checkCartFunc}:any) => {
    const [cartData, setCartData] = useState<CartData | null>(null);
    const [CartOpen, setCartOpen] = useState(true)
    useEffect(() => {
      checkCartFunc(CartOpen)
    }, [CartOpen])
    
    checkCartFunc(CartOpen)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('/cart/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              // Your cartInput data if needed
            }),
          });
  
          if (response.ok) {
            const data: CartData = await response.json();
            setCartData(data);
            
          } else {
            console.error('Error fetching data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      fetchData();
      
    }, []); // Empty dependency array ensures useEffect runs once after initial render
    useEffect(() => {
        if (cartData !== null) {
            if(window.localStorage.getItem("CartIdIt")){
                return
            }else{
                window.localStorage.setItem("CartIdIt", cartData.data.data.cartCreate.cart.id);
            }
        }
      }, [cartData]);
    if(!CartOpen){
        return <div></div> 
    }
    
    return(
        <div className="w-full md:w-1/2 z-10 absolute top-0 right-0 bg-black text-white gap-5 h-screen">
            <div className="w-full flex justify-end">
                <button onClick={() => setCartOpen(false)}>
                    <svg className="w-8 text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <h3>Items in your cart</h3>
            <div>

            </div>
            <p>Your cart total:</p>
        </div>
    )
  };
  
  export default Cart;
  