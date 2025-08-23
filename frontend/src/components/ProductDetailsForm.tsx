import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types/product';
import axios from 'axios';

const API_URL = 'http://localhost:3333/products';

const ProductDetailsForm = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Product>({
        id: 0,
        name: '',
        description: '',
        price: 0,
        category: '',
        image_url: '',
        quantity: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });

    // Load product from backend when editing, otherwise keep default (new product)
    useEffect(() => {
        if (id) {
            setIsEditing(true);
            const controller = new AbortController();
            axios
                .get(`${API_URL}/${id}`, { signal: controller.signal })
                .then((res) => {
                    // Expect backend to return the product object
                    setFormData(res.data as Product);
                })
                .catch((err) => {
                    console.error('Failed to load product from API:', err?.message || err);
                });
            return () => controller.abort();
        } else {
            setIsEditing(false);
            // keep initial empty form; server will assign id on create
            setFormData((prev) => ({ ...prev, id: 0 }));
        }
    }, [id]);

    // Função para lidar com as mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(
            (prev) =>
                ({
                    ...prev,
                    [id.replace('formProduct', '').toLowerCase()]: id === 'formProductPrice' || id === 'formProductId' ? Number(value) : value,
                }) as unknown as Product
        );
    };

    // Função para lidar com o envio do formulário
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            // Update existing product
            axios
                .put(`${API_URL}/${formData.id}`, formData)
                .then(() => navigate('/'))
                .catch((err) => {
                    console.error('Failed to update product:', err?.message || err);
                });
        } else {
            // Create new product — do not send client-side id/created_at/updated_at
            const payload: Partial<Product> = { ...formData };
            delete (payload as any).id;
            delete (payload as any).created_at;
            delete (payload as any).updated_at;

            axios
                .post(API_URL, payload)
                .then(() => navigate('/'))
                .catch((err) => {
                    console.error('Failed to create product:', err?.message || err);
                });
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formProductId">
                <Form.Label>ID</Form.Label>
                <Form.Control type="number" placeholder="ID do Produto" value={formData.id} onChange={handleChange} disabled />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Nome do Produto" value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductDescription">
                <Form.Label>Descrição</Form.Label>
                <Form.Control type="text" as="textarea" style={{ height: '200px' }} placeholder="Descrição do Produto" value={formData.description} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPrice">
                <Form.Label>Preço</Form.Label>
                <Form.Control type="number" step="0.01" placeholder="Preço do Produto" value={formData.price} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control type="text" placeholder="Categoria do Produto" value={formData.category} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPictureUrl">
                <Form.Label>URL da Imagem</Form.Label>
                <Form.Control type="text" placeholder="URL da Imagem do Produto" value={formData.image_url} onChange={handleChange} />
            </Form.Group>

            <Button variant={isEditing ? 'primary' : 'success'} type="submit" className="me-2">
                {isEditing ? 'Salvar' : 'Criar'}
            </Button>

            <Button variant="danger" type="button" onClick={() => navigate('/')}>
                Cancelar
            </Button>
        </Form>
    );
};

export default ProductDetailsForm;
