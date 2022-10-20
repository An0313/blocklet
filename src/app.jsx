import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './app.css';
// import Home from './pages/home';
// import About from './pages/about';
import CodingTest from './pages/coding-test';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<CodingTest />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} /> */}
        {/* <Route exact path="/">
        </Route> */}
        {/* <Redirect from="/" to="/coding-test/00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa" /> */}

        {/* <Route exact path="/home/:blockHash" element={<CodingTest />} /> */}
        <Route
          path="*"
          element={<Navigate to="/?blockHash=00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa" />}
        />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <App />
    </Router>
  );
}
