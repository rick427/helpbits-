//Login Method
export const login = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err));
}


//Register Method
export const register = user => {
    return fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST", 
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err));
}

//Authenticate Method
export const authenticate = (token, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("token", JSON.stringify(token))
        next();
    }
}

//Logout Method
export const logout = (next) => {
    if(typeof window !== "undefined"){
        localStorage.removeItem("token");
        next();

        return fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "GET"
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
    }
};

//IsAuthenticated Method
export const isAuthenticated = () => {
    if(typeof window == "undefined") return false;

    if(localStorage.getItem("token")){
        return JSON.parse(localStorage.getItem("token"));
    }
    else return false; 
}


export const profileRequest= (id, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        methods: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {return res.json()})
}


export const usersList= () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users/`, {
        methods: "GET",
    })
    .then(res => {return res.json()})
}


export const removeProfile = (id, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(res => {return res.json()})
    .catch(err => console.log(err));
};


export const updateProfile = (id, token, user) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
    .then(res => {return res.json()})
    .catch(err => console.log(err));
};