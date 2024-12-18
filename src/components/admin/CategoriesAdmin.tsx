import { RiSearchLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {
  createCategories,
  deleteCategories,
  getCategories,
} from "../../Services/modules/auth";
import { ICategory } from "../Interface/product";
import UpdateCategories from "./UpdateCategories";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { RiFileExcel2Line } from "react-icons/ri";

const CategoriesAdmin = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [image, setImage] = useState<any>("");
  const [description, setDescription] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<any>(
    "/images/default_avatar.jpg"
  );
  const [data, setData] = useState<any>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await getCategories(page, limit, keyword);
      setTotalPage(res.totalPage);
      setData(res.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let delayDebounceFn: ReturnType<typeof setTimeout>;
    if (keyword) {
      delayDebounceFn = setTimeout(() => {
        fetchApi();
      }, 1000);
    } else {
      fetchApi();
    }
    return () => clearTimeout(delayDebounceFn);
  }, [keyword, page, limit]);

  // images
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setAvatarPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  // create danh muc
  const handleSubmitCreateCategories = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("slug", slug);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    try {
      await createCategories(formData);
      const modal = document.getElementById(
        "modal_add_categories"
      ) as HTMLDialogElement;
      modal.close();
      toast.success("🦄 Bạn đã tạo mới danh mục thành công!", {
        position: "top-right",
      });
      setCategoryName("");
      setAvatarPreview("");
      setDescription("");
      setImage("");
      setSlug("");
      fetchApi();
    } catch (error) {
      console.error("Tạo danh mục thất bại:", error);
    }
  };
  //delete
  const handleDeleteCategories = async (id: string) => {
    await deleteCategories(id);
    const modal = document.getElementById(
      `modal_delete_${id}`
    ) as HTMLDialogElement;
    modal.close();
    toast.success("🦄 Bạn đã xóa thành công!", {
      position: "top-right",
    });
    fetchApi();
  };
  const handleExportExcel = () => {
    if (!data || data.length === 0) {
      toast.error("Không có dữ liệu để xuất!", {
        position: "top-right",
      });
      return;
    }

    // Chuyển đổi dữ liệu thành định dạng bảng
    const formattedData = data.map((item: ICategory) => ({
      ID: item._id,
      "Tên danh mục": item.categoryName,
      Slug: item.slug,
      "Mô tả": item.description,
    }));

    // Tạo workbook và worksheet
    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh Mục");

    // Xuất file
    XLSX.writeFile(wb, `DanhMuc_${new Date().toISOString()}.xlsx`);
    toast.success("Xuất file Excel thành công!", {
      position: "top-right",
    });
  };
  return (
    <>
      <div>
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px] dark:text-white ">
          Quản lý danh mục sản phẩm
        </h1>
        <div className="flex gap-5">
          <button
            type="button"
            className="primary-btn mt-[30px]"
            onClick={() => {
              const modal = document.getElementById(
                "modal_add_categories"
              ) as HTMLDialogElement;
              modal?.showModal();
            }}
          >
            Thêm danh mục mới
          </button>
          <button
            type="button"
            className="primary-btn bg-lime-600 mt-[30px] hover:bg-lime-700"
            onClick={handleExportExcel}
          >
            <span className="flex items-center gap-2">
              Xuất
              <RiFileExcel2Line />
            </span>
          </button>
        </div>

        {/* them danh muc */}
        <dialog id="modal_add_categories" className="modal">
          <div className="modal-box">
            <div className="text-[20px] font-semibold py-[10px]">
              Thêm danh mục mới
            </div>
            <form onSubmit={handleSubmitCreateCategories} className="space-y-6">
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Tên danh mục:
                </label>
                <div className="mt-2">
                  <input
                    type="name"
                    name="name"
                    placeholder="Tên danh mục"
                    required
                    value={categoryName}
                    autoComplete="name"
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                    tabIndex={1}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  slug:
                </label>
                <div className="mt-2">
                  <input
                    type="slug"
                    name="slug"
                    placeholder="slug"
                    required
                    value={slug}
                    autoComplete="slug"
                    onChange={(e) => setSlug(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                    tabIndex={1}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description:
                </label>
                <div className="mt-2">
                  <textarea
                    required
                    autoComplete="email"
                    className=" h-[6.75rem] leading-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                    tabIndex={1}
                    name="description"
                    placeholder="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Images:
                </label>
                <div className="flex justify-between items-center gap-[10px]">
                  <img
                    src={avatarPreview}
                    alt="Images"
                    className=" h-[100px] w-[100px] border border-violet-300 rounded-full"
                  />
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
          {loading ? (
            <div className="h-[320px] w-full flex items-center justify-center text-violet-400">
              <span className="loading loading-spinner loading-lg "></span>
              <span className="loading loading-spinner loading-lg "></span>
              <span className="loading loading-spinner loading-lg "></span>
            </div>
          ) : (
            <table className="table text-[16px]">
              {/* head */}
              <thead>
                <tr className="text-[18px] dark:text-gray-300">
                  <th></th>
                  <th>ID</th>
                  <th>Hình ảnh</th>
                  <th>Tên danh mục</th>
                  <th>Slug</th>
                  <th>Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item: ICategory, index: number) => {
                    return (
                      <tr
                        className="hover:bg-violet-100 cursor-pointer dark:hover:bg-violet-400"
                        key={item._id}
                      >
                        <th>{index + 1}</th>
                        <td>{item._id}</td>
                        <td>
                          <img
                            src={item.image.url}
                            alt="danh muc"
                            className="w-[50px] h-[50px] object-cover ring-1 ring-violet-300 rounded"
                          />
                        </td>
                        <td>{item.categoryName}</td>
                        <td>{item.slug}</td>
                        <td className="max-w-[400px] ">
                          <span className="line-clamp-2">
                            {item.description}
                          </span>
                        </td>

                        <td className="flex gap-[10px] items-center">
                          <UpdateCategories item={item} fetchApi={fetchApi} />
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
                                    Bạn có chắc muốn xóa danh muc:{" "}
                                    <strong className="">
                                      {item.categoryName}
                                    </strong>
                                  </div>
                                </div>
                                <div className="flex justify-end items-center">
                                  <button
                                    className="primary-btn  relative top-[11px] mr-[10px]"
                                    onClick={() =>
                                      handleDeleteCategories(item._id)
                                    }
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
                {/* row 1 */}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* pagination */}
      {loading === false && (
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
              <button
                className="join-item btn btn-md"
                onClick={() => setPage(1)}
              >
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
      )}
    </>
  );
};

export default CategoriesAdmin;
