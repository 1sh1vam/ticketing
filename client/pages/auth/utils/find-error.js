export const mapErrosArrayToObject = (errors=[]) => {
    return errors.reduce((acc, err) => {
        acc[err.field] = err.message
        return acc
    }, {});
}