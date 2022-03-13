export const mapErrosArrayToObject = (errors=[]) => {
    return errors.reduce((acc, err) => {
        if (err.field) {
            acc[err.field] = err.message
        } else {
            acc.generic = [ ...acc.generic, err.message ]
        }
        return acc
    }, {generic: []});
}