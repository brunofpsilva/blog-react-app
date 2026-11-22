import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalProvider } from './providers/GlobalContextProvider';

async function enableMocks() {
    if (import.meta.env.VITE_USE_MOCKS !== 'true') return;

    const { worker } = await import('./mocks/browser');
    await worker.start({
        serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
        onUnhandledFrame: 'bypass',
    });
}

const queryClient = new QueryClient();

enableMocks().then(() => {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <QueryClientProvider client={queryClient}>
            <GlobalProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                    <App />
                </BrowserRouter>
            </GlobalProvider>
        </QueryClientProvider>
    );
});
