import React, { useEffect, useState } from 'react';
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { getItem, setItem, removeItemFromCart } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom';

const Store = () => {

    const [data, setData] = useState([]);

    // Aqui onde e guardado os itens do carrinho. "getItem" e um uso do React Hook useState para inicializar o estado cart em um componente React, com dados potencialmente carregados do localStorage. Resumindo quando a pagina carrega ele puxa os dados que estao no localStorage
    const [cart, setCart] = useState(getItem('carrinhoYT') ||[])

    useEffect(() => {
        const fetcApi = async() => {
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular'
            // lendo a urls
            const response = await fetch(url);
            // convertendo url pra json
            const objJson = await response.json()
            // pegando a variavel json, lendo os resultados e armazando no useState data e pegando os datos da api com "results" que sao os produtos (celulares)
            setData(objJson.results)
        }
        // chamando a funcao
        fetcApi();
    },[])

    // logica : Verifica se um item já está no carrinho: Se estiver, o item é removido.Se o item não está no carrinho, ele é adicionado.
    const handleClick = (obj) => {
        // Procurando o produto e verificando se ele ja nao esta no carrinho "cart".
        const element = cart.find((e) => e.id === obj.id)

        // A condição verifica se um item específico já está no carrinho e, dependendo disso, ou remove o item ou adiciona um novo. 
        if (element) {
            
            // Aqui, o método.filter() é usado para criar um novo array que inclui todos os itens do cart exceto aquele que tem o mesmo id
            const arrfilter = cart.filter((e) => e.id !== obj.id)

            // Esta função atualiza o estado cart com o novo array arrfilter, efetivamente removendo o item do carrinho.
            setCart(arrfilter)
            // remove o item se do localStorage
            removeItemFromCart('carrinhoYT', arrfilter)
            
        } 
        // Se element for falso(falsy), que ocorrerá se.find() não encontrar nenhum item no cart com o mesmo id que obj:
        else {

            // junta todos os produtos do carrinho com o obj novo que a funcao  Após todos os elementos de cart terem sido incluídos na nova array, o obj (o novo item a ser adicionado ao carrinho) é colocado na array.
            setCart([...cart,obj])
            // adicione os dados nesta funcao permante
            setItem('carrinhoYT',[...cart,obj])
        }
    }

    return (
        <div>
            <Link to='/cart'>Carrinho</Link>
            <h1>Store</h1>
            {/* div que renderiza os produtos */}
            <div>
                
                {
                    // mapeando os elementos do json
                    data.map((e) => (
                        <div key={e.id}>
                            <h4>{e.title}</h4>
                            <img src={e.thumbnail} alt="" />
                            <h4>{`R$ ${e.price}`}</h4>
                            <button
                            onClick={() => handleClick(e)}
                            >
                                {
                                    // condicao para verficar se o produto esta no carrinho ou nao, a funcao (some) serve para verifiar se tem algo dentro do carrinho (no caso o useState)
                                    cart.some((itemCart) => itemCart.id === e.id) ? (
                                        <BsCartCheckFill/> 
                                        // se tiver alguma coisa na variavel ele renderiza este icon
                                    ) : (
                                            <BsCartPlusFill />
                                            // se nao tiver nada na variavel ele renderiza este icon
                                    )

                                }
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Store;
