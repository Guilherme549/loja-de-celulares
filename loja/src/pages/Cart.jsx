import React, { useState } from 'react';
import { BsCartDashFill } from "react-icons/bs";
import { getItem, removeItemFromCart } from '../services/LocalStorageFuncs';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7f7f7;
    color: #1a237e;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

const StickyHeader = styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    z-index: 1000;
`;

const Header = styled.h1`
    color: #1a237e;
    font-size: 2em;
    text-align: center;
    margin: 10px 0;
`;

const ProductsArea = styled.div`
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 20px;
    width: 90%;
`;

const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 350px;
    width: 260px;
    padding: 20px;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 45px rgba(0,0,0,0.1);
    }

    img {
        width: 100%;
        height: 160px;
        border-radius: 8px;
        object-fit: cover;
        margin-bottom: 10px;
    }
`;

const StyledButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #1a237e;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0d1333;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(26,35,126,0.5);
    }
`;

const Footer = styled.footer`
    margin-top: auto;
    width: 100%;
    padding: 20px;
    background-color: #1a237e;
    color: white;
    text-align: center;
    font-size: 1em;
`;

const StyledLink = styled(Link)`
    padding: 10px 15px;
    margin: 10px;
    background-color: #1a237e;
    color: white;
    text-decoration: none;
    border-radius: 8px;
`;

export const Cart = () => {
    const [data, setData] = useState(getItem('carrinhoYT') || [])

    const removeItem = (obj) => {
        const arrFilter = data.filter((e) => e.id !== obj.id);
        setData(arrFilter);
        removeItemFromCart('carrinhoYT', arrFilter);
    }

    return (
        <PageContainer>
            <StickyHeader>
                <Header>Carrinho</Header>
                <StyledLink>loja</StyledLink>
            </StickyHeader>
            <ProductsArea>
                {data.map((e) => (
                    <ProductCard key={e.id}>
                        <h4>{e.title}</h4>
                        <img src={e.thumbnail} alt={e.title} />
                        <h4>{`R$ ${e.price}`}</h4>
                        <StyledButton onClick={() => removeItem(e)}>
                            <BsCartDashFill />
                        </StyledButton>
                    </ProductCard>
                ))}
            </ProductsArea>
            <Footer>
                &copy; {new Date().getFullYear()} Your Mobile Store. All rights reserved.
            </Footer>
        </PageContainer>
    );
};

export default Cart;
