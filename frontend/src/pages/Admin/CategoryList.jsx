import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryFrom";
import Modal from "../../components/Modal";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();

  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Creating category failed, Try Again");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setModalVisible(false);
        setUpdatingName("");
      }
    } catch (error) {
      console.log(error);
      toast.error("Updating category failed, Try Again");
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Deleting category failed, Try Again");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        <div className="h-12">
          <CategoryForm
            value={name}
            setValue={setName}
            handleSubmit={handleCreateCategory}
          />
          <br />
          <hr />

          <div className="flex flex-wrap">
            {categories?.map((category) => {
              <div key={category._id}>
                {console.log(category.name)}
                <button
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                  className="bg-white border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus-ring-pink-500 focus:ring-opacity-50"
                >
                  {category.name}
                </button>
              </div>;
            })}
          </div>

          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <CategoryForm
              buttonText="Update"
              value={updatingName}
              handleSubmit={handleUpdateCategory}
              handleDelete={handleDeleteCategory}
              setValue={(value) => setUpdatingName(value)}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;