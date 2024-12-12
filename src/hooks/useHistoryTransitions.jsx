import { useEffect } from 'react';
import { useNavigateTransition } from '@hooks/useNavigateTransition';

export const useHistoryTransitions = () => {
    const navigateVT = useNavigateTransition();

    useEffect(() => {
        const handlePopState = () => {
            navigateVT(window.location.pathname, { replace: true });
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigateVT]);
};
