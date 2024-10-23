import React, { useState } from "react";
import { RiPencilFill } from "react-icons/ri";
import { updateCategories } from "../../Services/modules/auth";
interface MyComponentProps {
  item: {
    categoryName: string;
    slug: string;
    description: string;
    _id: string;
  };
  fetchApi: () => void;
}
const UpdateCategories: React.FC<MyComponentProps> = ({ item, fetchApi }) => {
  const { categoryName, slug, description, _id } = item;
  const [categoryNameUp, setCategoryNameUp] = useState<string>(categoryName);
  const [slugUp, setSlugUp] = useState<string>(slug);
  const [imageUp, setImageUp] = useState<any>("");
  const [descriptionUp, setDescriptionUp] = useState<string>(description);
  const [avatarPreviewUp, setAvatarPreviewUp] = useState<any>(
    "/images/default_avatar.jpg"
  );
  console.log(categoryName, categoryNameUp);
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      categoryName: categoryNameUp,
      slug: slugUp,
      description: descriptionUp,
    };
    try {
      await updateCategories(_id, data);
      const modal = document.getElementById(
        `modal_update_${_id}`
      ) as HTMLDialogElement;
      modal.close();
      setCategoryNameUp(categoryName);
      setDescriptionUp(description);
      setSlugUp(slug);
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
        <div className="modal-box">
          <div className="text-[20px] font-semibold py-[10px]">
            Cập nhật danh mục:
          </div>
          <form onSubmit={handleUpdate} className="space-y-6">
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
                  value={categoryNameUp}
                  autoComplete="name"
                  onChange={(e) => setCategoryNameUp(e.target.value)}
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
                  value={slugUp}
                  autoComplete="slug"
                  onChange={(e) => setSlugUp(e.target.value)}
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
                  value={descriptionUp}
                  onChange={(e) => setDescriptionUp(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Images:
              </label>
              <div className="flex justify-between items-center gap-[10px]">
                <img
                  src={avatarPreviewUp}
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
                          //  onChange={handleFileChange}
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
    </span>
  );
};

export default UpdateCategories;
