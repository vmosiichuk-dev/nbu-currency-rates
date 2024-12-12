import { useNavigate } from 'react-router-dom';

export const useNavigateTransition = () => {
    const navigate = useNavigate();

    return (path, options = {}) => {
        if (document.startViewTransition) {
            document.startViewTransition(() => navigate(path, options));
        } else {
            navigate(path, options);
        }
    };
};
