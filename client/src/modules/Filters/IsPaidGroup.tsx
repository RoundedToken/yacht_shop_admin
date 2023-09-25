import { useContext } from 'preact/hooks';
import styles from './RadioGroup.module.css';
import RadioLabel from './components/RadioLabel';
import { filterContext } from '../../pages/Home';

const IsPaidGroup = () => {
    const { updateFilter } = useContext(filterContext);

    return (
        <div className={styles.radioGroup}>
            <RadioLabel
                defaultChecked={true}
                func={() => updateFilter('isPaid', null)}
                group="isPaid"
                id="allIsPaid"
                name="All"
            />
            |
            <RadioLabel
                func={() => updateFilter('isPaid', false)}
                group="isPaid"
                id="notPaid"
                name="Not Paid"
            />
            |
            <RadioLabel
                func={() => updateFilter('isPaid', true)}
                group="isPaid"
                id="isPaid"
                name="Is Paid"
            />
        </div>
    );
};

export default IsPaidGroup;
