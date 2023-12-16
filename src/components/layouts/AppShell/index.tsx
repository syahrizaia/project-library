import Navbar from '../Navbar'
import Footer from '../Footer'

type AppShellProps = {
    children: React.ReactNode;
}

const AppShell = (props: AppShellProps) => {
    const { children } = props;
    return (
        <main>
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}

export default AppShell;