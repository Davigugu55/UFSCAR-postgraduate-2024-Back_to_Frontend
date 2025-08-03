import { useMemo, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types/product';

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
        pictureUrl: '',
    });

    // Carrega os dados do produto do localStorage ou inicializa com um novo produto
    useMemo(() => {
        const products = JSON.parse(
            localStorage.getItem('products') || '[]'
        ) as Product[];

        if (id) {
            setIsEditing(true);
            // Editando produto existente
            const product = products.find((p) => p.id === Number(id));
            if (product) {
                setFormData(product);
            }
        } else {
            setIsEditing(false);
            // Gerando novo ID para o produto caso seja novo
            const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
            setFormData((prev) => ({
                ...prev,
                id: maxId + 1,
            }));
        }
    }, [id]);

    // Função para lidar com as mudanças nos campos do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id.replace('formProduct', '').toLowerCase()]:
                id === 'formProductPrice' || id === 'formProductId'
                    ? Number(value)
                    : value,
        }));
    };

    // Função para lidar com o envio do formulário
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct = { ...formData };

        const existing = JSON.parse(
            localStorage.getItem('products') || '[]'
        ) as Product[];

        const index = existing.findIndex((p) => p.id === newProduct.id);
        if (index !== -1) {
            existing[index] = newProduct;
        } else {
            existing.push(newProduct);
        }

        localStorage.setItem('products', JSON.stringify(existing));
        navigate('/');
    };

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formProductId">
                <Form.Label>ID</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="ID do Produto"
                    value={formData.id}
                    onChange={handleChange}
                    disabled
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Nome do Produto"
                    value={formData.name}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductDescription">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    type="text"
                    as="textarea"
                    style={{ height: '200px' }}
                    placeholder="Descrição do Produto"
                    value={formData.description}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPrice">
                <Form.Label>Preço</Form.Label>
                <Form.Control
                    type="number"
                    step="0.01"
                    placeholder="Preço do Produto"
                    value={formData.price}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductCategory">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Categoria do Produto"
                    value={formData.category}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPictureUrl">
                <Form.Label>URL da Imagem</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="URL da Imagem do Produto"
                    value={formData.pictureUrl}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button
                variant={isEditing ? 'primary' : 'success'}
                type="submit"
                className="me-2"
            >
                {isEditing ? 'Salvar' : 'Criar'}
            </Button>

            <Button
                variant="danger"
                type="button"
                onClick={() => navigate('/')}
            >
                Cancelar
            </Button>
        </Form>
    );
};

export default ProductDetailsForm;
