cd ./src/packages
set -e
npm publish --access=public --registry=https://registry.npmjs.org
rm ./global.d.ts
rm ./package.json
rm ./README.md