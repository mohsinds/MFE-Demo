import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "1rem", border: "1px solid #ccc", color: "#c00" }}>
          <strong>Remote failed to load.</strong> {this.props.fallbackMessage || "Check console for details."}
        </div>
      );
    }
    return this.props.children;
  }
}
