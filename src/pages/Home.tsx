import { Link } from "react-router-dom";
import { useState, useRef} from "react";

// Imagens
import animeLogo from "../assets/img/anime-logo-2.jpg";
import nextNextIcon from "../assets/img/down.png";
import MotionGrafhic from "../assets/img/motion-graphic.png";
import actionFigure from "../assets/img/action-figure.png";
import Heart from "../assets/img/Heart.png";

import archievement from "../assets/img/achievement.png";

function Home() {

    // Variável de estado para controlar a visibilidade dos cards
    const [ isCardsVisible, setIsCardsVisible ] = useState(false);
    const [ isProductExampleVisible, setProductExampleVisible ] = useState(false);
    const [ isArrowVisible, setArrowVisible ] = useState(false);

    // Referência para as seções
    const cardsSectionRef = useRef<HTMLDivElement>(null);
    const exampleSectionRef = useRef<HTMLDivElement>(null);

    // Funções para alternar a visibilidade
    const toggleCardsVibility = () => {
        const nextState = !isCardsVisible;
        setIsCardsVisible(nextState);

        // Se a próxima ação for ABRIR os cards (nextState é true):
        if(nextState){
            // 1. Torna a SEGUNDA flecha visível
            setArrowVisible(true); 

            // 2. Rola para a seção de cards
            setTimeout(() => {
                cardsSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50); 
        } else {
            setArrowVisible(false);
        }
    }

    const toggleExampleVisibility = () => {
        const nextState = !isProductExampleVisible;
        setProductExampleVisible(nextState);

        if(nextState){
            setTimeout(() => {
                exampleSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }
    }

    const cardData = [
        {
            id: 1,
            img: archievement,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 2,
            img: MotionGrafhic,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }, 
        {
            id: 3,
            img: actionFigure,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 4,
            img: Heart,
            descriptionn: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
    ];

    return(
        <>
            <section className="home">
                <header className="header-home">
                    <Link to={"/entrar"}>
                        <button 
                            className="header-home__button"> Login </button>
                    </Link>
                </header>
                <div className="home__initial-section">
                    <div className="initial-section__title">
                        <h1 className="title">Animes Actions.F</h1>
                        <h4 className="sub-title">Aqui você encontra tudo do mundo dos animes!</h4>
                        <Link to={"/produtos"}>
                           <button className="initial-section__button">Ver Mais</button> 
                        </Link>
                    </div>
                    <img 
                        src={animeLogo} 
                        alt="Logo inicial" 
                        className="img-home"/>
                </div>
                {/* Adicionando evento onClick e a classe condicional */}
                <div className={`next-page-button-section ${isCardsVisible ? 'rotated' : ''}`}
                onClick={toggleCardsVibility}>

                    <img src={nextNextIcon} className="next-page-icon" alt="Seta para proxima página" />
                
                </div>
                <div ref={cardsSectionRef} className={`home__apresentations-cards ${isCardsVisible ? 'visible' : 'hidden'}`}>
                    {/* Mapeia e renderiza todos os cards */}
                    { cardData.map((cards) => (
                        <div key={cards.id} className="a-cards">
                            <img src={cards.img} alt="Cards da seção home" />
                            <p className="apresentions-cards__description">{cards.descriptionn}</p>
                        </div>
                    ))}
                </div>

                {isArrowVisible && (
                    <div className="next-page-button-section"
                    onClick={toggleExampleVisibility}> 
                        <img src={nextNextIcon} className="next-page-icon" alt="Seta para a proxima seção" />
                    </div>
                )}
            </section>  
        </>
    );
}

export default Home