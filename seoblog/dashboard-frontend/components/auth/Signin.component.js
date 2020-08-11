import {useState, useEffect} from 'react';
import {signin, authenticate, isAuth} from '../../actions/auth';
import Router from 'next/router';

const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'ryan1@gmail.com',
        password: 'rrrrrr',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const {email, password, error, loading, message, showForm} = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, loading: true, error: false});
        const user = {email, password};

        signin(user)
        .then(data => {
            if(data.error) {
                //console.log(data);
                setValues({...values, error: data.error});
            }else{
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1){
                        Router.push(`/admin`);
                    }else{
                        Router.push(`/user`);
                    }          
                });           
            }
        });
    };

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value});
        console.log(e.target.value);
    };

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                        className = "form-control"
                        placeholder="Type your password"
                        onChange={handleChange('password')} 
                    />

                    <button className="btn btn-primary mt-3">Sign in</button>
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
        {showForm && signinForm()}
      </React.Fragment>
  );
};

export default SigninComponent;