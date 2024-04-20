import React, { useEffect, useState } from 'react';
import { BsCartCheckFill, BsCartPlusFill } from "react-icons/bs";
import { getItem, setItem, removeItemFromCart } from '../services/LocalStorageFuncs';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f7f7f7;
`;

const StyledLink = styled(Link)`
    padding: 10px 15px;
    margin: 10px;
    background-color: #1a237e;
    color: white;
    text-decoration: none;
    border-radius: 8px;
`;

const Heading = styled.h1`
    color: #1a237e;
    margin: 20px 0;
`;

const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    padding: 15px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    transition: box-shadow 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }

    h4 {
        margin: 10px 0;
    }
`;

const AddToCartButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: white; // Assegura que o texto seja visível contra o fundo colorido
    background-color: #FF6347; // Usando um vermelho-tomate para maior contraste
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &:hover, &:focus {
        background-color: #FF4500; // Um laranja mais escuro para o hover e focus
        transform: scale(1.05); // Aumenta ligeiramente o tamanho ao interagir
    }

    &:active {
        transform: scale(0.95); // Efeito de pressionar o botão
        background-color: #CD3700; // Cor mais escura ao pressionar
    }
`;


const Store = () => {
    const [data, setData] = useState([]);

    // Aqui onde e guardado os itens do carrinho. "getItem" e um uso do React Hook useState para inicializar o estado cart em um componente React, com dados potencialmente carregados do localStorage. Resumindo quando a pagina carrega ele puxa os dados que estao no localStorage
    const [cart, setCart] = useState(getItem('carrinhoYT') || []);

    useEffect(() => {
        const fetchApi = async () => {
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=celular';
            // lendo a urls
            const response = await fetch(url);
            // convertendo url pra json
            const objJson = await response.json();
            // pegando a variavel json, lendo os resultados e armazando no useState data e pegando os datos da api com "results" que sao os produtos (celulares)
            setData(objJson.results);
        };
        // chamando a funcao
        fetchApi();
    }, []);

    // logica : Verifica se um item já está no carrinho: Se estiver, o item é removido.Se o item não está no carrinho, ele é adicionado.
    const handleClick = (obj) => {
        // Procurando o produto e verificando se ele ja nao esta no carrinho "cart".
        const element = cart.find((e) => e.id === obj.id);

        // A condição verifica se um item específico já está no carrinho e, dependendo disso, ou remove o item ou adiciona um novo.
        if (element) {
            // Aqui, o método.filter() é usado para criar um novo array que inclui todos os itens do cart exceto aquele que tem o mesmo id
            const arrfilter = cart.filter((e) => e.id !== obj.id);
            // Esta função atualiza o estado cart com o novo array arrfilter, efetivamente removendo o item do carrinho.
            setCart(arrfilter);
            // remove o item se do localStorage
            removeItemFromCart('carrinhoYT', arrfilter);
        } else {
            // junta todos os produtos do carrinho com o obj novo que a funcao  Após todos os elementos de cart terem sido incluídos na nova array, o obj (o novo item a ser adicionado ao carrinho) é colocado na array.
            const newCart = [...cart, obj];
            setCart(newCart);
            // adicione os dados nesta funcao permante
            setItem('carrinhoYT', newCart);
        }
    };

    return (
        <PageContainer>
            <StyledLink to='/cart'>Carrinho</StyledLink>
            <Heading>Store</Heading>
            <ProductContainer>
                {data.map((e) => (
                    <ProductCard key={e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt={e.title} />
                        <h4>{`R$ ${e.price}`}</h4>
                        <AddToCartButton onClick={() => handleClick(e)}>
                            {cart.some((itemCart) => itemCart.id === e.id) ? <BsCartCheckFill /> : <BsCartPlusFill />}
                        </AddToCartButton>
                    </ProductCard>
                ))}
            </ProductContainer>
        </PageContainer>
    );
};

export default Store;
