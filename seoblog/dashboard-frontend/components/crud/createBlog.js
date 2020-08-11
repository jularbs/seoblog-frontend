import Link from 'next/link';
import {useState, useEffect} from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import {withRouter} from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';

import {getCategories} from '../../actions/category';
import {getTags} from '../../actions/tag';
import {create} from '../../actions/blog';

import {Quillmodules, Quillformats} from '../../helpers/quill';

const ReactQuill = dynamic(() => import('react-quill'), {ssr: false});
import '../../node_modules/react-quill/dist/quill.snow.css';

const CreateBlog = ({router}) => {

    const blogFromLS = () => {
        if(typeof window === 'undefined') {
            return false;
        }
        if(localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else{
            return false;
        }
    };
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checkedCat, setCheckedCat] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // categories

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });

    const {error, sizeError, success, formData, title, hidePublishButton } = values;
    const token = getCookie('token');
    useEffect(() => {
        setValues({...values, formData: new FormData()});

        initCategories();
        initTags();
    }, [router]);

    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            }else{
                setTags(data);
            }
        });
    };

    const publishBlog = e => {
        e.preventDefault();
        // console.log('Publish Blog');
        create(formData, token).then(data => {
            if(data.error) {
                setValues({...values, error: data.error});
            }else {
                setValues({...values, title: '', error: '', success: `A new blog titled "${data.title}" is created.`});
                setBody('');
                setCategories([]);
                setTags([]);
            }
        })
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value, formData, error: ''});
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);

        if(typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>
                <div className="form-group">
                    <ReactQuill modules={Quillmodules} formats= {Quillformats} value={body} placeholder="Type something amazing..." onChange={handleBody} />
                </div>

                <div>
                    <button className="btn btn-primary" type="submit">
                        Publish
                    </button>
                </div>
            </form>
        )
    }

    const handleToggle = c => () => {
        setValues({...values, error: ''});
        
        const all = [...checkedCat];
        const clickedCategory = checkedCat.indexOf(c);

        if(clickedCategory === -1){
            all.push(c);
        }else{
            all.splice(clickedCategory, 1);
        }

        console.log(all);
        setCheckedCat(all);
        formData.set('categories', all);
    };

    const handleTagToggle = t => () => {
        setValues({...values, error: ''});

        const all = [...checkedTag];
        const clickedTag = checkedTag.indexOf(t);

        if(clickedTag === -1){
            all.push(t);
        }else{
            all.splice(clickedTag, 1);
        }

        setCheckedTag(all);
        formData.set('tags', all);
    }

    const showCategories = () => {
        return (
            categories && categories.map((c,i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2"/>
                    <label htmlFor="P" className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    }

    const showTags = () => {
        return (
            tags && tags.map((t,i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagToggle(t._id)} type="checkbox" className="mr-2"/>
                    <label htmlFor="P" className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            {success}
        </div>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {showSuccess()}
                    {showError()}
                    {createBlogForm()}
                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group">
                            <h5>Featured Image</h5>
                            <p className="text-muted mb-1">Max size: 1mb</p>
                            <label className="btn btn-outline-info">
                                Upload featured image
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden/> 
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>
                            {showCategories()}
                        </ul>
                        <hr/>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <ul style={{maxHeight: '200px', overflowY: 'scroll'}}>
                            {showTags()}
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
       
    )
};

export default withRouter(CreateBlog);