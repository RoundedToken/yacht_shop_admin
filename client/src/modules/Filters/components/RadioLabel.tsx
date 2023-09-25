const RadioLabel = ({
    func,
    id,
    name,
    defaultChecked = false,
    group,
}: {
    func: () => void;
    id: string;
    name: string;
    defaultChecked?: boolean;
    group: string;
}) => {
    return (
        <>
            <input
                defaultChecked={defaultChecked}
                type="radio"
                name={group}
                id={id}
                onChange={func}
            />

            <label htmlFor={id}>{name}</label>
        </>
    );
};

export default RadioLabel;
