import Main from '../../pages/main/main';

type AppProps = {
  offersCount: number;
}

const App = ({offersCount}: AppProps): JSX.Element => (<Main offersCount={offersCount} />);

export default App;
