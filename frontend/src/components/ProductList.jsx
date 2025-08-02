import { useState } from 'react';
import productsData from '../data/data.json';
import ProductCard from '../components/ProductCard';
import { Container, Form, Button } from 'react-bootstrap';

const ProductList = () => {
  const [filterId, setFilterId] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleFilter = () => {
    if (!filterId) {
      setFilteredProducts(productsData);
    } else {
      const id = parseInt(filterId);
      const match = productsData.filter(p => p.id === id);
      setFilteredProducts(match);
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex mb-4 gap-2">
        <Form.Control
          type="text"
          placeholder="Código"
          value={filterId}
          onChange={(e) => setFilterId(e.target.value)}
          style={{ maxWidth: '200px' }}
        />
        <Button onClick={handleFilter}>Filtrar</Button>
      </div>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;
