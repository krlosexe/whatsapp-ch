import React, { useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, FormGroup, Alert, Form, Input, Button, FormFeedback, Label, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

//i18n
import { useTranslation } from 'react-i18next';

//redux store
import { loginUser, apiError } from '../../redux/actions';

//Import Images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

import {AuthService} from '../../services'



/**
 * Login component
 * @param {*} props 
 */
const Login = (props) => {

    /* intilize t variable for multi language implementation */
    const { t } = useTranslation();

    const clearError = () => {
        props.apiError("");
    }

    useEffect(clearError);

    // validation
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please Enter Your Username'),
            password: Yup.string().required('Please Enter Your Password')
        }),
        onSubmit: values => {
            const Auth = AuthService.Login(values.email, values.password)

            Auth.then((data)=>{
                localStorage.setItem("authUser", true)
                localStorage.setItem("user_id", data._id)
                localStorage.setItem("name", data.name)
                localStorage.setItem("phone", data.phone)
                localStorage.setItem("rol", data.rol)
                localStorage.setItem("id_advisor", data.id_user)
                window.location.href = "/";
            }).catch(()=>{
                alert("Las credenciales son incorrectas")
            })
          
            
        },
    });

    if (localStorage.getItem("authUser")) {
        return <Redirect to="/" />;
    }

    return (
        <React.Fragment>

            <div className="account-pages my-5 pt-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} >
                            <div className="text-center mb-4">
                                <Link to="/" className="auth-logo mb-5 d-block">
                                    <img src={"https://chseguros.com.co/wp-content/uploads/2021/09/nuevologo-1.svg"} alt="" height="30" className="logo logo-dark" />
                                    <img src={"https://chseguros.com.co/wp-content/uploads/2021/09/nuevologo-1.svg"} alt="" height="30" className="logo logo-light" />
                                </Link>

                                <h4>{t('Iniciar Sesi??n')}</h4>

                            </div>

                            <Card>
                                <CardBody className="p-4">
                                    {
                                        props.error && <Alert color="danger">{props.error}</Alert>
                                    }
                                    <div className="p-3">

                                        <Form onSubmit={formik.handleSubmit}>

                                            <div className="mb-3">
                                                <Label className="form-label">{t('Usuario')}</Label>
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <span className="input-group-text text-muted" id="basic-addon3">
                                                        <i className="ri-user-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        className="form-control form-control-lg border-light bg-soft-light"
                                                        placeholder="Usuario"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.email}
                                                        invalid={formik.touched.email && formik.errors.email ? true : false}
                                                    />
                                                    {formik.touched.email && formik.errors.email ? (
                                                        <FormFeedback type="invalid">{formik.errors.email}</FormFeedback>
                                                    ) : null}
                                                </InputGroup>
                                            </div>

                                            <FormGroup className="mb-4">
                                                <div className="float-end">
                                                </div>
                                                <Label className="form-label">{t('Contrase??a')}</Label>
                                                <InputGroup className="mb-3 bg-soft-light rounded-3">
                                                    <span className="input-group-text text-muted">
                                                        <i className="ri-lock-2-line"></i>
                                                    </span>
                                                    <Input
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        className="form-control form-control-lg border-light bg-soft-light"
                                                        placeholder="Contrase??a"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.password}
                                                        invalid={formik.touched.password && formik.errors.password ? true : false}
                                                    />
                                                    {formik.touched.password && formik.errors.password ? (
                                                        <FormFeedback type="invalid">{formik.errors.password}</FormFeedback>
                                                    ) : null}

                                                </InputGroup>
                                            </FormGroup>

                                            <div className="form-check mb-4">
                                                <Input type="checkbox" className="form-check-input" id="remember-check" />
                                                <Label className="form-check-label" htmlFor="remember-check">{t('Recordarme')}</Label>
                                            </div>

                                            <div className="d-grid">
                                                <Button color="primary" block className=" waves-effect waves-light" type="submit">{t('Ingresar')}</Button>
                                            </div>

                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>

                            <div className="mt-5 text-center">
                                <p>?? {t('2021 CHSEGUROS')}. {t('Creado con')} <i className="mdi mdi-heart text-danger"></i> {t('por Carlos Cardenas')}</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default withRouter(connect(mapStateToProps, { loginUser, apiError })(Login));