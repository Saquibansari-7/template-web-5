import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    if (import.meta.env.DEV) console.error('[ErrorBoundary]', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-slate-900 border border-red-500/40 rounded-xl p-6">
            <h1 className="text-red-400 font-semibold text-lg mb-2">Something went wrong</h1>
            <p className="text-sm text-slate-300 mb-4">{this.state.error.message}</p>
            <pre className="text-xs text-slate-500 bg-slate-950 rounded-lg p-3 overflow-auto max-h-48">
              {this.state.error.stack}
            </pre>
            <button
              onClick={() => location.reload()}
              className="mt-4 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-sm font-semibold"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
