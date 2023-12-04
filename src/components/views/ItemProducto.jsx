import { Button } from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import Swal from "sweetalert2"
import { consultaBorrarProducto, obtenerProductos } from "../../helpers/queries";
import { PiNotePencilBold } from "react-icons/pi"
import { FaRegTrashAlt } from "react-icons/fa";



const ItemProducto = ({ producto, setProductos }) => {

    const borrarProducto = () => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Seguro que deseas borrar el producto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                // aqui tengo que hacer la peticion DELETE 
                consultaBorrarProducto(producto.id).then((respuesta) => {
                    if (respuesta.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            `El producto ${producto.nombreComercial} fue eliminado`,
                            'success'
                        )
                        //actualizar el sate producto del componente administrador
                        obtenerProductos().then((respuesta) => { setProductos(respuesta) })

                    } else {
                        Swal.fire("Se produjo un error", "Error, intentelo mas tarde ", "error")
                    }
                })
            }
        })
    }

    const rowClassName = producto.disponibilidad === "no" ? "table-secondary" : "";

    return (
        <tr className={rowClassName}>
            <td>{producto.id}</td>
            <td>{producto.nombreComercial}</td>
            <td>{producto.monodroga}</td>
            <td>{producto.presentacion}</td>
            <td>{producto.gramos}</td>
            <td>{producto.cantidad}</td>
            {/* <td>{producto.disponibilidad}</td> */}
            <td>{producto.laboratorio}</td>
            <td>${producto.precio}</td>
            <td className="d-flex">
                <Link
                    className="btn btn-warning m-1"
                    to={`/administrador/editar/${producto.id}`}
                > <PiNotePencilBold />
                </Link>
                <Button className="m-1" variant="danger" onClick={borrarProducto}><FaRegTrashAlt />
                </Button>
            </td>
        </tr>
    );
};

export default ItemProducto;