import { TUpdateDateFrom, TUpdateDateTo } from '../../models';

const PeriodInput = ({
    updateDate,
    date,
}: {
    date: string;
    updateDate: TUpdateDateFrom | TUpdateDateTo;
}) => {
    return <input type="date" value={date} onChange={(e) => updateDate(e.currentTarget.value)} />;
};

export default PeriodInput;
