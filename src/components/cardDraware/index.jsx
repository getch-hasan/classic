import { MdClose } from "react-icons/md";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { TbCoinTaka } from "react-icons/tb";
import { useCart } from "@/context/CartContext"; // Import useCart

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCart(); // Use CartContext

  // Total Price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-50 visible" : "opacity-0 invisible"
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex justify-between bg-gray-200 items-center">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <FiShoppingBag className="text" /> {cartItems.length} ITEMS
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500  cursor-pointer border-2 border-gray-200 rounded-lg py-1 px-3 bg-gray-300 hover:bg-gray-100"
            >
              Close
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="p-4 text-gray-500">Cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between text-gray-500 p-4 border-t border-gray-300 shadow-sm bg-white"
                >
                  <div className="flex flex-col items-center mr-4">
                    <button
                      className="hover:text-black cursor-pointer"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <BiSolidUpArrow />
                    </button>
                    <span className="font-medium my-1">{item?.quantity}</span>
                    <button
                      className="text-gray-500 cursor-pointer hover:text-black"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <BiSolidDownArrow />
                    </button>
                  </div>

                  <img
                    src={item?.mainImage}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded mr-4"
                  />

                  <div className="flex-1">
                    <h3 className="text-sm font-medium ">
                      {item?.name}{" "}
                      <span className="text-gray-400">| MF-649</span>
                    </h3>
                    <p className="font-bold text-lg mt-1">
                      TK. {item?.price}{" "}
                      <span className=" text-sm font-medium line-through">
                        tk 200
                      </span>
                    </p>
                    <p className="text-sm ">Size: {item?.sizes[0]}</p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)} // Remove using context
                    className="text-red-500 cursor-pointer hover:text-red-700 ml-4"
                  >
                    <MdClose size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 flex w-full justify-center text-white">
            <div className="flex bg-gradient-to-r rounded-sm from-green-600 to-green-300 items-center justify-center gap-4">
              <button className="font-semibold cursor-pointer px-4 rtransition">
                Place Order
              </button>
              <span className="flex items-center px-4 border-l gap-1 text-lg font-semibold">
                <TbCoinTaka size={20} /> {totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
