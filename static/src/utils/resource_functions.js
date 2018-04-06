/* eslint camelcase: 0 */

import axios from 'axios';

export function get_resource_details(hashval) {
    return axios.get(
            '/api/get_resource_from_hash/{}'.format(hashval)
        );
}