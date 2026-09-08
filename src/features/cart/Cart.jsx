import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QueryStateHandler from "../../components/QueryStateHandler";
import {
    useDeleteFromCartMutation,
    useGetCartQuery,
    useUpdateCartMutation,
} from "./cartApi";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAddOrderMutation } from "../Orders/ordersApi";
import Addresses from "../Profile/Addresses";
import { Link } from "react-router-dom";

export const Cart = () => {
    const [addressList, setAddressList] = useState(false);
    const [address, setAddress] = useState({ id: null, addressLine1: null, title: null });
    const {
        data: cartData,
        error,
        isLoading,
    } = useGetCartQuery();
    const cart = cartData?.cart || [];
    const cartTotal = cartData?.cartTotal || 0;
    const [updateCart, { error: updateCartError, isLoading: cartUpdating }] =
        useUpdateCartMutation();
    const [
        deleteFromCart,
        { error: deleteFromCartError, isLoading: deletingFromCart },
    ] = useDeleteFromCartMutation();
    const [placeOrder, { error: placeOrderError, isLoading: placingOrder }] =
        useAddOrderMutation();
    const handlePlusQuantity = async (obj) => {
        if (obj.quantity > 0) {
            const result = await updateCart({
                product_id: obj.id,
                quantity: obj.quantity + 1,
            }).unwrap();
        }
    };
    const handleMinusQuantity = async (obj) => {
        if (obj.quantity > 1) {
            const result = await updateCart({
                product_id: obj.id,
                quantity: obj.quantity - 1,
            }).unwrap();
        } else {
            const result = await deleteFromCart(obj.id).unwrap();
        }
    };

    const handleAddressClick = async ({ id, addressLine1, title }) => {
        setAddress({
            id,
            addressLine1,
            title,
        });
        handleAddressList();
    };

    const handleAddressList = () => {
        addressList ? setAddressList(false) : setAddressList(true);
    };

    const handlePlaceOrderClick = async () => {
        if(!address.id) {
           return setAddressList(true);
        }
        const placeOrderResult = await placeOrder(address.id).unwrap();
        console.log(placeOrderResult);
    };

    return (
        <QueryStateHandler error={error} isLoading={isLoading}>
            <p className="text-center font-bold underline text-sm sm:text-2xl mb-2 mt-1">
                Cart
            </p>
            <div className="flex flex-col justify-center text-center w-full sm:w-1/2 text-xs sm:text-lg m-auto bg-gray-950">
                <div className="flex gap-4 justify-around text-left border border-white">
                    <div className="w-20 sm:w-25"></div>
                    <div className="w-1/3">
                        <p>Product Name</p>
                        <p>Size</p>
                    </div>
                    <div className="w-1/3 text-center">
                        <p>Quantity</p>
                        <p>Price</p>
                    </div>
                </div>
                {cart.length > 0 ?
                    cart.map((obj) => (
                        <div
                            key={obj.id}
                            className="flex gap-4 justify-around items-center border border-white"
                        >
                            <div>
                                <img
                                    className="w-20 sm:w-25 p-1 sm:p-2 rounded-2xl"
                                    src={obj.image}
                                    alt={obj.name}
                                />
                            </div>
                            <div className="w-1/3 text-left">
                                <p className="font-medium">{obj.name}</p>
                                <p className="sm:text-sm">{obj.weight}</p>
                            </div>
                            <div className="  w-1/3 ">
                                <div className="flex  justify-center items-center gap-2 py-1">
                                    <FontAwesomeIcon
                                        className="bg-red-800 rounded-sm p-1"
                                        onClick={() => handleMinusQuantity(obj)}
                                        icon={faSquareMinus}
                                    />
                                    {obj.quantity}
                                    <FontAwesomeIcon
                                        className="bg-green-900 rounded-sm p-1"
                                        onClick={() => handlePlusQuantity(obj)}
                                        icon={faSquarePlus}
                                    />
                                </div>
                                <p className=" font-bold text-md sm:text-xl italic">
                                    $ {obj.price}
                                </p>
                            </div>
                        </div>
                    ))
                :   <div className="flex justify-center gap-2 items-center border border-white py-2">
                        <p>Cart is Empty</p>
                        <Link to="../../products" className="underline text-blue-700">Shop</Link>
                    </div>
                }
                <div className="flex justify-around text-base font-bold py-2 border border-white">
                    <p>Total</p>
                    <p className="sm:text-xl ">$ {cartTotal}</p>
                </div>
            </div>
            {addressList ?
                <div className="w-full">
                    <Addresses
                        handleAddressClick={handleAddressClick}
                    ></Addresses>
                    <p className="text-center pb-2 text-red-400" onClick={handleAddressList}>Choose Address</p>
                </div>
            :   <div>
                    {
                        address.id ?
                        <div className="flex flex-col sm:flex-row text-center sm:justify-around text-sm sm:text-base sm:w-1/2 m-auto py-2 border border-white bg-gray-950">
                            <p>Deliver to: </p>
                            <p>{address.title || ""}</p>
                            <p>{address.addressLine1}</p>
                            <p onClick={handleAddressList} className="text-blue-500 underline">Change</p>
                        </div>
                        :
                        <div className="flex sm:w-1/2 m-auto border justify-center text-center border-white">
                        <p onClick={handleAddressList} className=" p-2 text-red-400">Choose Address</p>
                        </div>
                    }
                </div>
            }
            <div className="flex justify-center text-base sm:w-1/2 m-auto py-2 border border-white bg-amber-400">
                <button name="place order" className="font-bold" disabled={cart.length <= 0} onClick={handlePlaceOrderClick}>
                    { placingOrder ? "Placing Order" : "Place Order"}
                </button>
            </div>
        </QueryStateHandler>
    );
};

export default Cart;
