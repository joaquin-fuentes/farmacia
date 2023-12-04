import { Container, Table, Button, InputGroup, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { obtenerProductos } from "../../helpers/queries";
import Swal from "sweetalert2";

import ItemProducto from "./ItemProducto"

const AdminProductos = () => {

    const [productos, setProductos] = useState([])

    const [nombreComercial, setNombreComercial] = useState("");
    const [monodroga, setMonodroga] = useState("");




    useEffect(() => {
        obtenerProductos().then((respuesta) => {
            if (respuesta != null) {
                setProductos(respuesta)
            } else {
                Swal.fire("Error", "No se pudo obtener los datos de la API", "error")
                // navegacion("/error404")
            }
        })
    }, [])

    const productosFiltrados = productos.filter((producto) => {
        const nombreComercialMatches =
            nombreComercial === "" || producto.nombreComercial.toLowerCase().includes(nombreComercial.toLowerCase());

        const monodrogaMatches =
            monodroga === "" || producto.monodroga.toLowerCase().includes(monodroga.toLowerCase());

        return nombreComercialMatches && monodrogaMatches;
    });

    const mostrarAlertaNoProductos = productosFiltrados.length === 0;


    return (
        <Container fluid className="mainSection bg-azulOscuro text-light p-4">
            <h1 className="display-4 text-center">Administrador de Medicamentos</h1>
            <hr></hr>
            <Row>
                <Col md="12">
                    <Link to={"/administrador/crear"} className="btn btn-primary mb-3">
                        Agregar nuevo medicamento
                    </Link>
                </Col>
                <Col md="6"><InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Nombre Comercial</InputGroup.Text>
                    <Form.Control
                        placeholder="Buscar por nombre comercial"
                        value={nombreComercial}
                        onChange={(e) => setNombreComercial(e.target.value)}
                    />
                </InputGroup></Col>
                <Col md="6"><InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">Monodroga</InputGroup.Text>
                    <Form.Control
                        placeholder="Buscar por nombre de monodroga"
                        value={monodroga}
                        onChange={(e) => setMonodroga(e.target.value)}
                    />
                </InputGroup></Col>
            </Row>
            <Table striped bordered hover responsive variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre Comercial</th>
                        <th>Monodroga</th>
                        <th>Presentacion</th>
                        <th>Gramos</th>
                        <th>Cantidad</th>
                        {/* <th>Disponible</th> */}
                        <th>Lab</th>
                        <th>Precio</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosFiltrados.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="text-center">
                                <div className="alert alert-warning" role="alert">
                                    No se encontraron productos con los filtros proporcionados.
                                </div>
                            </td>
                        </tr>
                    ) : (
                        productosFiltrados.map((producto) => (
                            <ItemProducto producto={producto} setProductos={setProductos} key={producto.id} />
                        ))
                    )}

                </tbody>
            </Table>
        </Container>
    );
};

export default AdminProductos;