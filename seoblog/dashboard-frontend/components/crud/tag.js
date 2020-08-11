import {useState, useEffect} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {isAuth, getCookie} from '../../actions/auth';
import { create, getTags, removeTag} from '../../actions/tag';
import { Alert} from 'reactstrap';

const Tag = () => {

    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false
    });

    const { name, error, success, tags, removed, reload} = values;
    const token = getCookie('token');

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then(data => {
            if(data.error){
                console.log(data.error);
            }else {
                setValues({...values, tags: data});
            }
        });
    };

    const showTags = () => {
        return tags.map((t,i) => {
            return (
            <button
                onDoubleClick={() => deleteConfirm(t.slug)}
                title="Double click to delete"
                key={i}
                className="btn btn-outline-primary mr-1 ml-1 mt-3"
            >
                {t.name}
            </button>
            );
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete the tag?');
        if(answer){
            deleteTag(slug);
        }
    };

    const deleteTag = slug => {
        removeTag(slug, token).then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload});
            }
        });
    };

    const clickSubmit = e => {
        e.preventDefault();

        create({name}, token).then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false});
            }else{
                setValues({...values, error: false, success: true, name: '', removed: false, reload: !reload});
            }
        });
    };

    const handleChange = e => {
        setValues({...values, name: e.target.value, error:false, success: false, removed: false});
    };

    //alerts

    const onDismissAlert = () => {
        setValues({...values, success: false, removed: false, error: false});
    }

    const showSuccess = () => {
        if(success){
            return <Alert color="success" isOpen={success} toggle={onDismissAlert}>Tag created successfully</Alert>
        }
    };

    const showError = () => {
        if(error) {
            return <Alert color="warning" isOpen={error} toggle={onDismissAlert}>Tag already exists</Alert>
        }
    };

    const showRemoved = () => {
        if(removed) {
            return <Alert color="danger" isOpen={removed} toggle={onDismissAlert}>Tag is removed</Alert>
        }
    };

    const newTagForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required></input>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Create Tag
                </button>
            </div>
        </form>
    );

    return (
        <React.Fragment>
            {showSuccess()}
            {showError()}
            {showRemoved()}
            <div>
                {newTagForm()}
                {showTags()}
            </div>
        </React.Fragment>
    );
}

export default Tag;