import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './state/store';
import "./containers/container.css";
import "./assets/styles/custom.css";
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Toaster
      toastOptions={{
        "position": 'top-center',
        duration: 5000,
        style: {
          zIndex: 10100,
          position:"absolute"
        },
      }} />
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
