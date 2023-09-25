import { useContext } from 'preact/hooks';
import { filterContext } from '../../pages/Home';
import styles from './RadioGroup.module.css';
import RadioLabel from './components/RadioLabel';

const PayTypeGroup = () => {
    const { updateFilter } = useContext(filterContext);

    return (
        <div class={styles.radioGroup}>
            <RadioLabel
                defaultChecked={true}
                func={() => updateFilter('payType', null)}
                id="allPayTypes"
                name="All"
                group="payType"
            />
            |
            <RadioLabel
                func={() => updateFilter('payType', 'Нал')}
                id="Нал"
                name="Нал"
                group="payType"
            />
            |
            <RadioLabel
                func={() => updateFilter('payType', 'Visa')}
                id="Visa"
                name="Visa"
                group="payType"
            />
            |
            <RadioLabel
                func={() => updateFilter('payType', 'Б/н')}
                id="Б/н"
                name="Б/н"
                group="payType"
            />
        </div>
    );
};

export default PayTypeGroup;
