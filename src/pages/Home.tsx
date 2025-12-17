import { Link } from "react-router-dom";
import { useState, useRef} from "react";

// Imagens card
import animeLogo from "../assets/img/anime-logo-2.jpg";
import nextNextIcon from "../assets/img/down.png";
import MotionGrafhic from "../assets/img/motion-graphic.png";
import actionFigure from "../assets/img/action-figure.png";
import Heart from "../assets/img/Heart.png";

// Imagens Action Figure
import Inosuke1 from "../assets/img/Inosuke-action-figure.webp";

//Icones 
import archievement from "../assets/img/achievement.png";

function Home() {

    // Variável de estado para controlar a visibilidade das seções
    const [ isCardsVisible, setIsCardsVisible ] = useState(false);
    const [ isProductExampleVisible, setProductExampleVisible ] = useState(false);

    // Váriavel de estado para controlar a visibilidade dos icones
    const [ isOneArrowVisible, setOneArrowVisible ] = useState(true);
    const [ isTwoArrowVisible, setTwoArrowVisible ] = useState(false);

    const [ isTitleVisible, setTitleVisible ] = useState(false);

    // Referência para as seções
    const firstSectionRef = useRef<HTMLDivElement>(null);
    const cardsSectionRef = useRef<HTMLDivElement>(null);
    const exampleSectionRef = useRef<HTMLDivElement>(null);

    // Funções para alternar a visibilidade
    const toggleCardsVibility = () => {
        const nextState = !isCardsVisible;
        setIsCardsVisible(nextState);

        // Se a próxima ação for ABRIR os cards (nextState é true):
        if(nextState){
            // Torna a SEGUNDA flecha visível
            setTwoArrowVisible(true); 

            // Rola para a seção de cards
            setTimeout(() => {
                cardsSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50); 
        } else if(!nextState){
            // Deixa invisivel a seção e o icone
            setTwoArrowVisible(false);

            setTimeout(() => {
                firstSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                })
            }, 50); 
        }
    }

    const toggleExampleVisibility = () => {
        const nextState = !isProductExampleVisible;
        setProductExampleVisible(nextState);

        if(nextState){
            // Esconde a seção anterior e o icone
            setOneArrowVisible(false);
            setIsCardsVisible(false);

            // Deixa o titulo da seção visível
            setTitleVisible(true);

            setTimeout(() => {
                exampleSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }else if(!nextState){
            // Voltar a deixar visivel a seção e o icone
            setOneArrowVisible(true);
            setIsCardsVisible(true);
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

    const actioFigureData = [
        {
            id: 1,
            img: Inosuke1,
            icon: "bi bi-arrows-move"
        },
        {
            id: 2,
            img: Inosuke1,
            icon: "bi bi-arrows-move"
        },
        {
            id: 3,
            img: Inosuke1,
            icon: "bi bi-arrows-move"
        },
        {
            id: 3,
            img: Inosuke1,
            icon: "bi bi-arrows-move"
        }
    ]

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
                {isOneArrowVisible && (
                    <div className={`next-page-button-section ${isCardsVisible ? 'rotated' : ''}`}
                    onClick={toggleCardsVibility}>

                        <img src={nextNextIcon} className="next-page-icon" alt="Seta para proxima página" />
                    
                    </div>
                )}
                <div ref={cardsSectionRef} className={`home__apresentations-cards ${isCardsVisible ? 'visible' : 'hidden'}`}>
                    <div className="apresentation-cards__container">
                        {/* Mapeia e renderiza todos os cards */}
                        { cardData.map((cards) => (
                            <div key={cards.id} className="a-cards">
                                <img src={cards.img} alt="Cards da seção home" />
                                <p className="apresentions-cards__description">{cards.descriptionn}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {isTwoArrowVisible && (
                    <div className={`next-page-button-section ${isProductExampleVisible ? 'rotated' : ''}`}
                    onClick={toggleExampleVisibility}> 
                        <img src={nextNextIcon} className="next-page-icon" alt="Seta para a proxima seção" />
                    </div>
                )}

                <div ref={cardsSectionRef} className={`most-purchased-section ${isProductExampleVisible ? 'visible' : 'hidden'}`}>
                    <h2 className={`most-purchased-title ${isTitleVisible}`}>Actions mais vendidos</h2>
                    <div className="most-purchased-section__container">
                        {actioFigureData.map((cards) => (
                            <div key={cards.id} className="most-purchased-cards">
                                <a className="most-purchased__icon">
                                    <Link to={"/produtos"}>
                                        <i className={cards.icon} />
                                    </Link>
                                    <span className='tooltip'>Ver Mais</span>
                                </a>
                                <img src={cards.img} alt="Imagem dos produtos mais comprados" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>  
        </>
    );
}

export default Home