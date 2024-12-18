import { RiSearchLine } from "react-icons/ri";
import { FaRegTrashCan } from "react-icons/fa6";
import { deleteNews, getNews, postNews } from "../../Services/modules/auth";
import { useEffect, useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";
import UpdateNews from "./UpdateNews";
const News = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<any>([]);
  const [previewImage, setPreviewImage] = useState<any>([]);

  const [data, setData] = useState<any>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await getNews(page, limit, keyword);
      setTotalPage(res.totalPage);
      setData(res.rows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = (data: string | Date): string => {
    return moment(data).format("HH:mm-DD/MM/YYYY");
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
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteNew = async (id: string) => {
    await deleteNews(id);
    const modal = document.getElementById(
      `modal_delete_${id}`
    ) as HTMLDialogElement;
    modal.close();
    toast.success("🦄 Bạn đã xóa sản phẩm thành công!", {
      position: "top-right",
    });
    fetchApi();
  };

  const handleSubmitCreateNews = async (event: React.FormEvent) => {
    event.preventDefault();
    const data: any = {
      title: title,
      content: content,
    };

    if (image) {
      data.image = image;
    }

    try {
      await postNews(data);
      const modal = document.getElementById(
        "modal_add_new"
      ) as HTMLDialogElement;
      modal.close();
      toast.success("🦄 Bạn đã tạo mới danh mục thành công!", {
        position: "top-right",
      });
      setTitle("");
      setContent("");
      setImage([]);
      setPreviewImage("");
      fetchApi();
    } catch (error) {
      console.error("Tạo danh mục thất bại:", error);
    }
  };
  return (
    <>
      <div>
        <h1 className="text-[35px] font-semibold text-gray-700 mt-[10px] dark:text-white">
          Quản lý bài viết
        </h1>
        <button
          type="button"
          className="primary-btn mt-[30px]"
          onClick={() => {
            const modal = document.getElementById(
              "modal_add_new"
            ) as HTMLDialogElement;
            modal?.showModal();
          }}
        >
          Thêm bài viết mới
        </button>
        {/* them danh muc */}
        <dialog id="modal_add_new" className="modal">
          <div className="modal-box w-11/12 max-w-[800px]">
            <div className="text-[20px] font-semibold py-[10px]">
              Thêm bài viết mới
            </div>
            <form onSubmit={handleSubmitCreateNews} className="space-y-6 ">
              <div>
                {/* name */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Tiêu đề:
                  </label>
                  <div className="mt-2">
                    <input
                      type="title"
                      name="title"
                      placeholder="Tiêu đề bài viết"
                      required
                      value={title}
                      autoComplete="name"
                      onChange={(e) => setTitle(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                      tabIndex={1}
                    />
                  </div>
                </div>

                {/* mô tả */}
                <div className="mt-[15px]">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Mô tả:
                  </label>
                  <div className="mt-2">
                    <textarea
                      required
                      autoComplete="content"
                      className=" h-[10.75rem] leading-10 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-[5px]"
                      tabIndex={1}
                      name="content"
                      placeholder="mô tả"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </div>
                </div>
                {/* img */}
                <div className="mt-[20px]">
                  <div className="grid grid-cols-2 gap-[10px]">
                    {/* upload */}
                    <div className="flex justify-between items-center gap-[10px] h-[100%]">
                      <div className="mt-2 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 flex-1 dark:border-white h-[150px]">
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
                    <div className="col-span-1">
                      <img
                        src={previewImage}
                        alt="Images"
                        className=" h-[180px] w-[180px] border object-cover border-violet-300 rounded-lg "
                      />
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
                  <th>Tiêu đề</th>
                  <th>Tác giả</th>
                  <th className="text-center">Mô tả</th>
                  <th className="">Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {data &&
                  data.map((item: any, index: number) => (
                    <tr className="hover:bg-violet-100 cursor-pointer">
                      <th>{index + 1}</th>
                      <td>{item._id}</td>
                      <td>
                        <img
                          src={item?.image?.url || " "}
                          alt="hình ảnh"
                          className="w-[50px] h-[50px] object-cover ring-1 ring-violet-300 rounded"
                        />
                      </td>
                      <td className="max-w-[350px] ">
                        <span className="line-clamp-2">{item.title}</span>
                      </td>
                      <td className="max-w-[350px] ">
                        <span className="line-clamp-2">{item.author.name}</span>
                      </td>
                      <td className="max-w-[450px] ">
                        <span className="line-clamp-2">{item.content}</span>
                      </td>
                      <td className="">{formattedDate(item.createdAt)}</td>
                      <td className="flex gap-[10px] items-center">
                        {/* update */}
                        <UpdateNews item={item} fetchApi={fetchApi} />
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
                                  Bạn có chắc muốn xóa bài viết:
                                  <strong className="">{item.title}</strong>
                                </div>
                              </div>
                              <div className="flex justify-end items-center">
                                <button
                                  className="primary-btn  relative top-[11px] mr-[10px]"
                                  onClick={() => handleDeleteNew(item._id)}
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
                  ))}
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

export default News;
