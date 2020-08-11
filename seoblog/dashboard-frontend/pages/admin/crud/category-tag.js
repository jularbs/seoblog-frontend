import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin.component';
import Link from 'next/link';
import Category from '../../../components/crud/category';
import Tag from '../../../components/crud/tag';


const CreateCategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-2 pb-2">
                            <h2>Manage Categories and Tags</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/crud/category-tag">
                                        <a>Manage Tags and Categories</a>
                                    </Link>
                                </li>           
                            </ul>
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6">
                                    <Category />
                                </div>
                                <div className="col-md-6">
                                    <Tag />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default CreateCategoryTag;