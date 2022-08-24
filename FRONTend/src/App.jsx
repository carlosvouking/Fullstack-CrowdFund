import { Navbar, Welcome, Footer, Services, Transactions, TransactionsFunding } from './components';

const App = () => (
  <div className="min-h-screen">
    <div className="bg-black">
    {/* <div className="gradient-bg-welcome"> */}
      <Navbar />
      <Welcome />
    </div>
    {/* <Services /> */}
    {/* <Transactions /> */}
    <TransactionsFunding />
    <Footer />
  </div>
);

export default App;