import './ProductCard.css';
import PropTypes from 'prop-types';
import { Product } from '../types/product';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:3333/products';

const ProductCard = ({ product }: { product: Product }) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/products/${product.id}`);
    };

    const handleDelete = async () => {
        if (!confirm(`Excluir o produto "${product.name}" (ID ${product.id})?`)) return;
        try {
            await axios.delete(`${API_URL}/${product.id}`);
            // simplest way to refresh the list — parent can be improved later to avoid full reload
            window.location.reload();
        } catch (err) {
            console.error('Failed to delete product:', err);
            alert('Falha ao excluir o produto. Veja o console para mais detalhes.');
        }
    };

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img src={product.image_url || '/images/no-image.png'} alt={product.name} className="product-image" />
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
                    <button className="btn delete-btn" onClick={handleDelete}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
