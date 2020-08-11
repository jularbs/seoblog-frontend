import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin.component';
import Link from 'next/link';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-2 pb-2">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <Link href="/admin/crud/category-tag">
                                        <a>Manage Tags and Categories</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/admin/crud/blog">
                                        <a>Create Blog</a>
                                    </Link>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="col-md-8">Right</div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;