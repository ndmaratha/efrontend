import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";
const Cart = () => {
	const cartItems = useSelector((store) => store.cart.items);
	const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
	const removeFromCart = async (productId) => {
		try {
			const response = await axios.delete(`https://ebackend-m32m.onrender.com/cart/${productId}`);
			console.log("Product deleted successfully", response.data);
		} catch (error) {
			console.error("Error deleting product:", error.message);
			// Handle error
		}
	};
	return (
		<>
			<div className="container mx-auto p-4">
				<h2 className="text-3xl font-bold mb-4 text-center">Your Cart</h2>

				{cartItems.length === 0 ? (
					<p className="text-center text-gray-500">Your cart is empty.</p>
				) : (
					<div>
						{cartItems.map((item) => (
							<div
								key={item._id}
								className="flex items-center justify-between border-b border-gray-300 py-2"
							>
								<div className="flex items-center">
									<img
										className="w-16 h-16 object-cover rounded-md mr-4"
										src={item.thumbnail}
										alt={item.title}
									/>
									<div>
										<p className="text-lg font-semibold">{item.title}</p>
										<p className="text-gray-600">{item.description}</p>
									</div>
								</div>
								<div className="flex items-center">
									<p className="text-lg font-bold mr-4">${item.price}</p>
									<button
										className="text-red-500 focus:outline-none"
										onClick={() => {
											removeFromCart(item._id);
											toast.info('👍Removed from Cart!', {
												position: "top-center",
												autoClose: 5000,
												hideProgressBar: false,
												closeOnClick: true,
												pauseOnHover: true,
												draggable: true,
												progress: undefined,
												theme: "dark",
												});
										}}
									>
										Remove
									</button>
								</div>
							</div>
						))}
						<div className="mt-4 border-t border-gray-300 pt-4">
							<p className="text-lg font-bold text-right">
								Total Price: ${totalPrice}
							</p>
							<Link
								to="/checkout"
								className="bg-blue-500 text-white py-2 px-4 rounded mt-2 inline-block float-right"
							>
								Checkout
							</Link>
						</div>
					</div>
				)}
			</div>
		</>
	);
};
export default Cart;
