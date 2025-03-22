//! Snack 1
//? Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

// const getPostTitle = id => {
//     return new Promise((res, rej) => {
//         fetch(`https://dummyjson.com/posts/${id}`)
//             .then(res => res.json())
//             .then(post => res(post.title))
//             .catch(rej);
//     })
// }

// getPostTitle(85)
//     .then(title => console.log("Titolo del post: ", title))
//     .catch(error => console.error(error));

//todo Bonus: Ottieni l'intero post con l'autore
//? Crea una funzione getPost(id) che recupera l'intero post. Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

// function getPost(id) {
//     return new Promise((res, rej) => {
//         fetch(`https://dummyjson.com/posts/${id}`)
//             .then(res => res.json())
//             .then(post => {
//                 fetch(`https://dummyjson.com/users/${post.userId}`)
//                     .then(res => res.json())
//                     .then(user => {
//                         const result = {
//                             ...post,
//                             user
//                         }
//                         res(result);
//                     })
//                     .catch(rej);
//             })
//             .catch(rej);
//     })
// }

// getPost(5)
//     .then(post => console.log(post))
//     .catch(error => console.error(error));

//! Snack 2
//? Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6. Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

// function lanciaDado() {
//     return new Promise((res, rej) => {
//         console.log("Sto lanciando il dado...");
//         setTimeout(() => {
//             const incastrato = Math.random() < 0.2;
//             if (incastrato) {
//                 rej("Il dado si è incastrato");
//             } else {
//                 const val = (Math.random() * 6) + 1
//                 const valore = Math.floor(val);
//                 res(valore);
//             }
//         }, 3000)
//     })
// }

// lanciaDado()
//     .then(messaggio => console.log("Il numero del dado è: ", messaggio))
//     .catch(error => console.error(error));

//todo Bonus: HOF con closure per memorizzare l'ultimo lancio
//? Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato. Se il numero esce due volte di fila, stampa "Incredibile!".

const creaLanciaDado = () => {
    let ultimoLancio = null;
    return (() => {
        return new Promise((res, rej) => {
            console.log("Sto lanciando il dado...");
            setTimeout(() => {
                const incastrato = Math.random() < 0.2;
                if (incastrato) {
                    ultimoLancio = null;
                    rej("Il dado si è incastrato");
                } else {
                    const val = (Math.random() * 6) + 1
                    const valore = Math.floor(val);
                    if (valore === ultimoLancio) {
                        console.log("Incredibile!");
                    }
                    ultimoLancio = valore;
                    res(valore);
                }
            }, 3000)
        })
    })
}

const lanciaDadoConMemoria = creaLanciaDado();

lanciaDadoConMemoria()
    .then(messaggio => {
        console.log("Il numero del dado è: ", messaggio)
        lanciaDadoConMemoria()
            .then(messaggio => console.log("Il numero del secondo dado è: ", messaggio))
            .catch(error => console.error(error));
    })
    .catch(error => console.error(error));