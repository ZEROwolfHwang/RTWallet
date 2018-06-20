

export const request = (url, method = 'get') => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method
        }).then((response) => {
            result = response.json();
            resolve(result);
        }).catch((error) => {
            reject(error);
        });
    });
};
