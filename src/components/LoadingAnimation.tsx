import "./AnimationStyles.css";
import genie from "../assets/pikmin.png";

// displays the bouncing pikmin and horizontal loading bar
function LoadingAnimation() {
    return (
        <div className="startup-animation">
            <img src={genie} alt="Logo" className="genie" />
            <div className="loading-bar"></div>
        </div>
    );
}
  
export default LoadingAnimation;
