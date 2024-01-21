import process from "child_process";
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";
import { optimize } from "svgo";
import { icons } from "./icons";
import { svgoConfig } from "./svgo-config";

const ROOT_DIR = path.resolve(__dirname, "../../");
const ICONS_LIB_DIR = path.resolve(ROOT_DIR, "lib/icons");

async function main() {
  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.entries(icons).forEach(([iconCategory, icons]) => {
    const iconCategoryDir = path.resolve(ICONS_LIB_DIR, iconCategory);

    fs.mkdirSync(iconCategoryDir, { recursive: true });

    // biome-ignore lint/complexity/noForEach: <explanation>
    icons.forEach((IconComponent) => {
      const svg = renderToStaticMarkup(IconComponent({}));
      const optimizedSvg = optimize(svg, svgoConfig).data;

      const iconName = IconComponent.name;
      const iconComponent = `
import type { Icon } from "..";

const ${iconName}: Icon = (props) => {
  return (
    ${optimizedSvg.replace(">", " {...props}><title>{props.title}</title>")}
  );
};

export default ${iconName};
`.trimStart();

      const iconFilePath = path.resolve(iconCategoryDir, `${iconName}.tsx`);

      fs.writeFileSync(iconFilePath, iconComponent);

      console.log(`Generated: ${iconFilePath}`);
    });
  });

  console.log("Running biome...");
  process.spawnSync("bun", ["biome", "check", "--apply", ICONS_LIB_DIR], {
    cwd: ROOT_DIR,
    stdio: "inherit",
  });
}

main();
