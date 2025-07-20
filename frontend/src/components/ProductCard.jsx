import React from 'react';
import './ProductCard.css';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.pictureUrl}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-content">
        <div>
          <h2 className="product-title">({product.id}) {product.name}</h2>
          <p className="product-category">{product.category}</p>
          <p className="product-price">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
        </div>
        <div className="product-actions">
          <button className="btn edit-btn">Editar</button>
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