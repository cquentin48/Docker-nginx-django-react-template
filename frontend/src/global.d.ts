declare global{
    namespace NodeJS{
        interface ProcessEnv{
            IS_IN_DOCKER_COMPOSE_MODE: 1 | 0,
            NODE_ENV: 'development' | 'production'
            PORT?: string;
            PUBLIC_URL: string;
            PWD: string;
        }
    }
}