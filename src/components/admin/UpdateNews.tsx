import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { toast } from "react-toastify";
import { updateNews } from "../../Services/modules/auth";
interface MyComponentProps {
  item: any;
  fetchApi: () => void;
}
const UpdateNews: React.FC<MyComponentProps> = ({ item, fetchApi }) => {
  const { title, content, image, _id } = item;
  const [titleUp, setTitleUp] = useState<string>(title);
  const [contentUp, setContentUp] = useState<string>(content);
  const [imageUp, setImageUp] = useState<any>([]);
  const [previewImageUp, setPreviewImageUp] = useState<any>(image.url);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUp(base64String);
        setPreviewImageUp(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      title: titleUp,
      content: contentUp,
      image: {
        url: imageUp,
      },
    };
    try {
      await updateNews(_id, data);
      const modal = document.getElementById(
        `modal_update_${_id}`
      ) as HTMLDialogElement;
      modal.close();
      toast.success("🦄 Bạn dã cập nhật thành công!", {
        position: "top-right",
      });
      setTitleUp(title);
      setContentUp(content);
      setImageUp([]);
      fetchApi();
    } catch (error) {
      console.error("Tạo danh mục thất bại:", error);
    }
  };
  return (
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
        <div className="modal-box w-11/12 max-w-[800px]">
          <div className="text-[20px] font-semibold py-[10px]">
            Cập nhật bài viết:
          </div>
          <form onSubmit={handleUpdate} className="space-y-6 ">
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
                    value={titleUp}
                    autoComplete="name"
                    onChange={(e) => setTitleUp(e.target.value)}
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
                    value={contentUp}
                    onChange={(e) => setContentUp(e.target.value)}
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
                      src={previewImageUp}
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
  );
};

export default UpdateNews;
