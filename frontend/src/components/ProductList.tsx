import { useState } from 'react';
import productsData from '../data/data.json';
import ProductCard from '../components/ProductCard';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

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
      <Row className="align-items-center mb-3">
        <Col>
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Código do produto"
              value={filterId}
              onChange={(e) => setFilterId(e.target.value)}
            />
            <Button onClick={handleFilter} className="ms-2">
              Filtrar
            </Button>
          </Form>
        </Col>
        <Col></Col>
        <Col className="text-end">
          <Button variant="success" onClick={handleFilter}>Novo produto</Button>
        </Col>
      </Row>

      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Container>
  );
};

export default ProductList;