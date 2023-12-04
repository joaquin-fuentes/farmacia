import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imagenes/logoFarmacia.jpeg";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
    const navegar = useNavigate();

    const logout = () => {
        Swal.fire({
          title: "¿Está seguro?",
          text: "¿Desea cerrar sesión?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, cerrar sesión",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            sessionStorage.removeItem("usuario");
            setUsuarioLogueado(null); // Actualiza el estado a null o el valor adecuado para indicar que no hay usuario logueado.
            navegar("/");
          }
        });
      };

    return (
        <>
            <Navbar expand="lg" bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/administrador"><img src={logo} alt="Logo de la pagina" className="logoMenu rounded"/></Navbar.Brand>
                    <h5 className="text-light">Bienvenido {usuarioLogueado.nombre} ({usuarioLogueado.rol})</h5>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="ms-auto">
                            <Nav.Link href="/administrador">Inicio</Nav.Link>
                            {usuarioLogueado ? (
                                <Nav.Link onClick={logout}>Cerrar Sesión</Nav.Link>
                            ) : null}        
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Menu;