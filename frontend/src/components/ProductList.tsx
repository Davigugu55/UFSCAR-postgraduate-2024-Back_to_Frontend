import { useState, useEffect } from 'react';
import { Product } from '../types/product';
import ProductCard from '../components/ProductCard';
import { Container, Form, Button, Row, Col, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DEFAULT_API = 'http://localhost:3333';

const ProductList = () => {
    const [filterId, setFilterId] = useState('');
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [showImportModal, setShowImportModal] = useState(false);
    const [importPreview, setImportPreview] = useState<Partial<Product>[]>([]);
    const [selectedRows, setSelectedRows] = useState<Record<number, boolean>>({});
    const [importing, setImporting] = useState(false);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${DEFAULT_API}/products`);
            const products: Product[] = res.data || [];

            // Sort products by name (pt-BR)
            products.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

            setAllProducts(products);
            setFilteredProducts(products);
        } catch (err: any) {
            console.error('Failed to fetch products from API:', err?.message || err);
            setAllProducts([]);
            setFilteredProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // CSV parsing utility (handles quoted fields)
    const parseCsv = (text: string): string[][] => {
        const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
        const parseLine = (line: string) => {
            const result: string[] = [];
            let cur = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const ch = line[i];
                if (ch === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        cur += '"';
                        i++; // skip escaped quote
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (ch === ',' && !inQuotes) {
                    result.push(cur);
                    cur = '';
                } else {
                    cur += ch;
                }
            }
            result.push(cur);
            return result;
        };

        return lines.map(parseLine);
    };

    const buildPreviewFromCsv = (content: string) => {
        const rows = parseCsv(content);
        if (rows.length === 0) return [];
        const headers = rows[0].map((h) => h.trim().toLowerCase());
        const data = rows.slice(1).map((cells) => {
            const obj: any = {};
            headers.forEach((h, idx) => {
                obj[h] = (cells[idx] ?? '').trim();
            });
            const mapped: Partial<Product> = {
                id: obj.id ? Number(obj.id) : undefined,
                name: obj.name || '',
                description: obj.description || '',
                price: obj.price ? Number(obj.price) : 0,
                category: obj.category || '',
                image_url: obj.image_url || obj.picture || obj.image || '',
                quantity: obj.quantity ? Number(obj.quantity) : 0,
                created_at: obj.created_at || undefined,
                updated_at: obj.updated_at || undefined,
            };
            return mapped;
        });
        return data;
    };

    const handleExportCsv = async () => {
        try {
            const res = await axios.get(`${DEFAULT_API}/products`);
            const products: Product[] = res.data || [];

            const headers = ['id', 'name', 'description', 'price', 'category', 'image_url', 'quantity', 'created_at', 'updated_at'];
            const escape = (val: any) => {
                if (val === null || val === undefined) return '';
                const s = String(val);
                return `"${s.replace(/"/g, '""')}"`;
            };

            const rows = products.map((p) => headers.map((h) => escape((p as any)[h])).join(','));
            const csv = [headers.join(','), ...rows].join('\n');

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            a.download = `products-${timestamp}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Failed to export CSV:', err);
            alert('Falha ao exportar CSV. Veja o console para mais detalhes.');
        }
    };

    const handleImportCsv = async () => {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.csv,text/csv';
            input.onchange = async (ev: Event) => {
                const target = ev.target as HTMLInputElement;
                if (!target.files || target.files.length === 0) return;
                const file = target.files[0];
                const reader = new FileReader();
                reader.onload = async () => {
                    const content = reader.result as string;
                    try {
                        const preview = buildPreviewFromCsv(content);
                        setImportPreview(preview);
                        const sel: Record<number, boolean> = {};
                        preview.forEach((_, idx) => (sel[idx] = true));
                        setSelectedRows(sel);
                        setShowImportModal(true);
                    } catch (parseErr) {
                        console.error('Failed to parse CSV:', parseErr);
                        alert('Falha ao analisar CSV. Verifique o formato e tente novamente.');
                    }
                };
                reader.onerror = () => {
                    console.error('Failed to read selected file');
                    alert('Falha ao ler o arquivo selecionado. Veja o console para mais detalhes.');
                };
                reader.readAsText(file, 'utf-8');
            };
            input.click();
        } catch (err) {
            console.error('Failed to import CSV:', err);
            alert('Falha ao iniciar importação. Veja o console para mais detalhes.');
        }
    };

    const toggleRow = (index: number) => {
        setSelectedRows((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const confirmImport = async () => {
        const toImport = importPreview.map((p, idx) => ({ p, idx })).filter(({ idx }) => selectedRows[idx]);
        if (toImport.length === 0) {
            setShowImportModal(false);
            return;
        }
        setImporting(true);
        try {
            const promises = toImport.map(async ({ p }) => {
                if (p.id) {
                    await axios.put(`${DEFAULT_API}/products/${p.id}`, p);
                } else {
                    const payload = { ...p } as any;
                    delete payload.id;
                    delete payload.created_at;
                    delete payload.updated_at;
                    await axios.post(`${DEFAULT_API}/products`, payload);
                }
            });
            await Promise.all(promises);
            setShowImportModal(false);
            await fetchProducts();
            alert('Importação concluída.');
        } catch (err) {
            console.error('Import failed:', err);
            alert('Falha durante a importação. Veja o console para mais detalhes.');
        } finally {
            setImporting(false);
        }
    };

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
        <>
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
                        <Button variant="secondary" onClick={handleExportCsv} className="me-2">
                            Exportar CSV
                        </Button>
                        <Button variant="success" onClick={handleImportCsv} className="me-2">
                            Importar CSV
                        </Button>
                        <Button variant="success" onClick={handleNewProduct}>
                            Novo produto
                        </Button>
                    </Col>
                </Row>

                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Container>

            <Modal show={showImportModal} onHide={() => setShowImportModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar importação de CSV</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Selecione os produtos que deseja importar (PUT se houver ID, POST se ID vazio):</p>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}></th>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {importPreview.map((p, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <input type="checkbox" checked={!!selectedRows[idx]} onChange={() => toggleRow(idx)} />
                                    </td>
                                    <td>{p.id ?? '-'}</td>
                                    <td>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td>{p.price != null ? Number(p.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowImportModal(false)} disabled={importing}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={confirmImport} disabled={importing}>
                        {importing ? 'Importando...' : 'Confirmar importação'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductList;
