/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},
    webpack: (config: any, { isServer, dev }: any) => {
        config.ignoreWarnings = [
            { module: /node_modules\/node-fetch\/lib\/index\.js/ },
            { module: /node_modules\/punycode\/punycode\.js/ },
        ];
        return config;
    },
    transpilePackages: ['@fullcalendar/core', '@fullcalendar/react', '@fullcalendar/daygrid', '@fullcalendar/timegrid'],
};

export default nextConfig;
