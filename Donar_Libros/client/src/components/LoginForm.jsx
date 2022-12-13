import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup'

const LoginForm = (props) => {
    const{email, password, onSubmitProp}=props;

    const valSchema = Yup.object().shape({

        email: Yup.string()
        .email("Correo no valido")
        .min(3,"Correo electronico  muy corto")
        .required("Por favor ingresa tu correo electrónico"),

        password: Yup.string()
        .min(8,"Tu contraseña debe ser más larga")
        .required("Por favor ingresa una contraseña"),
    })
    return (
    <div>
        <Formik
            initialValues={{
                email:email,
                password:password,
            }}
            validationSchema = {valSchema}
            onSubmit={values=>onSubmitProp(values)}
            enableReinitialize
            >
            {({errors,touched})=>(
                <Form>
                    <div className= 'container card w-75 text-white bg-dark mt-5 shadow-lg p-3 mb-5 rounded'>
                        <div className='card-body d-flex justify-content-evenly'>

                            <div className='mt-3'>
                                <label htmlFor='email'>Correo electrónico:</label>
                                <Field id='email' type='text' name='email'/>
                                {errors.email && touched.email ? <p>{errors.email}</p>:null}
                            </div>

                            <div className='mt-3'>
                                <label htmlFor='password'>Contraseña:</label>
                                <Field id='password' type='password' name='password'/>
                                {errors.password && touched.password ? <p>{errors.password}</p>:null}
                            </div>
                            
                            <div className='mt-0'>
                                <button className='btn btn-outline-light mt-3' type='submit' disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>Log in</button>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    );
}

export default LoginForm;
