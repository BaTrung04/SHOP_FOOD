import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getAllProduct,
  getCategories,
  postProduct,
} from "../../Services/modules/auth";
import { ICategory, IProduct } from "../Interface/product";
import { toast } from "react-toastify";
import UpdateProduct from "./UpdateProduct";
import { RiSearchLine } from "react-icons/ri";

const Product = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [stock, setStock] = useState<number>(1);
  const [category, setCategory] = useState<ICategory[]>([]);
  const [seller, setSeller] = useState<string>("");
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);

  const [data, setData] = useState<any>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [categoryProduct, setCategoryProduct] = useState<any>("");

  useEffect(() => {
    const fetchApiCategory = async () => {
      try {
        const res = await getCategories(1, 10, "");
        setCategory(res.rows);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApiCategory();
  }, []);

  const fetchApi = async () => {
    try {
      const res = await getAllProduct(page, limit, keyword);

      setTotalPage(res.totalPage);
      setData(res.rows);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let delayDebounceFn: NodeJS.Timeout;
    if (keyword) {
      delayDebounceFn = setTimeout(() => {
        fetchApi();
      }, 1000);
    } else {
      fetchApi();
    }
    return () => clearTimeout(delayDebounceFn);
  }, [keyword, page, limit]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          setImagesPreview((prev: any) => [...prev, base64String]); // Lưu trực tiếp các bản xem trước vào state
        };
        reader.readAsDataURL(file);
      });

      setImages(fileArrayBase64); // Lưu mảng file thay vì chỉ 1 file
    }
  };

  const handleSubmitCreateProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    const productData: any = {
      name: name,
      price: price,
      description: description,
      stock: stock,
      seller: seller,
      category: categoryProduct,
    };

    if (images) {
      productData.images = images;
    }

    try {
      await postProduct(productData);
      const modal = document.getElementById(
        "modal_add_product"
      ) as HTMLDialogElement;
      modal.close();
      toast.success("🦄 Bạn đã tạo mới danh mục thành công!", {
        position: "top-right",
      });
      setName("");
      setPrice("");
      setDescription("");
      setStock(1);
      setImages([]);
      setImagesPreview([]);
      setSeller("");
      fetchApi();
    } catch (error) {
      console.error("Tạo danh mục thất bại:", error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    const modal = document.getElementById(
      `modal_delete_${id}`
    ) as HTMLDialogElement;
    modal.close();
    toast.success("🦄 Bạn đã xóa sản phẩm thành công!", {
      position: "top-right",
    });
    fetchApi();
  };
  return (
    <>
      <div>
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px] dark:text-white ">
          Quản lý sản phẩm
        </h1>
        <button
          type="button"
          className="primary-btn mt-[30px]"
          onClick={() => {
            const modal = document.getElementById(
              "modal_add_product"
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          Thêm sản phẩm mới
        </button>
        {/* them danh muc */}
        <dialog id="modal_add_product" className="modal">
          <div className="modal-box w-11/12 max-w-[1000px]">
            <div className="text-[20px] font-semibold py-[10px]">
              Thêm sản phẩm mới
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
                      value={name}
                      autoComplete="name"
                      onChange={(e) => setName(e.target.value)}
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
                      value={price}
                      autoComplete="price"
                      onChange={(e) => setPrice(e.target.value)}
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
                      value={stock}
                      min={0} // Không cho phép nhập giá trị âm
                      autoComplete="stock"
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setStock(value >= 0 ? value : 1); // Đảm bảo giá trị không nhỏ hơn 0
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
                      value={seller}
                      autoComplete="seller"
                      onChange={(e) => setSeller(e.target.value)}
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
                    value={categoryProduct}
                    onChange={(e) => setCategoryProduct(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    {category &&
                      category.map((item) => {
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
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
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
                    {imagesPreview &&
                      imagesPreview
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
                  Tạo mới
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <div className="mt-[20px] flex justify-between">
          <div className="sm:col-span-3 ">
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Show entries
            </label>
            <div className="mt-2">
              <select
                id="limit"
                name="limit"
                autoComplete="limit-name"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
              </select>
            </div>
          </div>
          <div className="w-[30%] relative">
            <input
              type="text"
              className="block w-[90%] rounded-2xl mr-[10px] border-0 py-1.5 px-[10px] text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-300 sm:text-sm sm:leading-6"
              placeholder="Tìm kiếm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="button"
              className="p-[10px] rounded-full hover:bg-violet-300  dark:hover:bg-gray-300 bg-violet-200 text-black dark:bg-white  dark:text-black absolute top-0 right-[44px] dark:border-0 ring-1 ring-inset ring-gray-300"
            >
              <RiSearchLine />
            </button>
          </div>
        </div>
      </div>
      {/* table */}
      <div className="mt-[40px]">
        <div className="overflow-x-auto w-[1500px]">
          <table className="table text-[16px]">
            {/* head */}
            <thead>
              <tr className="text-[18px] dark:text-gray-300">
                <th></th>
                <th>ID</th>
                <th>img</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng </th>
                <th>nhãn hiệu</th>
                <th className="text-center">mô tả</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data &&
                data.map((item: IProduct, index: number) => {
                  return (
                    <tr
                      key={item._id}
                      className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-400"
                    >
                      <th>{index + 1}</th>
                      <td>{item._id}</td>
                      <td>
                        <img
                          src={item?.images[0]?.url || ""}
                          alt="sản phẩm"
                          className="w-[50px] h-[50px] object-cover ring-1 ring-violet-300 rounded"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.stock}</td>
                      <td>{item.seller}</td>
                      <td className="max-w-[300px] ">
                        <span className="line-clamp-2">{item.description}</span>
                      </td>

                      <td className="flex gap-[10px] items-center">
                        {/* update */}
                        <UpdateProduct item={item} fetchApi={fetchApi} />
                        {/* delete */}
                        <span
                          className="p-[10px] bg-red-500 rounded-lg"
                          onClick={() => {
                            const modal = document.getElementById(
                              `modal_delete_${item._id}`
                            ) as HTMLDialogElement;
                            modal?.showModal();
                          }}
                        >
                          <FaRegTrashCan className=" text-white text-[25px]" />
                          <dialog
                            id={`modal_delete_${item._id}`}
                            className="modal"
                          >
                            <div className="modal-box">
                              <div className=" py-[10px] ">
                                <div className="text-[20px]">
                                  Bạn có chắc muốn xóa sản phẩm:{" "}
                                  <strong className="">{item.name}</strong>
                                </div>
                              </div>
                              <div className="flex justify-end items-center">
                                <button
                                  className="primary-btn  relative top-[11px] mr-[10px]"
                                  onClick={() => handleDeleteProduct(item._id)}
                                >
                                  Xóa
                                </button>
                                <div className="modal-action">
                                  <form method="dialog">
                                    <button className="primary-btn bg-gray-500">
                                      thoát
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-center mt-[30px]">
        <div className="join">
          {page > 1 && (
            <button
              className="join-item btn btn-md"
              onClick={() => setPage(page - 1)}
            >
              &lt;
            </button>
          )}
          {page > 1 && (
            <button className="join-item btn btn-md" onClick={() => setPage(1)}>
              1
            </button>
          )}
          <button className="join-item btn btn-md btn-active">{page}</button>
          {page < totalPage && (
            <button
              className="join-item btn btn-md"
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          )}
          {page < totalPage && (
            <button
              className="join-item btn btn-md"
              onClick={() => setPage(page + 1)}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
