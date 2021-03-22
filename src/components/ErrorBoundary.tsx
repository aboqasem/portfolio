/* eslint-disable no-console */
import React, { ErrorInfo } from 'react';
import Center from './Center';

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Record<string, unknown>, IState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError = (error: Error): IState => {
    return { hasError: true };
  };

  componentDidCatch = (error: Error, errorInfo: ErrorInfo): void => {
    console.log(`Error: ${error.message}`);
    console.log(`Component Stack: ${errorInfo.componentStack}`);
  };

  render = (): React.ReactNode => {
    if (this.state.hasError) {
      return (
        <Center>
          <p className="text-3xl text-center text-red-800 sm:text-5xl md:text-6xl">Something went wrong...</p>
        </Center>
      );
    }

    return this.props.children;
  };
}

export default ErrorBoundary;
