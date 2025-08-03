import './ProductCard.css';
import PropTypes from 'prop-types';
import { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/products/${product.id}`);
    };
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={product.pictureUrl || '/images/no-image.png'}
                    alt={product.name}
                    className="product-image"
                />
            </div>
            <div className="product-content">
                <div>
                    <h2 className="product-title">
                        ({product.id}) {product.name}
                    </h2>
                    <p className="product-category">{product.category}</p>
                    <p className="product-price">
                        {product.price.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        })}
                    </p>
                </div>
                <div className="product-actions">
                    <button className="btn edit-btn" onClick={handleEdit}>
                        Editar
                    </button>
                    <button className="btn delete-btn">Excluir</button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
