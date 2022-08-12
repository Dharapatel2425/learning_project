import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

function Recipe() {
    const [details, setDetails] = useState([]);
    const [activeTab, setActiveTab] = useState("instruction");
    let params = useParams();
    
    useEffect(() => {
        const fetchDetails = async () => {
            const api = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information/?apiKey=${process.env.REACT_APP_API_KEY}`);
            const data = await api.json();
            console.log(data);
            setDetails(data);
        }
        fetchDetails();
    },[params.name]);
    
    return (
        <DetailWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image ? details.image : "../img/gallery/NoImage.jpg" } alt={details.title} />
            </div>
            <Info>
                <Button className={activeTab === 'instruction' ? 'active' : ''} onClick={() => setActiveTab("instruction")}>Instruction</Button>
                <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>Ingredients</Button>
                {activeTab === "instruction" && (
                    <div>
                        <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                        <h3 dangerouslySetInnerHTML={{ __html: details.instruction }}></h3>
                    </div>
                )}
                {activeTab === "ingredients" && (
                    <ul>
                        {details.extendedIngredients.map((ingredient) => (
                            <li key={ingredient.id}>{ingredient.original}</li>
                        ))}
                    </ul>
                )}
            </Info>
        </DetailWrapper>
    );
}

const DetailWrapper = styled.div`
    padding: 2rem 2rem;
    display:flex;
    @media (max-width: 768px) {
        div{
            width: 100%;
            img{
                width: 100%;
            }
        }
        flex-direction: column;
    }
    .active{
        background:linear-gradient(35deg,#494949,#313131);
        color:white;
    }
    h2{
        margin-bottom:2rem;
    }
    li{
        font-size:1.2rem;
        line-height:2.5rem;
    }
    ul{
        margin-top:2rem;
    }

`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background:white;
    border:2px solid black;
    margin-right:2rem;
    font-weight:600;
`;

const Info = styled.div`
    margin-left:3rem;
    div{
        padding-top: 1rem;
    }
    @media (max-width: 768px) {
        margin:0rem;
    }
     
`;

export default Recipe;