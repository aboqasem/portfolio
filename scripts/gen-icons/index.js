/* global require, __dirname */
// @ts-check

const fs = require('fs');
const path = require('path');

const prettier = require('prettier');
const { optimize } = require('svgo');
const { renderToStaticMarkup } = require('react-dom/server');

const { svgoConfig } = require('./svgo-config');
const { icons } = require('./icons');

const ROOT_DIR = path.resolve(__dirname, '../../');
const ICONS_LIB_DIR = path.resolve(ROOT_DIR, 'lib/icons');

async function main() {
  const prettierOptions = {
    parser: 'typescript',
    ...(await prettier.resolveConfig(ROOT_DIR)),
  };

  Object.entries(icons).forEach(([iconCategory, icons]) => {
    const iconCategoryDir = path.resolve(ICONS_LIB_DIR, iconCategory);

    fs.mkdirSync(iconCategoryDir, { recursive: true });

    icons.forEach(async (IconComponent) => {
      const svg = renderToStaticMarkup(IconComponent({}));
      const optimizedSvg = optimize(svg, svgoConfig).data;

      const iconName = IconComponent.name;
      const iconComponent = `
import type { Icon } from '..';

const ${iconName}: Icon = (props) => {
  return (
    ${optimizedSvg.replace('>', ' {...props}><title>{props.title}</title>')}
  );
};

export default ${iconName};
`.trimStart();
      const formattedIconComponent = await prettier.format(iconComponent, prettierOptions);

      const iconFilePath = path.resolve(iconCategoryDir, `${iconName}.tsx`);

      fs.writeFileSync(iconFilePath, formattedIconComponent);

      console.log(`Generated: ${iconFilePath}`);
    });
  });
}

main();
