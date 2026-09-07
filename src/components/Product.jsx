import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    useAddToCartMutation,
    useDeleteFromCartMutation,
    useUpdateCartMutation,
} from "../features/Cart/cartApi";
import { faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export const Product = ({ product }) => {
    const [updateCart, { error: updateCartError, isLoading: cartUpdating }] =
        useUpdateCartMutation();
    const [addToCart, { error: addToCartError, isLoading: addingToCart }] =
        useAddToCartMutation();
    const [
        deleteFromCart,
        { error: deleteFromCartError, isLoading: deletingFromCart },
    ] = useDeleteFromCartMutation();

    const handlePlusQuantity = async () => {
        if (product.quantity > 0) {
            const result = await updateCart({ product_id: product.id, quantity: (product.quantity + 1)}).unwrap();
        } else {
            const result = await addToCart({ product_id: product.id, quantity: (product.quantity + 1)}).unwrap();
        }
    };
    const handleMinusQuantity = async () => {
        if (product.quantity > 1) {
            const result = await updateCart({ product_id: product.id, quantity: (product.quantity - 1)}).unwrap();
        } else {
            const result = await deleteFromCart(product.id).unwrap();
        }
    };

    return (
        <div
            id={product.id}
            className=" p-2 text-sm sm:text-lg rounded-xs flex flex-col bg-black"
        >
            <div className="">
                <img className="" src={product.image} alt={product.name} />
            </div>
            <div className="pt-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:pb-2">
                    <p>{product.name}</p>
                    <p className="text-right font-bold border-y border-white sm:border-none italic">
                        Price {product.price}
                    </p>
                </div>
                <div className="flex justify-between py-1 sm:border-t">
                    <p className="">{product.weight}</p>
                        <div className=" bg-green-900 rounded-sm sm:rounded-sm border border-white">

                        {product.quantity >= 1 ?
                            <div className="flex sm:gap-1 justify-center items-center">
                                <FontAwesomeIcon onClick={handleMinusQuantity} icon={faSquareMinus} />
                                <p>{product.quantity}</p>
                                <FontAwesomeIcon onClick={handlePlusQuantity} icon={faSquarePlus} />
                            </div>
                        :   <p className="px-1" onClick={handlePlusQuantity}>Add</p>}
                        </div>
                    
                </div>
                <p className="border-t border-white text-xs sm:py-3 sm:text-base italic">
                    {product.description}
                </p>
            </div>
        </div>
    );
};

export default Product;
