import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#171717] flex items-center justify-center text-center px-4">
          <div className="space-y-5">
            <p className="text-[#F3BA18] text-sm uppercase tracking-widest font-semibold">
              Unexpected Error
            </p>
            <h1 className="text-white text-2xl font-bold">Something went wrong</h1>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              Please refresh the page. If the problem persists, contact support.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="custom-button-two px-8 py-3 rounded-lg font-semibold text-sm"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
