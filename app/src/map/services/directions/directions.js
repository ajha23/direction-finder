import { restClient } from '../../../common/services/';
import { API_CONSTANTS } from '../../config';


const fetchRoute = async token => {
    const url = `${API_CONSTANTS.route}/${token}`;
    const response = await restClient.get(url);
    const { data } = response;

    return data;
};


const fetchToken = async (origin, dest) => {
    const url = API_CONSTANTS.route;
    const request = {
        origin,
        dest
    };

    const response = await restClient.post(url, request);

    const { data } = response;

    return data.token;
};


const fetchDirections = async (origin, dest) => {
    const token = await fetchToken(origin, dest);
    let result = await fetchRoute(token);

    if (
        result &&
        result.status &&
        result.status.toLowerCase() === 'in progress'
    ) {
        result = await fetchDirections(origin, dest);
    }

    return result;
};

export { fetchDirections, fetchToken, fetchRoute };
