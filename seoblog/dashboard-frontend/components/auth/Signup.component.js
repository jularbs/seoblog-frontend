import {useState, useEffect} from 'react';
import {signup, isAuth} from '../../actions/auth';
import Router from 'next/router';

const SignupComponent = () => {
    const [values, setValues] = useState({
        name: 'Ryan',
        email: 'ryan1@gmail.com',
        password: 'rrrrrr',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {name, email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true, error: false});
        const user = {name, email, password};

        signup(user)
        .then(data => {
            if(data.error) {
                console.log(data);
                setValues({...values, error: data.error});
            }else{
                setValues({
                    ...values,
                    name: '', 
                    email: '', 
                    password: '', 
                    error: '', 
                    loading: false, 
                    message: data.message, 
                    showForm: false
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value});
        console.log(e.target.value);
    };

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        value={name}
                        type="text" 
                        className="form-control mb-2" 
                        placeholder="Type your name"
                        onChange={handleChange('name')} 
                    />
                    <input 
                        value={email}
                        type="email" 
                        className="form-control mb-2" 
                        placeholder="Type your email"
                        onChange={handleChange('email')} 
                    />
                    <input 
                        value={password}
                        type="password" 
                        className="form-control" 
                        placeholder="Type your password"
                        onChange={handleChange('password')} 
                    />

                    <button className="btn btn-primary mt-3">Signup</button>
                </div>
            </form>
        );
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

  return (
      <React.Fragment>
        {showError()}
        {showLoading()}
        {showMessage()}
        {showForm && signupForm()}
      </React.Fragment>
  );
};

export default SignupComponent;