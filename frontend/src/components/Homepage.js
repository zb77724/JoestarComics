import { ProductList } from "./productList";
import { useParams } from 'react-router-dom';

export const Homepage = () => {
    const { name } = useParams();

    return (
        <div className="page">
            <ProductList category={name} />
        </div>
    );
}