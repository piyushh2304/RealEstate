
export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // We import specifically for nodejs runtime
        const { bootstrap } = await import('./lib/bootstrap');
        await bootstrap();
    }
}
