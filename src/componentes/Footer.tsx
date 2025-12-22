// icons
import gitHub from "../assets/img/icons8-github-60.png";
import instagram from "../assets/img/instagram.png";
import linkedin from "../assets/img/business.png";

function Footer(){
    return(
        <div className="footer">
            <div className="footer__content">
                <p>© 2024 Action Figure Store. Todos os direitos reservados.</p>
                <h4>Autor: Werbeth Martins</h4>
            </div>
            <div className="footer__divisor"></div>
            <div className="footer__tools-informations">
                <h4>Tecnologias Utilizadas:</h4>
                <ul className="tools-information__list">
                    <li>React</li>
                    <li>Typescript</li>
                    <li>Node.js</li>
                </ul>
            </div>
            <div className="footer__divisor"></div>
            <div className="footer__social-media">
                <h4>Redes Sociais: </h4>
                <div className="social-media__icons">
                    <img src={gitHub} alt="Icone do Github" />
                    <img src={instagram} alt="Icone do Instagram" />
                    <img src={linkedin} alt="Icone do Linkedin" />
                </div>
            </div>
        </div>
    );
}

export default Footer;