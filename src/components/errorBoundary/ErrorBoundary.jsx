import React from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends React.Component {
	state = {
		error: false,
	};

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({
			error: true,
		});
	}

	render() {
		if (this.state.error) {
			return (
				<div>
					<ErrorMessage />
					<div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '22px' }}>
						Something went wrong
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
