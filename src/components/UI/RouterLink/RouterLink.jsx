import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

export const RouterLink = forwardRef(({ to, children, ...props }, ref) => {
	const handleClick = (e) => {
		e.preventDefault();

		if (document.startViewTransition) {
			document.startViewTransition(() => {
				window.history.pushState({}, '', to);
				const navigateEvent = new PopStateEvent('popstate');
				window.dispatchEvent(navigateEvent);
			});
		} else {
			window.history.pushState({}, '', to);
			const navigateEvent = new PopStateEvent('popstate');
			window.dispatchEvent(navigateEvent);
		}
	};

	return (
		<Link to={to} ref={ref} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
});
