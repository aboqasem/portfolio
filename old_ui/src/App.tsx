import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import './index.css';

const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Blog = React.lazy(() => import('./pages/Blog/'));
const BlogPost = React.lazy(() => import('./pages/Blog/BlogPost'));
const NotFound = React.lazy(() => import('./components/NotFound'));

const App = (): JSX.Element => {
  return (
    <div className="font-serif">
      <BrowserRouter>
        <Navbar />
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/blog/:id" component={BlogPost} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
};

export default App;
