import { useState, useEffect } from 'react';
import { Product } from '../types/product'; // Your Product interface
import ProductCard from '../components/ProductCard';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DEFAULT_API = 'http://localhost:3333';

const ProductList = () => {
    const [filterId, setFilterId] = useState('');
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        const load = async () => {
            try {
                const res = await axios.get(`${DEFAULT_API}/products`, { signal: controller.signal });
                const products: Product[] = res.data;

                console.log('Fetched products:', products);

                // Sort products by name (pt-BR)
                products.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

                setAllProducts(products);
                setFilteredProducts(products);
            } catch (err: any) {
                console.error('Failed to fetch products from API:', err?.message || err);
                // No fallbacks — rely exclusively on the backend
                setAllProducts([]);
                setFilteredProducts([]);
            }
        };

        load();
        // return () => controller.abort();
    }, []);

    const handleFilter = () => {
        if (!filterId || !filterId.trim()) {
            setFilteredProducts(allProducts);
            return;
        }
        const id = parseInt(filterId, 10);
        if (Number.isNaN(id)) {
            setFilteredProducts([]);
            return;
        }
        const match = allProducts.filter((p) => p.id === id);
        setFilteredProducts(match);
    };

    const handleNewProduct = () => {
        navigate('/products/new');
    };

    return (
        <Container className="py-4">
            <Row className="align-items-center mb-3">
                <Col>
                    <Form className="d-flex">
                        <Form.Control type="text" placeholder="Código do produto" value={filterId} onChange={(e) => setFilterId(e.target.value)} />
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
