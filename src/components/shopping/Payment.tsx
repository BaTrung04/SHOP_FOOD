import { useState } from "react";
import cart from "../../assets/card.png";
import { useElements, useStripe } from "@stripe/react-stripe-js";
const Payment = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = () => {};
  return (
    <>
      <div className=" flex flex-col items-center justify-center mt-[20px]">
        <div className="w-[700px] ring-1 ring-violet-300 px-[50px] pb-[50px] rounded-lg shadow-lg dark:bg-gray-800">
          <div className="text-[25px] text-center py-[30px]">
            Thanh toán bằng thẻ Visa
          </div>
          <div className="flex items-center justify-center">
            <div
              className="w-[280px] h-[150px] ring-1 ring-violet-300 p-[20px] rounded-lg "
              style={{
                backgroundImage: `url(${cart})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-white mt-[70px]">
                <div>{cardNumber}</div>
                <div>
                  {expiry} / {cvc}
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div>
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Số thẻ:
              </label>
              <div className="mt-2">
                <input
                  type="cardNumber"
                  name="cardNumber"
                  placeholder="1234 1234 1234 1234"
                  required
                  value={cardNumber}
                  autoComplete="cardNumber"
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="expiry"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Hạn thẻ:
              </label>
              <div className="mt-2">
                <input
                  type="expiry"
                  name="expiry"
                  placeholder="expiry"
                  required
                  value={expiry}
                  autoComplete="MM/YY"
                  onChange={(e) => setExpiry(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Cvc:
              </label>
              <div className="mt-2">
                <input
                  type="cvc"
                  name="cvc"
                  placeholder="CVC"
                  required
                  value={cvc}
                  autoComplete="cvc"
                  onChange={(e) => setCvc(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Thanh toán
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
