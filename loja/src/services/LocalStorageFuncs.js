// isto define duas funções JavaScript que interagem com o localStorage do navegador, uma API que permite armazenar dados de forma persistente no navegador do usuário.Essas funções simplificam o processo de salvar e recuperar objetos JavaScript em formato JSON.


export const setItem = (key, value) => {
    localStorage.setItem(key,JSON.stringify(value))
}


// Esta função aceita um parâmetro, key, que é a chave do dado que você deseja recuperar do localStorage.
export const getItem = (key) => {
    // voltanto o tipo da key para array novamente
    return JSON.parse(localStorage.getItem(key))
}

export const removeItemFromCart = (key) => {
    // remove o item do localStorage
    return localStorage.removeItem(key);
}