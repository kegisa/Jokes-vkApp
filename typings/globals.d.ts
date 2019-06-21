declare interface Window {
    devToolsExtension: any;
}

declare interface NodeModule {
    hot?: { accept: (path: string, callback: () => void) => void };
}
