import Header from '../components/Header';

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <Header />
                <div className="mx-auto" style={{maxWidth:"1600px"}}>
                    {children}
                </div>
        </React.Fragment>
    );
};

export default Layout;