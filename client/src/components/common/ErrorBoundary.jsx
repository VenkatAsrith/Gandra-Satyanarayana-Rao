import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary-card">
          <div className="error-boundary-icon">⚠</div>
          <h3 className="error-boundary-title">
            {this.props.title || 'Component could not be rendered'}
          </h3>
          <p className="error-boundary-desc">
            {this.props.message ||
              'A temporary display issue occurred with this section. Other parts of the page remain fully functional.'}
          </p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={this.handleReset}
          >
            Retry Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
