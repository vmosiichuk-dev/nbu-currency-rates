export const createEndpointWithParam = (endpoint, params) => {
    params = params ?? {};
    return endpoint.replace(/\{(.*?)}/g, (match, key) => {
        return key in params ? params[key] : match;
    });
};
