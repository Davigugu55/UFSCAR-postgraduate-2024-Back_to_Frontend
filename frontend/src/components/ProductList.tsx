import { useState, useEffect, useMemo } from 'react';
import { Product } from '../types/product'; // Your Product interface
import rawProductsData from '../data/data.json';
import ProductCard from '../components/ProductCard';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const productsData: Product[] = rawProductsData as Product[];

const ProductList = () => {
    const [filterId, setFilterId] = useState('');
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useMemo(() => {
        const stored = localStorage.getItem('products');
        const parsed: Product[] = stored ? JSON.parse(stored) : productsData;

        localStorage.setItem('products', JSON.stringify(parsed));

        setAllProducts(parsed);
        setFilteredProducts(parsed);
    }, []);

    const handleFilter = () => {
        if (!filterId) {
            setFilteredProducts(allProducts);
        } else {
            const id = parseInt(filterId);
            const match = allProducts.filter((p) => p.id === id);
            setFilteredProducts(match);
        }
    };

    const handleNewProduct = () => {
        navigate('/products/new');
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
                    <Button variant="success" onClick={handleNewProduct}>
                        Novo produto
                    </Button>
                </Col>
            </Row>

            {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </Container>
    );
};

export default ProductList;
