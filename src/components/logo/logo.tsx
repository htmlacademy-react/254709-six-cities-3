import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';


type LogoProps = {
  logoClassName: string;
}

const Logo = ({logoClassName}: LogoProps): JSX.Element => (
  <Link className={logoClassName} to={AppRoute.Main}>
    <img
      className="header__logo"
      src="img/logo.svg"
      alt="6 cities logo"
      width="81"
      height="41"
    />
  </Link>
);

export default Logo;
