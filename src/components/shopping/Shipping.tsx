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

  const loadSuggestions = (key: string) =>
    JSON.parse(localStorage.getItem(key) || "[]");

  const saveSuggestion = (key: string, value: string) => {
    const existingSuggestions = loadSuggestions(key);
    if (!existingSuggestions.includes(value)) {
      existingSuggestions.push(value);
      localStorage.setItem(key, JSON.stringify(existingSuggestions));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(shipInfo({ address, city, phone, code, nation }));
    saveSuggestion("addressSuggestions", address);
    saveSuggestion("citySuggestions", city);
    saveSuggestion("phoneSuggestions", phone);
    saveSuggestion("codeSuggestions", code);
    saveSuggestion("nationSuggestions", nation);
    navigate("/ship/confirm");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-[20px]">
        <div className="md:w-[700px] w-[100%] ring-1 ring-violet-300 md:px-[50px] px-[10px] pb-[50px] rounded-lg shadow-lg dark:bg-gray-800">
          <div className="text-[25px] text-center py-[30px]">
            Thông tin vận chuyển
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 ">
            {/* Input cho địa chỉ */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Địa chỉ:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="address"
                  placeholder="address"
                  required
                  value={address}
                  list="addressSuggestions"
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={1}
                />
                <datalist id="addressSuggestions">
                  {loadSuggestions("addressSuggestions").map(
                    (suggestion: any, index: number) => (
                      <option key={index} value={suggestion} />
                    )
                  )}
                </datalist>
              </div>
            </div>

            {/* Input cho thành phố */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Thành phố:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  placeholder="city"
                  required
                  value={city}
                  list="citySuggestions"
                  onChange={(e) => setCity(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={2}
                />
                <datalist id="citySuggestions">
                  {loadSuggestions("citySuggestions").map(
                    (suggestion: any, index: number) => (
                      <option key={index} value={suggestion} />
                    )
                  )}
                </datalist>
              </div>
            </div>

            {/* Input cho số điện thoại */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Số điện thoại:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  placeholder="phone"
                  required
                  value={phone}
                  list="phoneSuggestions"
                  onChange={(e) => setPhone(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={3}
                />
                <datalist id="phoneSuggestions">
                  {loadSuggestions("phoneSuggestions").map(
                    (suggestion: any, index: number) => (
                      <option key={index} value={suggestion} />
                    )
                  )}
                </datalist>
              </div>
            </div>

            {/* Input cho mã bưu chính */}
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Mã bưu chính:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="code"
                  placeholder="code"
                  required
                  value={code}
                  list="codeSuggestions"
                  onChange={(e) => setCode(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={4}
                />
                <datalist id="codeSuggestions">
                  {loadSuggestions("codeSuggestions").map(
                    (suggestion: any, index: number) => (
                      <option key={index} value={suggestion} />
                    )
                  )}
                </datalist>
              </div>
            </div>

            {/* Input cho quốc gia */}
            <div>
              <label
                htmlFor="nation"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Quốc gia:
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="nation"
                  placeholder="nation"
                  required
                  value={nation}
                  list="nationSuggestions"
                  onChange={(e) => setNation(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                  tabIndex={5}
                />
                <datalist id="nationSuggestions">
                  {loadSuggestions("nationSuggestions").map(
                    (suggestion: any, index: number) => (
                      <option key={index} value={suggestion} />
                    )
                  )}
                </datalist>
              </div>
            </div>

            {/* Nút tiếp tục */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
