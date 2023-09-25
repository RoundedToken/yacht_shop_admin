import { TUpdateDateFrom } from '../../models';
import { getPeriods } from '../../utils/getPeriods';
import styles from './RadioGroup.module.css';
import RadioLabel from './components/RadioLabel';

const PeriodRadioGroup = ({ updateDateFrom }: { updateDateFrom: TUpdateDateFrom }) => {
    const { week, month, year, today, thisWeek, thisMonth, thisYear } = getPeriods();

    return (
        <div className={styles.radioGroup}>
            <RadioLabel
                group={'period'}
                defaultChecked={true}
                name="All time"
                id="allTime"
                func={() => updateDateFrom(null, true)}
            />
            |
            <RadioLabel
                group={'period'}
                name="Today"
                id="today"
                func={() => updateDateFrom(today, true)}
            />
            |
            <RadioLabel
                group={'period'}
                name="This Week"
                id="thisWeek"
                func={() => updateDateFrom(thisWeek, true)}
            />
            |
            <RadioLabel
                group={'period'}
                name="Week"
                id="week"
                func={() => updateDateFrom(week, true)}
            />
            |
            <RadioLabel
                group={'period'}
                name="This Month"
                id="thisMonth"
                func={() => updateDateFrom(thisMonth, true)}
            />
            |
            <RadioLabel
                group={'period'}
                name="Month"
                id="month"
                func={() => updateDateFrom(month, true)}
            />
            |
            <RadioLabel
                group={'period'}
                name="This Year"
                id="thisYear"
                func={() => updateDateFrom(thisYear, true)}
            />
            |
            <RadioLabel
                group={'period'}
                name="Year"
                id="year"
                func={() => updateDateFrom(year, true)}
            />
        </div>
    );
};

export default PeriodRadioGroup;
