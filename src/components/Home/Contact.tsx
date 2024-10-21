const Contact = () => {
  return (
    <>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737884515102!2d105.73253187599384!3d21.05373098060186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1729484398360!5m2!1svi!2s"
          loading="lazy"
          className="w-[100%] h-[500px]"
        ></iframe>
        <div className="container dark:text-white">
          <div className="flex py-[20px]">
            <div className="p-[30px] flex-1 ">
              <div className="pb-[15px] border-b border-b-violet-300 flex flex-col gap-[10px]">
                <div>Mọi chi tiết xin liên hệ:</div>
                <div className="text-[18px] font-medium">
                  NHÀ HÀNG FOOD GOOD
                </div>
              </div>
              <div className="flex flex-col gap-[25px] py-[10px]">
                <div>Địa chỉ: Đại Học Công Nghiệp Hà Nội</div>
                <div>Điện thoại: +012 345 678</div>
                <div>Tư vấn & nhận tiệc: 0906.79.79.32</div>
                <div>Email: a@foodgood.com</div>
                <div>Website: https://www.foodgood.com</div>
                <div>Facebook: http://www.facebook.com/foodgood</div>
              </div>
            </div>
            <div className="p-[30px] flex-1">
              <div className="border-b border-b-violet-300 pb-[15px] text-[18px] font-medium">
                GỬI MAIL CHO CHÚNG TÔI{" "}
              </div>
              <div className="py-[20px]">
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Tên của bạn:
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Tên của bạn"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                        tabIndex={1}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Email của bạn:
                    </label>
                    <div className="mt-2">
                      <input
                        type="email"
                        placeholder="Email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                        tabIndex={1}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                    >
                      Tin nhắn:
                    </label>
                    <div className="mt-2">
                      <textarea
                        placeholder="Bạn muốn gửi gắm điều gì?"
                        required
                        autoComplete="email"
                        className=" h-[6.75rem] leading-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                        tabIndex={1}
                      />
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="primary-btn w-[20%]">
                      Gửi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
