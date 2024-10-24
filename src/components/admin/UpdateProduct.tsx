import { useEffect, useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { ICategory } from "../Interface/product";
import { getCategories, updateProduct } from "../../Services/modules/auth";
import { toast } from "react-toastify";
interface MyComponentProps {
  item: any;
  fetchApi: () => void;
}
const UpdateProduct: React.FC<MyComponentProps> = ({ item, fetchApi }) => {
  const { name, price, description, stock, category, seller, images, _id } =
    item;
  const [nameUp, setNameUp] = useState<string>(name);
  const [priceUp, setPriceUp] = useState<string>(price);
  const [descriptionUp, setDescriptionUp] = useState<string>(description);
  const [stockUp, setStockUp] = useState<number>(stock);
  const [categoryUp, setCategoryUp] = useState<any>(category);
  const [sellerUp, setSellerUp] = useState<string>(seller);
  const [imagesUp, setImagesUp] = useState<any>(images || []);
  const [imagesPreviewUp, setImagesPreviewUp] = useState<any>(
    images.map((item: any) => item.url)
  );
  const [categoryProduct, setCategoryProduct] = useState<any>("");
  console.log(imagesPreviewUp);
  useEffect(() => {
    const fetchApiCategory = async () => {
      try {
        const res = await getCategories(1, 10, "");
        setCategoryProduct(res.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiCategory();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagesUp([]);
    setImagesPreviewUp([]);
    const files = event.target.files;
    console.log(files);
    if (files) {
      const fileArray = Array.from(files);
      const fileArrayBase64: string[] = [];

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          fileArrayBase64.push(base64String);
          setImagesPreviewUp((prev: any) => [...prev, base64String]); // Lưu trực tiếp các bản xem trước vào state
        };
        reader.readAsDataURL(file);
      });

      setImagesUp(fileArrayBase64); // Lưu mảng file thay vì chỉ 1 file
    }
  };
  const handleSubmitCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      name: name,
      price: price,
      description: description,
      stock: stock,
      seller: seller,
    };
    if (imagesUp) {
      data.images = imagesUp;
    }
    try {
      await updateProduct(_id, data);
      const modal = document.getElementById(
        `modal_update_${_id}`
      ) as HTMLDialogElement;
      modal.close();
      toast.success("🦄 Bạn dã cập nhật thành công!", {
        position: "top-right",
      });
      fetchApi();
      setNameUp(name);
      setPriceUp(price);
      setStockUp(stock);
      setCategoryUp(category);
      setSellerUp(seller);
      setImagesUp(images);
      setImagesPreviewUp(images.map((item: any) => item.url));
    } catch (error) {
      console.error("Tạo danh mục thất bại:", error);
    }
  };
  return (
    <>
      <span className="p-[10px] bg-blue-500 rounded-lg">
        <RiPencilFill
          className=" text-white text-[25px] "
          onClick={() => {
            const modal = document.getElementById(
              `modal_update_${_id}`
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        />
        <dialog id={`modal_update_${_id}`} className="modal">
          <div className="modal-box w-11/12 max-w-[1000px]">
            <div className="text-[20px] font-semibold py-[10px]">
              Cập nhật danh mục:
            </div>
            <form onSubmit={handleSubmitCreateProduct} className="space-y-6 ">
              <div className="grid grid-cols-2 gap-[20px]">
                {/* name */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Tên danh mục:
                  </label>
                  <div className="mt-2">
                    <input
                      type="name"
                      name="name"
                      placeholder="Tên sản phẩm"
                      required
                      value={nameUp}
                      autoComplete="name"
                      onChange={(e) => setNameUp(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                      tabIndex={1}
                    />
                  </div>
                </div>
                {/* giá */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Giá:
                  </label>
                  <div className="mt-2">
                    <input
                      type="price"
                      name="price"
                      placeholder="giá"
                      required
                      value={priceUp}
                      autoComplete="price"
                      onChange={(e) => setPriceUp(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                      tabIndex={1}
                    />
                  </div>
                </div>
                {/* số lượng */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    số lượng:
                  </label>
                  <div className="mt-2">
                    <input
                      type="number"
                      name="stock"
                      placeholder="số lượng"
                      required
                      value={stockUp}
                      min={0} // Không cho phép nhập giá trị âm
                      autoComplete="stock"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setStockUp(value >= 0 ? value : 1); // Đảm bảo giá trị không nhỏ hơn 0
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                      tabIndex={1}
                    />
                  </div>
                </div>
                {/* nhãn hiệu */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    nhãn hiệu:
                  </label>
                  <div className="mt-2">
                    <input
                      type="seller"
                      name="seller"
                      placeholder="nhãn hiệu"
                      required
                      value={sellerUp}
                      autoComplete="seller"
                      onChange={(e) => setSellerUp(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                      tabIndex={1}
                    />
                  </div>
                </div>
                {/* category */}
                <div className="mt-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Danh mục:
                  </label>
                  <select
                    id="category"
                    name="category"
                    autoComplete="limit-name"
                    value={categoryUp}
                    onChange={(e) => setCategoryUp(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {categoryProduct &&
                      categoryProduct.map((item: any) => {
                        return (
                          <option key={item._id} value={item._id}>
                            {item.categoryName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                {/* mô tả */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Mô tả:
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      autoComplete="description"
                      className=" h-[6.75rem] leading-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                      tabIndex={1}
                      name="description"
                      placeholder="mô tả"
                      value={descriptionUp}
                      onChange={(e) => setDescriptionUp(e.target.value)}
                    />
                  </div>
                </div>
                {/* img */}
                <div className="col-span-2">
                  <div className="grid grid-cols-5 gap-[10px] items-center justify-center">
                    {/* upload */}
                    <div className="flex justify-between items-center gap-[10px] col-span-1">
                      <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 flex-1 dark:border-white">
                        <div className="text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-300 dark:text-white"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                            data-slot="icon"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 px-[5px] ">
                              <span>Chọn ảnh</span>
                              <input
                                name="avatar"
                                multiple
                                type="file"
                                className="sr-only"
                                accept="iamges/*"
                                onChange={handleFileChange}
                              />
                            </label>
                          </div>
                          <p className="text-xs leading-5 text-gray-600 dark:text-white">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* previews */}
                    {imagesPreviewUp &&
                      imagesPreviewUp
                        .slice(0, 4)
                        .map((item: string, index: number) => (
                          <div
                            className="flex items-center justify-center"
                            key={index}
                          >
                            <img
                              src={item}
                              alt=""
                              className="h-[100px] object-cover ring-1 ring-violet-100 rounded"
                            />
                          </div>
                        ))}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </span>
    </>
  );
};

export default UpdateProduct;
