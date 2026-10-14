import { Component, type ReactNode } from 'react'

interface SceneBoundaryProps {
  children: ReactNode
}

interface SceneBoundaryState {
  failed: boolean
}

export class SceneBoundary extends Component<SceneBoundaryProps, SceneBoundaryState> {
  state: SceneBoundaryState = { failed: false }

  static getDerivedStateFromError(): SceneBoundaryState {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="scene-fallback" role="alert">
          <span>scene unavailable</span>
          <p>
            this browser could not open a webgl context. the lattice facts remain in the
            divisor rail.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

