declare global {
    namespace NodeJS {
        interface Global {
            logger: any;
            debug: boolean;
        }
    }
}
export {};
