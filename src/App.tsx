import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CenteredSection from './components/CenteredSection';
import Navbar from './components/Navbar';
import './index.css';
import ErrorBoundary from './pages/ErrorBoundary';
import Home from './pages/Home';
import Loading from './pages/Loading';

const About = React.lazy(() => import('./pages/About'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = (): JSX.Element => {
  return (
    <div className="min-h-screen font-serif">
      <BrowserRouter>
        <Navbar />
        <CenteredSection>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Suspense>
          </ErrorBoundary>
        </CenteredSection>
      </BrowserRouter>
    </div>
  );
};

export default App;
