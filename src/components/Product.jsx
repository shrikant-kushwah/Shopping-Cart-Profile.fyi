import { useDispatch, useSelector } from "react-redux";
import { add, remove } from "../redux/Slices/cartSlice";
import { toast } from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from cart");
  };

  return (
    <div className="group mt-4 mb-2 bg-white rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out p-3">
      <div className="relative h-52 w-full flex items-center justify-center overflow-hidden">
        <img src={post.image} alt="Product" className="h-full w-auto transition-transform duration-300 group-hover:scale-110" />
        {post.discount && (
          <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-semibold uppercase px-2 py-1 rounded-br-lg transform -rotate-45 -translate-y-2 translate-x-2">
            {post.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{post.title}</h3>
        <p className="text-sm text-gray-600 mt-2 truncate">{post.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-1 text-yellow-500">
            <FaStar className="w-4 h-4" />
            <span className="font-semibold text-sm">{post.rating.rate}</span>
          </div>
          <span className="text-gray-500 text-sm">{post.rating.count} reviews</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-gray-900">₹{post.price}</span>
          {
            cart.some((p) => p.id === post.id) ? (
              <button
                className="text-red-600 border-2 border-red-600 rounded-full font-semibold text-xs py-1 px-3 uppercase transition duration-300 ease-in-out hover:bg-red-600 hover:text-white"
                onClick={removeFromCart}>Remove Item</button>
            ) : (
              <button
                className="text-green-600 border-2 border-green-600 rounded-full font-semibold text-xs py-1 px-3 uppercase transition duration-300 ease-in-out hover:bg-green-600 hover:text-white"
                onClick={addToCart}>Add to Cart</button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Product;
