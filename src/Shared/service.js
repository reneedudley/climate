import  qs from 'qs';

const service = (url, params, method ='GET') => {
    const options  = {
        method,
    };
    params.appid = 'da65fafb6cb9242168b7724fb5ab75e7';
    params.units = 'imperial';
    let destination = url;
    if(params && method !== 'GET'){
        options['body'] = qs.stringify(params, { arrayFormat: 'brackets' });
    }else if(params && method === 'GET'){
        destination = `${url}?${qs.stringify(params, { arrayFormat: 'brackets' })}`;
    }

    return fetch(destination, options)
    .then(response => response.json())
    .catch(error => {
        throw new Error(error.message)
    })
    .then(data => {
        if (data.cod &&
            (data.cod.toString()[0] == 4 ||
            data.cod.toString()[0] == 5) ) {
            throw new Error(data.message)
        }
        return data
    });
};

export default service;
