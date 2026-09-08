import { Link, useParams } from "react-router-dom";
import { useGetOrderQuery } from "./ordersApi";

export const OrderItems = () => {
    const { orderId } = useParams();
    const { data, error, isLoading } = useGetOrderQuery(orderId);
    const order = data || [];
    return (
        <div>
            <p className="text-center underline font-bold py-2 text-sm md:text-xl">
                order :{orderId}
            </p>
            <div className="border sm:w-1/2  m-auto border-white">
                <div className="flex justify-around items-center text-xs md:text-lg font-bold border-b border-white">
                    <div className="w-1/3">
                        <p></p>
                    </div>
                    <div className="w-1/3">
                        <p className="">Name</p>
                        <p>Weight</p>

                    </div>
                    <div className="w-1/3 text-center">
                        <p>Quantity</p>
                        <p>Price</p>

                    </div>
                </div>
                {order.length > 0 ?
                    order.map((obj) => (
                        <div
                            className="flex justify-around items-center text-xs md:text-lg border-b border-white"
                            key={obj.id}
                        >
                            <div className="w-1/3">
                                <img src={obj.image} className="w-20 md:w-30 p-2 rounded-2xl" />
                            </div>
                            <div className="w-1/3">
                                <p className="font-bold">{obj.name}</p>
                                <p className="italic">{obj.weight}</p>
                            </div>
                            <div className="w-1/3 text-center">
                                <p>x {obj.quantity}</p>
                                <p className="font-bold">$ {obj.price}</p>
                            </div>
                        </div>
                    ))
                :   ""}
            </div>
            <Link to="../../orders" className="text-xl flex justify-center py-1 font-bold underline text-blue-700">Back</Link>
        </div>
    );
};

export default OrderItems;
