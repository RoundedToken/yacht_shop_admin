import styles from './RadioGroup.module.css';
import { TClient } from '../../models';
import { useContext } from 'preact/hooks';
import { filterContext } from '../../pages/Home';

const ClientsFilter = ({ clients }: { clients?: TClient[] }) => {
    const { updateFilter } = useContext(filterContext);

    return (
        <div className={styles.clientsList}>
            <label htmlFor="clientsInput">Clients: </label>
            <input
                type="text"
                list="clients"
                id="clientsInput"
                placeholder="Choose client"
                onBlur={(e) =>
                    updateFilter(
                        'client',
                        clients.find((v) => {
                            return v.name === e.currentTarget.value;
                        })?.id ?? null
                    )
                }
            />

            <datalist id="clients">
                {clients &&
                    clients.map((client) => <option key={client.id} value={client.name}></option>)}
            </datalist>
        </div>
    );
};

export default ClientsFilter;
