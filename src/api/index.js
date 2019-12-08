const baseUrl = 'https://swapi.co/api/'

const fetchUser = async username => {
    const response = await fetch(`${baseUrl}people/?search=${username}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

const fetchPlanets = async planet => {
    const response = await fetch(`${baseUrl}planets/?search=${planet}`);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

export { fetchUser, fetchPlanets };
