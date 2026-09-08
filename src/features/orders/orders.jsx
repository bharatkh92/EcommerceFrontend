import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDeleteOrderMutation, useGetOrdersQuery } from "./ordersApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import QueryStateHandler from "../../components/QueryStateHandler";

export const Orders = () => {
    const { data: ordersData, error, isLoading } = useGetOrdersQuery();
    const [ deleteOrder, { error: deleteOrderError, isLoading: deleting }] = useDeleteOrderMutation();
    const orders = ordersData || [];

    const handleDeleteClick = async(id) => {
        const result = await deleteOrder(id).unwrap();
        console.log(result);
    }
    return (
        <QueryStateHandler error={error} isLoading={isLoading}>
            <p className="text-center pb-2 font-bold sm:text-2xl underline">Orders</p>
            <div className="flex flex-col text-sm sm:text-xl ">
                <div className="flex gap-1 sm:gap-3 px-1 justify-center py-1 font-bold border-y items-center border-white">
                    <p className="w-1/12">Id</p>
                    <p className="w-2/12">Date</p>
                    <p className="w-4/12">Shipping Address</p>
                    <p className="w-2/12">Total Amount</p>
                    <p className="w-2/12 sm:pl-10">Status</p>
                    <p className="w-1/12"></p>
                </div>
                {orders.length > 0 ?
                    orders.map((obj) => (
                        <div key={obj.id} className="flex gap-1 px-1 border-b items-center border-white sm:gap-3">
                            <Link to={`${obj.id}`} className="w-1/12 py-1 text-blue-600 underline">{obj.id}</Link>
                            <p className="w-2/12 py-1">
                                {new Date(obj.order_date).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    },
                                )}
                            </p>
                            <p className="w-4/12 py-1">{obj.shipping_address || " "}</p>
                            <p className="w-2/12 py-1">$ {obj.total_price}</p>
                            <p className="w-2/12 py-1">{obj.status}</p>
                            <FontAwesomeIcon className="w-1/12 py-1 text-red-700" onClick={() => handleDeleteClick(obj.id)} icon={faTrashCan} />
                        </div>
                    ))
                :   <div className="flex text-center py-2">
                        <p>Empty</p>
                    </div>
                }
            </div>
        </QueryStateHandler>
    );
};

export default Orders;
