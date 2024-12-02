export default function stringifyAndJoin(values) {
    return values.map(value => {
        if (typeof value === 'string') {
            return `'${value}'`;
        } else if (Array.isArray(value)) {
            return `'${value.join(', ')}'`;
        } else {
            return value;
        }
    }).join(', ');
}