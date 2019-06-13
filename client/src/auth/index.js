//Login Method
export const login = user => {
    return fetch("http://localhost:5000/login", {
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
    return fetch("http://localhost:5000/register", {
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

        return fetch("http://localhost:5000/logout", {
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
