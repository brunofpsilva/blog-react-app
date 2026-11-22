/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    /** "true" to answer API calls in the browser with MSW instead of a real backend */
    readonly VITE_USE_MOCKS?: string;
}
