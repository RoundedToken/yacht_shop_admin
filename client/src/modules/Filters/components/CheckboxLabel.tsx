import { useContext } from 'preact/hooks';
import { TStatusValue, TUpdateStatus } from '../../../models';
import { filterContext } from '../../../pages/Home';

const CheckboxLabel = ({
    id,
    name,
    value,
    updateFilterStatus,
}: {
    id: string;
    name: string;
    value: TStatusValue;
    updateFilterStatus: TUpdateStatus;
}) => {
    const { status } = useContext(filterContext);

    return (
        <>
            <input
                checked={status.has(value)}
                type="checkbox"
                id={id}
                onChange={(e) => updateFilterStatus(value, e.currentTarget.checked)}
            />

            <label htmlFor={id}>{name}</label>
        </>
    );
};

export default CheckboxLabel;
