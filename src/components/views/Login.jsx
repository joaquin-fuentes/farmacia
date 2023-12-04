import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { login } from "../../helpers/queries";
import Swal from "sweetalert2"
import logoFarmacia from "../../assets/imagenes/logoFarmacia.jpeg"


const Login = ({ setUsuarioLogueado }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navegacion = useNavigate();


    const onSubmit = (data) => {
        if(data.nombreUsuario === "joaquin"){
            data.rol = "administrador"
        } else {
            data.rol = "empleado"
        }
        console.log(data)
        login(data).then((respuesta)=>{
            if(respuesta){
              sessionStorage.setItem("usuario", JSON.stringify(respuesta));
              setUsuarioLogueado(respuesta);
              Swal.fire("Bienvenido", "Ha ingresado correctamente", "success");
              navegacion("/administrador");
            } else{
              Swal.fire("Error", "Email o contraseña incorrecto", "error");
            }
          })
    };



    return (
        <main className="main-login ">
            <section className="contenedor-login-completo p-4 m-2 text-center">
                <img src={logoFarmacia} alt="logo del sistema de la farmacia" className="imagen-login rounded"  /> 
                <Form className="my-4 mx-4" onSubmit={handleSubmit(onSubmit)} >
                    <Form.Group className="mb-4">
                        <Form.Control type="text" placeholder="Usuario" id="input-login" 
                            {...register("nombreUsuario", {
                                required: "El Usuario es obligatorio",
                                pattern: {
                                    vaue: /^.{6,}$/,
                                    message: "El nombre de usuario debe contener al menos 6 caracteres"
                                }
                            })} />
                        <Form.Text className="text-danger">
                            {errors.nombreUsuario?.message}
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Control type="password" placeholder="Contraseña" id="input-login" 
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                pattern: {
                                    vaue: /^.{6,}$/,
                                    message: "La contraseña debe contener al menos 6 caracteres"
                                }
                            })} />
                        <Form.Text className="text-danger">
                            {errors.password?.message}
                        </Form.Text>
                    </Form.Group>
                    <Button type="submit" className="btn btn-primary w-100 ">Iniciar sesion</Button>
                </Form>
            </section>
        </main>
    );
};

export default Login;