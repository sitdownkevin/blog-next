/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://assist.kexu567.xyz/api/:path*'
            }
        ]
    }
};

export default nextConfig;
