import { useLocation } from 'preact-iso';
import { useEffect, useMemo } from 'preact/hooks';

export const useOrderParams = () => {
    const location = useLocation();
    const path = location.path.split('/');
    const orderNum = path[path.length - 1];

    const params = useMemo(() => {
        return { id: orderNum };
    }, [orderNum]);

    useEffect(() => {
        document.title = `${orderNum}`;
    }, []);

    return { params, location };
};
