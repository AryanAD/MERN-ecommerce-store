import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "../../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../../components/CategoryFrom";
import Modal from "../../../components/Modal";
import AdminMenu from "../AdminMenu";
import { Container, Toolbar } from "@mui/material";
import { CustomSnippets } from "../../../components/Custom/CustomSnippets";

const CreateAndListCategories = () => {
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
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
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
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Tray again.");
    }
  };

  return (
    <Container maxWidth="xl">
      {CustomSnippets.Heading({ heading: "Manage Categories" })}
      <AdminMenu />
      <Toolbar />
      <div className="p-3 md:w-3/4">
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <h1>Available Categories</h1>
        <hr />

        <div className="flex flex-wrap">
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className="font-semibold bg-white border border-[#109910] text-[#109910] py-2 px-4 rounded-lg m-3 hover:bg-[#1ED760] hover:text-black focus:outline-none focus:ring-2 focus:ring-[lightgreen] focus:ring-opacity-50"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
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
    </Container>
  );
};

export default CreateAndListCategories;
