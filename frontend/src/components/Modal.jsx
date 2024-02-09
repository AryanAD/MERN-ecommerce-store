import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justidy-center z-50">
          <div className="fixed inset-0 bg-black opacity-50">
            <div className="absolute top-[40%] right-[50%] bg-white p-4 rounded-lg z-10 text-right">
              <button
                onClick={onClose}
                className="text-block font-semibold hover:text-gray-700 focus:outline-none mr-2"
              >
                X
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

Modal.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};