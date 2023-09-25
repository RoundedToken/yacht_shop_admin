import { StateUpdater } from 'preact/hooks';
import styles from './VisibilityToggle.module.css';

const VisibilityToggle = ({
    isShowToggle,
    setIsShowToggle,
}: {
    setIsShowToggle: StateUpdater<boolean>;
    isShowToggle: boolean;
}) => {
    return (
        <div>
            <input
                className={styles.visibilityToggle}
                type="checkbox"
                checked={isShowToggle}
                id="isShowToggle"
                onChange={(e) => setIsShowToggle(e.currentTarget.checked)}
            />

            <label htmlFor="isShowToggle">Is Show Visibility Toggles</label>
        </div>
    );
};

export default VisibilityToggle;
