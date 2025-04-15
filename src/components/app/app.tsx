import { Main } from '../../pages/main/main';

type AppProps = {
  offersCount: number;
}

export const App = ({offersCount}: AppProps): JSX.Element => (<Main offersCount={offersCount} />);
