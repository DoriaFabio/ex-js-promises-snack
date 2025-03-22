# ex-js-promises-snack
// https://dummyjson.com/users

// const fetchApp = fetch("https://dummyjson.com/users/1");

// function resolve(response) {
//     return response.json();
// }

// function handleError(error){
//     console.log(error);
// }

// const jsonRequest = fetchApp.then(resolve)
// .catch(handleError);


// jsonRequest.then(function(obj){
//     console.log(obj);
// })
// .catch(handleError);

# Utenti

const getUser = id => {
    return new Promise((res, rej) => {
        fetch(`https://dummyjson.com/users/${id}`)
            .then(response => response.json())
            .then(obj => res(obj))
            .catch(rej);
    });
}

getUser(207)
    .then(obj => console.log(obj))
    .catch(error => console.error(error));

# Lancio moneta

function lanciaMoneta(result) {
    return new Promise((res, rej) => {
        console.log("Sto lanciando la moneta...");
        setTimeout(() => {
            const valore = Math.round(Math.random());
            const lancio = valore === 0 ? "testa" : "croce";
            console.log(lancio);
            if (lancio === result) {
                res("Hai vinto");
            } else {
                rej("Hai perso");
            }
        }, [])
    })
}

lanciaMoneta("testa")
    .then(messaggio => console.log(messaggio))
    .catch(error => console.error(error));

# Geolocation API 

function getCurrentPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

getCurrentPosition()
.then((position) => {
    console.log(position);
})
.catch((error) => {
    console.error(error);
})