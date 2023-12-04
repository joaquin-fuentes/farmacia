import { Button, Form, Container } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { consultaCrearProducto } from "../../helpers/queries";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const CrearProducto = () => {

    const navegacion = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
         reset
    } = useForm();

    const onSubmit = (productoNuevo) => {
        console.log(productoNuevo)
        console.log("paso la validacion")
        // realizar la peticion que agrewga producto a la api
        consultaCrearProducto(productoNuevo).then((respuesta)=>{
            if(respuesta.status === 201){
                Swal.fire(
                    'Agregado!',
                    `El producto ${productoNuevo.nombreComercial} fue creado`,
                    'success',
                    navegacion("/administrador")
                )
                reset()
            } else{
                Swal.fire(
                    'Error!',
                    `No se pudo procesar su peticion`,
                    'error'
                )
            }
        })
    }

    return (
        <Container fluid className="p-5  bg-azulOscuro text-light d-flex justify-content-center flex-column align-items-center">
            <h2>Cargar Nuevo Medicamento</h2>
            <hr className="w-50 mb-4"/>
            <Form onSubmit={handleSubmit(onSubmit)} className="w-50">
                <Form.Group className="mb-3">
                    <Form.Label>Nombre Comercial*</Form.Label>
                    <Form.Control type="text" placeholder="Ej: Tafirol" maxLength={60} {
                        ...register('nombreComercial', {
                            required: 'El campo es obligatorio',
                            minLength: {
                                value: 2,
                                message: "Este campo debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 60,
                                message: "Este campo debe tener como maximo 60 caracteres"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.nombreComercial?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Monodroga*</Form.Label>
                    <Form.Control type="text" placeholder="Ej: Paracetamol" maxLength={60} {
                        ...register('monodroga', {
                            required: 'El campo es obligatorio',
                            minLength: {
                                value: 2,
                                message: "Este campo debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 60,
                                message: "Este campo debe tener como maximo 60 caracteres"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.monodroga?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Presentacion*</Form.Label>
                    <Form.Control type="text" placeholder="Ej: comprimidos" maxLength={60} {
                        ...register('presentacion', {
                            required: 'El campo es obligatorio',
                            minLength: {
                                value: 2,
                                message: "Este campo debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 60,
                                message: "Este campo debe tener como maximo 60 caracteres"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.presentacion?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Gramos*</Form.Label>
                    <Form.Control type="text" placeholder="Ej: 600gr" maxLength={60} {
                        ...register('gramos', {
                            required: 'El campo es obligatorio',
                            minLength: {
                                value: 2,
                                message: "Este campo debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 60,
                                message: "Este campo debe tener como maximo 60 caracteres"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.gramos?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cantidad*</Form.Label>
                    <Form.Control type="text" placeholder="Ej: x30" maxLength={60} {
                        ...register('cantidad', {
                            required: 'El campo es obligatorio',
                            minLength: {
                                value: 2,
                                message: "Este campo debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 60,
                                message: "Este campo debe tener como maximo 60 caracteres"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.cantidad?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Disponibilidad*</Form.Label>
                    <Form.Select aria-label="Default select example" {
                        ...register('disponibilidad', {
                            required: 'Debe seleccionar una disponibilidad',
                        })}>
                        <option value="">Seleccione una opcion</option>
                        <option value="si">Si</option>
                        <option value="no">No</option>
                    </Form.Select>
                    <Form.Text className="text-danger">
                        {errors.disponibilidad?.message}

                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Laboratorio*</Form.Label>
                    <Form.Control type="text" placeholder="Ej: Bagó" maxLength={60} {
                        ...register('laboratorio', {
                            required: 'El campo es obligatorio',
                            minLength: {
                                value: 2,
                                message: "Este campo debe tener como minimo 2 caracteres"
                            },
                            maxLength: {
                                value: 60,
                                message: "Este campo debe tener como maximo 60 caracteres"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.laboratorio?.message}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Precio*</Form.Label>
                    <Form.Control type="number" placeholder="Ej:50" maxLength={6} min={0} max={200000} {
                        ...register('precio', {
                            required: 'El campo es obligatorio',
                            pattern: {
                                value: /^(?:[1-9]\d{0,4}|200000)$/,
                                message: "Debe ingresar un numero entre 1 y 200000"
                            }
                        })
                    } />
                    <Form.Text className="text-danger">
                        {errors.precio?.message}
                    </Form.Text>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button type="submit" className="w-25 m-3">Guardar</Button>
                  <Link to={"/administrador"} className="btn btn-danger w-25 m-3">
                    Volver
                  </Link>
                </div>
            </Form>
        </Container>
    );
};

export default CrearProducto;