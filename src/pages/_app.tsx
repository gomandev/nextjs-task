import '../styles/globals.css';
import '../styles/responsive.css';
import 'tailwindcss/tailwind.css';

import { Provider } from 'react-redux';
import store from '../store/config';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
