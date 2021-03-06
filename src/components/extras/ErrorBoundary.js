/** @format */

import React from 'react';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className='item-center text-bold text-mfont flex-column'>
					<span className='text-danger'>Error!</span>
					<p>Something went wrong, Please refresh your browser.</p>
				</div>
			);
		}

		return this.props.children;
	}
}
