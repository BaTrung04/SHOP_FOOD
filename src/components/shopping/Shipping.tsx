import { useState } from "react";
import { useDispatch } from "react-redux";
import { shipInfo } from "../../redux/shipSlice";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [nation, setNation] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(shipInfo({ address, city, phone, code, nation }));
  };
  return (
    <>
      <div className=" flex flex-col items-center justify-center mt-[20px]">
        <div className="w-[700px] ring-1 ring-violet-300 px-[50px] pb-[50px] rounded-lg shadow-lg dark:bg-gray-800">
          <div className="text-[25px] text-center py-[30px]">
            Thông tin vận chuyển
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Địa chỉ:
              </label>
              <div className="mt-2">
                <input
                  type="address"
                  name="address"
                  placeholder="address"
                  required
                  value={address}
                  autoComplete="email"
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Thành phố:
              </label>
              <div className="mt-2">
                <input
                  type="city"
                  name="city"
                  placeholder="city"
                  required
                  value={city}
                  autoComplete="city"
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Số điện thoại:
              </label>
              <div className="mt-2">
                <input
                  type="phone"
                  name="phone"
                  placeholder="phone"
                  required
                  value={phone}
                  autoComplete="phone"
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Mã bưu chính:
              </label>
              <div className="mt-2">
                <input
                  type="code"
                  name="code"
                  placeholder="code"
                  required
                  value={code}
                  autoComplete="code"
                  onChange={(e) => setCode(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="na"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Quốc gia:
              </label>
              <div className="mt-2">
                <input
                  type="nation"
                  name="nation"
                  placeholder="nation"
                  required
                  value={nation}
                  autoComplete="nation"
                  onChange={(e) => setNation(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => navigate("/ship/confirm")}
              >
                Tiếp tục
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
