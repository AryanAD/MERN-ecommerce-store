import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ address, city, country, postalCode }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={handleSubmit} className="w-[40rem]">
          <h1 className="mb-4 text-2xl fo nt-semibold">Shipping</h1>
          <div className="mb-4">
            <label className="block mb-2">Address</label>
            <input
              required
              type="text"
              value={address}
              placeholder="Enter Address"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">City</label>
            <input
              required
              type="text"
              value={city}
              placeholder="Enter City Name"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Postal Code</label>
            <input
              required
              type="text"
              value={postalCode}
              placeholder="Enter Postal Code"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Country</label>
            <input
              required
              type="text"
              value={country}
              placeholder="Enter Country"
              className="w-full p-2 border rounded-md"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Select Payment Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="PayPal"
                  name="paymentMethod"
                  className="text-green-400 form-radio"
                  checked={paymentMethod === "PayPal"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span className="ml-2">Paypal or Credit Card</span>
              </label>
            </div>
          </div>
          <button className="w-full px-4 py-2 font-semibold text-center text-white uppercase bg-green-500 rounded-full text-md focus:ring-4 focus:outline-none focus:ring-green-300 hover:bg-green-700">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
