import { useContext } from 'preact/hooks';
import { filterContext } from '../../pages/Home';
import styles from './RadioGroup.module.css';

const ProductFilter = ({ product }: { product: number | null }) => {
    const { updateFilter } = useContext(filterContext);

    return (
        <div className={styles.productFilter} onClick={() => updateFilter('product', null)}>
            Product: <span style={{ color: 'rgba(37, 178, 37, 0.631)' }}>{product ?? 'None'}</span>
        </div>
    );
};

export default ProductFilter;
