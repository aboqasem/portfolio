import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CenteredSection from './components/CenteredSection';
import Navbar from './components/Navbar';
import './index.css';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen font-serif">
      <BrowserRouter>
        <Navbar />
        <CenteredSection>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="*" component={NotFound} />
          </Switch>
        </CenteredSection>
      </BrowserRouter>
    </div>
  );
};

export default App;
