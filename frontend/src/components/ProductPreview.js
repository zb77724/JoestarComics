import { StarRating } from "./StarRating";
import { Link } from "react-router-dom";

export const ProductPreview = ({ product }) => {

    return (
        <Link to={`products/${product.id}`} className="product">
            <img 
            className="productImg" 
            src={product.images[0]}
            alt={product.name} />
            <div className="text">{product.name}</div>
            <div className="text">{`$${product.price}`}</div>
            <StarRating id={product.id} rating={product.rating || 0} />
        </Link>
    );
};