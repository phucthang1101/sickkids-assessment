import React, { useState, useEffect } from 'react';
import './Register.css';
import { signin, signup } from '../../actions/userActions';
import Layout from '../../components/Layout';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [togglePassword, setTogglePassword] = useState(false);
  const [name, setName] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  //form validation
  const [errors, setErrors] = useState({});
  const findFormErrors = () => {
    const newErrors = {};
    const emailRex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //email errors
    if (!emailRex.test(email)) newErrors.email = 'Email is not valid';

    // password errors
    if (!password || password === '')
      newErrors.password = 'Please enter a password';

    // confirmPassword errors
    if(password !== confirmpassword)  
      newErrors.confirmpassword = 'Passwords do not match';

    // name errors  
    if (!name || name === '')
      newErrors.name = 'Please enter a name';
    return newErrors;
  };


  const dispatch = useDispatch();

  const userSignUp = useSelector((state) => state.userSignUp);
  const { loading, error, userInfo } = userSignUp;

  let navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [navigate, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      dispatch(signup(name, email, password));
    }
   
  };

  return (
    <Layout>
      <Row className='login_wrapper mx-0'>
        <Col xs={12} md={6} className='login_right_bg_blur d-none d-lg-block'>
          <div className='login_right_bg_text'>
            <div className='login-right__logo-wrapper'>
              <img
                className='logo'
                alt='logo'
                src='images/logo_img_rm_bg.png'
              />
            </div>
            <div className='login-right__slogan'>
              <h3 className='slogan'>Nurturing the seed</h3>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6} className='login_left_form'>
          <div className='login_left_container'>
            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading />}
            <h1 className='login_form_title'>Sign Up</h1>
            <div className='login_form_wrapper register_form_wrapper'>
              <Form onSubmit={handleSubmit}>
                <div>
                  <div className='form-input'>
                    <span className='icon'>
                      <i className='fa fa-envelope' aria-hidden='true'></i>
                    </span>
                    <Form.Control
                      className='input-field'
                      type='email'
                      value={email}
                      placeholder='Email'
                      onChange={(e) => setEmail(e.target.value)}
                      isInvalid={!!errors.email}
                    />
                  </div>
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                  <div className='form-input'>
                    <span className='icon'>
                      <i className='fa fa-user-circle' aria-hidden='true'></i>
                    </span>
                    <Form.Control
                      className='input-field'
                      type='text'
                      value={name}
                      placeholder='Name'
                      onChange={(e) => setName(e.target.value)}
                      isInvalid={!!errors.name}
                    />
                  </div>
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                  <div className='form-input'>
                    <span className='icon'>
                      <i className='fa fa-lock' aria-hidden='true'></i>
                    </span>
                    <Form.Control
                      className='input-field'
                      type={togglePassword ? 'text' : 'password'}
                      value={password}
                      placeholder='Password'
                      onChange={(e) => setPassword(e.target.value)}
                      isInvalid={!!errors.password}
                    />
                    <span className='password-toggle'>
                      <i
                        className={
                          togglePassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                        }
                        aria-hidden='true'
                        onClick={() => setTogglePassword(!togglePassword)}
                      ></i>
                    </span>
                  </div>
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
                  <div className='form-input'>
                    <span className='icon'>
                      <i className='fa fa-keyboard-o' aria-hidden='true'></i>
                    </span>
                    <Form.Control
                      className='input-field'
                      type={togglePassword ? 'text' : 'password'}
                      value={confirmpassword}
                      placeholder='Confirm password'
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      isInvalid={!!errors.confirmpassword}
                    />
                    <span className='password-toggle'>
                      <i
                        className={
                          togglePassword ? 'fa fa-eye' : 'fa fa-eye-slash'
                        }
                        aria-hidden='true'
                        onClick={() => setTogglePassword(!togglePassword)}
                      ></i>
                    </span>
                  </div>
                  <Form.Control.Feedback type='invalid'>
                    {errors.password}
                  </Form.Control.Feedback>
                </div>
                <Button
                  variant='primary'
                  className='login_form_submit_btn'
                  type='submit'
                >
                  Submit
                </Button>
              </Form>
              <Row className='py-3'>
                <Col className='px-5'>
                  <div className='straight_line'>
                    <h3>Or</h3>
                  </div>
                  <p className='text-center'>
                    Have an account? <Link to='/login'>Signin</Link>
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// };
