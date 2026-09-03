import { useEffect, useState } from "react";
import {
    useAddAddressMutation,
    useGetAddressQuery,
    useUpdateAddressMutation,

} from "../features/Profile/profileApi";
import QueryStateHandler from "./QueryStateHandler";

const AddressForm = ({ addressId, addressFormToggle }) => {
    const { data, error, isLoading } = useGetAddressQuery(addressId, {
        skip: !addressId,
    });
    const result = data?.[0];
    const [ updateAddress, { isLoading: isUpdating, error: updateError }] = useUpdateAddressMutation();
    const [ addAddress, { isLoading: isAdding, error: addError }] = useAddAddressMutation();
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        post: "",
        country: "",
        type: null,
    });

    useEffect(() => {
        if (result) {
            setFormData({
                type: "Edit",
                id: result.id || "",
                title: result.title || "",
                addressLine1: result.address_line_1 || "",
                addressLine2: result.address_line_2 || "",
                city: result.city || "",
                state: result.state || "",
                post: result.postal_code || "",
                country: result.country || "",
            });
        }
    }, [result]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleOnSubmit = async (e) => {
        const { value } = e.target;
        let body = {
                title: formData.title,
                address_line_1: formData.addressLine1,
                address_line_2: formData.addressLine2,
                city: formData.city,
                state: formData.state,
                postal_code: formData.post,
                country: formData.country,
            }
        if (value === "Edit") {
            body = {
                ...body,
                id: formData.id
            }
            const updateResult = await updateAddress(body).unwrap();
        } else {
            const addResult = await addAddress(body).unwrap();
        }
        addressFormToggle();
    }

    return (
        <QueryStateHandler isLoading={isLoading} error={error} className="flex flex-col items-center sm:w-8/12 m-auto rounded-xl bg-gray-900">
            <div className="flex flex-col items-center sm:w-8/12 m-auto rounded-xl bg-gray-900">

            <div className="p-3 font-bold ">
                <p>Address Form</p>
            </div>
            <form  className=" w-full sm:w-10/12 mb-4">
                <div className="flex flex-col  border rounded-md bg-gray-950">
                    <div className="grid grid-cols-2 p-1 sm:px-3 sm:pt-4 sm:py-2 ">
                        <label htmlFor="title">Title</label>
                        <input
                            className="border rounded-sm"
                            type="text"
                            name="title"
                            id="title"
                            maxLength="50"
                            onChange={handleChange}
                            value={formData.title}
                            ></input>
                    </div>
                    <div className="grid grid-cols-2 p-1 sm:px-3 sm:py-2 ">
                        <label htmlFor="addressLine1">Address Line 1 *</label>
                        <input
                            className="border rounded-sm"
                            type="text"
                            name="addressLine1"
                            id="addressLine1"
                            required
                            maxLength="255"
                            onChange={handleChange}
                            value={formData.addressLine1}
                            ></input>
                    </div>
                    <div className="grid grid-cols-2 p-1 sm:px-3 sm:py-2 ">
                        <label htmlFor="addressLine2">Address Line 2</label>
                        <input
                            className="border rounded-sm"
                            type="text"
                            name="addressLine2"
                            id="addressLine2"
                            maxLength="255"
                            onChange={handleChange}
                            value={formData.addressLine2}
                            ></input>
                    </div>
                    <div className="grid grid-cols-2 p-1 sm:px-3 sm:py-2 ">
                        <label htmlFor="city">City *</label>
                        <input
                            className="border rounded-sm"
                            type="text"
                            name="city"
                            id="city"
                            maxLength="100"
                            onChange={handleChange}
                            value={formData.city}
                            required
                        ></input>
                    </div>
                    <div className="grid grid-cols-2 p-1 sm:px-3 sm:py-2 ">
                        <label htmlFor="state">State *</label>
                        <input
                            className="border rounded-sm"
                            type="text"
                            name="state"
                            id="state"
                            maxLength="100"
                            onChange={handleChange}
                            value={formData.state}
                            required
                        ></input>
                    </div>
                    <div className="grid grid-cols-2 p-1 sm:px-3 sm:py-2 ">
                        <label htmlFor="post">Post *</label>
                        <input
                            className="border rounded-sm"
                            type="number"
                            name="post"
                            id="post"
                            maxLength="6"
                            onChange={handleChange}
                            value={formData.post}
                            required
                        ></input>
                    </div>
                    <div className="grid grid-cols-2 p-1 sm:px-3 sm:py-2 ">
                        <label htmlFor="country">Country *</label>
                        <input
                            className="border rounded-sm"
                            type="text"
                            name="country"
                            id="country"
                            maxLength="100"
                            onChange={handleChange}
                            value={formData.country}
                            required
                        ></input>
                    </div>
                    <div className="grid grid-cols-2 justify-items-center p-1 sm:px-3 sm:py-2 sm:pb-5 ">
                        <input
                            type="button"
                            value={formData.type ? formData.type : "Submit"}
                            className="border rounded-sm px-3 bg-green-800"
                            onClick={handleOnSubmit}
                            disabled={isUpdating}
                        ></input>
                        <input
                            type="button"
                            value="Cancel"
                            onClick={addressFormToggle}
                            className="border rounded-sm px-3 bg-red-800"
                        ></input>
                    </div>
                </div>
            </form>
                            </div>
        </QueryStateHandler>
    );
};

export default AddressForm;
