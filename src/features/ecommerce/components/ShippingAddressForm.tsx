import { useForm } from "react-hook-form";

export interface ShippingAddressProps {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: number;
  country: string;
}

function ShippingAddressForm({
  onSubmit,
}: {
  onSubmit: (data: ShippingAddressProps) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShippingAddressProps>({
    mode: "onChange",
  });

  const handleFormSubmit = async (data: ShippingAddressProps) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-semibold mb-4">Shipping Address</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Address Line 1 */}
        <div>
          <input
            type="text"
            {...register("addressLine1", {
              required: "Address Line 1 is required",
            })}
            placeholder="Address Line 1"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm">
              {errors.addressLine1.message}
            </p>
          )}
        </div>

        {/* Address Line 2 */}
        <div>
          <input
            type="text"
            {...register("addressLine2")}
            placeholder="Address Line 2 (Optional)"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            {...register("city", { required: "City is required" })}
            placeholder="City"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        {/* State */}
        <div>
          <input
            type="text"
            {...register("state", { required: "State is required" })}
            placeholder="State"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        {/* Pincode */}
        <div>
          <input
            type="number"
            {...register("pincode", {
              required: "Pincode is required",
              minLength: { value: 6, message: "Pincode must be 6 digits" },
            })}
            placeholder="Pincode"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm">{errors.pincode.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <input
            type="text"
            {...register("country", { required: "Country is required" })}
            placeholder="Country"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ShippingAddressForm;
