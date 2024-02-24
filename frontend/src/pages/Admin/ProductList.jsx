import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      productData.append("image", image);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed, Try Again.");
      } else {
        toast.success(`${data.name} is created.`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed, Try Again.");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <h1 className="text-[24px] text-[#638653] font-bold">Create Product</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
                alt="productImage"
                className="block mx-auto max-h-[200px] rounded-md mb-5"
              />
            </div>
          )}

          <div className={`mb-3 ${imageUrl ? "hidden" : ""}`}>
            <label className="border border-[#396246] px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 ">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 grid-flow-row gap-3">
            <div>
              <label className="font-semibold">Name</label>
              <input
                type="text"
                value={name}
                placeholder="Enter Product Name"
                onChange={(e) => setName(e.target.value)}
                className="p-4 mb-3 w-full border border-[#396246] rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Price</label>
              <input
                type="number"
                value={price}
                placeholder="Enter Product Price"
                onChange={(e) => setPrice(e.target.value)}
                className="p-4 mb-3 w-full border border-[#396246] rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Quantity</label>
              <input
                type="number"
                value={quantity}
                placeholder="Enter Product Quantity"
                onChange={(e) => setQuantity(e.target.value)}
                className="p-4 mb-3 w-full border border-[#396246] rounded-lg"
              />
            </div>
            <div>
              <label className="font-semibold">Brand</label>
              <input
                type="text"
                value={brand}
                placeholder="Enter Brand Name"
                onChange={(e) => setBrand(e.target.value)}
                className="p-4 mb-3 w-full border border-[#396246] rounded-lg"
              />
            </div>

            <div className="col-span-full">
              <label className="font-semibold">Description</label>
              <textarea
                type="text"
                value={description}
                placeholder="Enter Product Description"
                onChange={(e) => setDescription(e.target.value)}
                className="p-4 mb-3 w-full border border-[#396246] rounded-lg"
              ></textarea>
            </div>

            <div>
              <label className="font-semibold">Quantity In Stock</label>
              <input
                type="number"
                value={stock}
                placeholder="Enter Stock Count"
                onChange={(e) => setStock(e.target.value)}
                className="p-4 mb-3 w-full border border-[#396246] rounded-lg"
              />
            </div>

            <div>
              <label className="font-semibold">Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="p-4 mb-3 w-full border border-[#396246] rounded-lg"
              >
                <option>Select Category</option>
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              onClick={handleSubmit}
              className="font-semibold bg-[#109910] py-2 px-4 rounded-lg hover:bg-[#1ED760] text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-[lightgreen] focus:ring-opacity-50 cursor-pointer transition-colors duration-150"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
