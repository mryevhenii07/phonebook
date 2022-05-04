const BASE_URL = 'https://62010aa4fdf50900172497db.mockapi.io/'

const fetchData = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}/${path}`, options);
  return res.ok ? res.json() : Promise.reject(new Error(res.statusText));
};

const getData = (endpoint, options) => fetchData(endpoint, options);

const saveItem = (endpoint, item, options = {}) => {
  const finalOptions = {
    method: 'POST',
    // body: item,-чтобы проверять ошибку (test)
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    ...options,
  };
  return fetchData(endpoint, finalOptions);
};


const deleteItem = (endpoint, id, options = {}) =>
  fetchData(`${endpoint}/${id}`, { method: 'DELETE', ...options });

export { getData, saveItem, deleteItem };
