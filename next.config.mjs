/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ...Object.entries(process.env)
          .filter(item => item[0].startsWith('APP_'))
          .reduce((obj, item) => ({ ...obj, [item[0]]: item[1] }), {}),
      },
};

export default nextConfig;
