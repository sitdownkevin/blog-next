/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://assist.kexu567.xyz/api/:path*'
            }
        ]
    },
    webpack: (config, { isServer, dev }) => {
        config.ignoreWarnings = [
            { module: /node_modules\/node-fetch\/lib\/index\.js/ },
            { module: /node_modules\/punycode\/punycode\.js/ },
        ];
        return config;
    },
};

export default nextConfig;
