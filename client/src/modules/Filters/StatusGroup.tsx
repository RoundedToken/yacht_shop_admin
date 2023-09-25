import { TUpdateStatus } from '../../models';
import CheckboxLabel from './components/CheckboxLabel';
import styles from './RadioGroup.module.css';

const StatusGroup = ({ updateFilterStatus }: { updateFilterStatus: TUpdateStatus }) => {
    return (
        <div class={styles.radioGroup}>
            <CheckboxLabel
                updateFilterStatus={updateFilterStatus}
                value={1}
                name="Покупка"
                id="Покупка"
            />
            |
            <CheckboxLabel
                updateFilterStatus={updateFilterStatus}
                value={-1}
                name="Продажа"
                id="Продажа"
            />
            |
            <CheckboxLabel
                updateFilterStatus={updateFilterStatus}
                value={0}
                name="Заказ покупателя"
                id="Заказ покупателя"
            />
            |
            <CheckboxLabel
                updateFilterStatus={updateFilterStatus}
                value={2}
                name="Прием на реализацию"
                id="Прием на реализацию"
            />
            |
            <CheckboxLabel
                updateFilterStatus={updateFilterStatus}
                value={3}
                name="Заказ поставщику"
                id="Заказ поставщику"
            />
        </div>
    );
};

export default StatusGroup;
