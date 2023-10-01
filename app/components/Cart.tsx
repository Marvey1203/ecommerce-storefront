
import { cartCreate } from "../utils";

interface Res {
    status: any;
    body: {
        data: {
            cartCreate: {
                cart: ResData;
            };
        };
    };
}

interface ResData {
    checkoutUrl: string;
    id: string;
}

const Cart = async () => {
    const res:Res = await cartCreate()
    const resData: ResData = res.body.data.cartCreate.cart
    const local = {id: resData.id, checkoutUrl: resData.checkoutUrl}


    return <div>{local.id}</div>;
};

export default Cart;
