import React from 'react';
import {Formik,Field,Form} from 'formik';
import * as Yup from 'yup';

const RecommendationsForm = (props) => {
    const{title, author, genre, summary, onSubmitProp}=props;

    const valSchema = Yup.object().shape({

        title: Yup.string()
        .min(1,"Titulo muy corto")
        .required("campo obligatorio"),

        author: Yup.string()
        .min(1,"Nombre del autor muy breve")
        .required("campo obligatorio"),

        genre: Yup.string()
        .min(1,"Genero muy breve")
        .required("campo obligatorio"),

        summary: Yup.string()
        .min(20,"Deber ingresar un resumen de 20 caracteres mínimo")
        .required("campo obligatorio"),


    })
    return (
      <div>
            <Formik
                initialValues={{
                    title: title,
                    author:author,
                    genre: genre,
                    summary: summary
                }}
                validationSchema={valSchema}
                onSubmit={(values) => onSubmitProp(values)}
                enableReinitialize
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='row d-flex align-items-center justify-content-center shadow-sm p-4 mb-5 border rounded'>

                            <div className='col-2'>
                                <div className='form-floating mt-4'>
                                    <Field id="title" placeholder="título del libro" type="text" name="title" className="form-control" />
                                    <label htmlFor="title">Titulo</label>
                                    {errors.title && touched.title ? <p>{errors.title}</p> : null}
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className='form-group form-floating mt-4'>
                                    <Field id="author" placeholder="Autor" type="text" name="author" className="form-control" />
                                    <label htmlFor="author">Autor</label>
                                    {errors.author && touched.author ? (<p>{errors.author}</p>) : null}
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className='form-group form-floating mt-4'>
                                    <Field id="genre" placeholder="género" type="text" name="genre" className="form-control" />
                                    <label htmlFor="genre">Género</label>
                                    {errors.genre && touched.genre ? (<p>{errors.genre}</p>) : null}
                                </div>
                            </div>

                            <div className='col-2'>
                                <div className='form-group form-floating mt-4'>
                                    <Field id="summary" placeholder="Breve resumen" as="textarea" name="summary" className="form-control" />
                                    <label htmlFor="summary">Breve resumen</label>
                                    {errors.summary && touched.summary ? (<p>{errors.summary}</p>) : null}
                                </div>
                            </div>

                            <div className='col-3 m-2 d-flex justify-content-center'>
                                <button className='btn btn-dark btn-sm mb-3' type="submit" disabled={Object.values(errors).length>0 || Object.values(touched).length===0}>
                                    Crear Libro
                                </button>
                            </div>

                        </div>
                    </Form>
                )}
            </Formik>
      </div>
    );
}

export default RecommendationsForm;
