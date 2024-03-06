import PropTypes from "prop-types";
import { CustomCSS } from "./Custom/CustomCSS";

const CategoryForm = ({
  value,
  setValue,
  buttonText = "Submit",
  handleSubmit,
  handleDelete,
}) => {
  return (
    <>
      <div className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className={CustomCSS.gridTwo}>
            <input
              type="text"
              value={value}
              placeholder="Category Name"
              onChange={(e) => setValue(e.target.value)}
              className="py-3 px-4 border rounded-lg w-full"
            />
          </div>

          <div className="flex justify-between">
            <button className="font-semibold bg-[#109910] py-2 px-4 rounded-lg hover:bg-[#1ED760] text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-[lightgreen] focus:ring-opacity-50 cursor-pointer transition-colors duration-150">
              {buttonText}
            </button>

            {handleDelete && (
              <button
                onClick={handleDelete}
                className=" font-semibold bg-red-600 py-2 px-4 rounded-lg hover:bg-red-500 text-white hover:text-black focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 cursor-pointer transition-colors duration-150"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
export default CategoryForm;

CategoryForm.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  handleSubmit: PropTypes.func,
  handleDelete: PropTypes.func,
};
