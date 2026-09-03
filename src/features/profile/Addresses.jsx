import { useState } from "react";
import QueryStateHandler from "../../components/QueryStateHandler";
import { useDeleteAddressMutation, useGetAddressesQuery, useLazyGetAddressQuery } from "./profileApi";
import AddressForm from "../../components/AddressForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const Addresses = () => {
    const { data: addressesData = [], error: addressesError, isLoading: isAddressesLoading } = useGetAddressesQuery();
    const [ deleteAddress, { isLoading: isDeleting, error: deleteError }] = useDeleteAddressMutation();
    const [loadAddressForm, setLoadAddressForm] = useState(false);
    const [addressId, setAddressId] = useState({});
    const addressFormToggle = () => {
        setLoadAddressForm(false);
    }
    const handleEditAddress = async (id = null) => {
        setAddressId(id);
        setLoadAddressForm(true);
    };

    const handleDelete = async (id) => {
        const deleteResult = await deleteAddress(id).unwrap();
    }
    return (
        <QueryStateHandler
            error={addressesError}
            isLoading={isAddressesLoading}
        >
            <div className="m-3 sm:m-5">
                <div className="text-center font-bold underline pb-5">
                    <p className="text-xl">Addresses</p>
                </div>
                {loadAddressForm ?
                    <div>
                        <AddressForm
                            addressId={addressId}
                            addressFormToggle={addressFormToggle}
                        />
                    </div>
                : addressesData.length > 0 ?
                    <section className="sm:grid sm:grid-cols-3 rounded-sm flex flex-col gap-6 p-5 justify-around bg-gray-900">
                        {addressesData.map((obj) => (
                            <div
                                key={obj.id}
                                className="w-auto p-5 bg-gray-950 rounded-xs"
                                // onClick={true ? () => null : () => 'meow'} rendering this page on cart page when placing order to choose address
                            >
                                <div className="flex justify-between">
                                    <p className="font-bold mb-1">
                                        {obj.title}
                                    </p>
                                    <div onClick={() => handleEditAddress(obj.id)}>
                                        <FontAwesomeIcon className="text-xl" icon={faPenToSquare} />
                                    </div>
                                </div>
                                <p>{obj.address_line_1}</p>
                                <p>{obj.address_line_2}</p>
                                <p>{obj.city}</p>
                                <p>{obj.state}</p>
                                <p>{obj.postal_code}</p>
                                <div className="flex justify-between">
                                    <p>
                                        {obj.country}
                                    </p>
                                    <div onClick={() => handleDelete(obj.id)}>
                                        <FontAwesomeIcon className="text-xl" icon={faTrashCan} />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div
                            className="w-auto p-5 bg-gray-950 rounded-xs flex flex-col justify-center items-center"
                            onClick={() => handleEditAddress()}
                        >
                            <div>
                                <FontAwesomeIcon
                                    className="text-3xl"
                                    icon={faCirclePlus}
                                />
                            </div>
                            <p>Add</p>
                        </div>
                        {deleteError ? <p>{deleteError.data.message}</p>: ""}
                    </section>
                :   "log in"}
            </div>
        </QueryStateHandler>
    );
};

export default Addresses;
