import chalk from 'chalk';
import meow from 'meow';
import sharp from 'sharp';
import { basename, extname } from 'path';
import { outputFile, pathExists } from 'fs-extra';

const name = 'aski';

const CHARS =
  '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';

const formats = ['avif', 'gif', 'jpg', 'png', 'tiff', 'webp'];

const extensions = formats.map(ext => `.${ext}`);

const createErrorString = (message: string) =>
  `${chalk.red('ERROR')}: ${message}`;

//simplification of mapping from one range to another
const toCharIndex = (n: number) => Math.floor((n * CHARS.length - 1) / 0xff);

const helpText = `
${chalk.bold('Usage')}:

  $ ${name} <input>

${chalk.bold('Options')}

  --height, -h Resize image to match this width before being asciified.
  --width, -w Resize image to match this width before being asciified.
  --out, -o Set the file name of the output .txt file.

${chalk.bold('Examples')}:

  $ ${name} meowth.png

  resize to 60 pixels tall
  $ ${name} images/meowth.png -h 60

  resize to 100 pixels wide and set the output file name to ascii.txt
  $ ${name} meowth.png -w 100 -o ascii
`;

const cli = meow(helpText, {
  importMeta: import.meta,
  flags: {
    height: {
      type: 'number',
      alias: 'h',
    },
    width: {
      type: 'number',
      alias: 'w',
    },
    out: {
      type: 'string',
      alias: 'o',
    },
  },
});

const { width, height, out } = cli.flags;

if (cli.input.length > 0) {
  const [file] = cli.input;
  const exists = await pathExists(file);
  if (exists) {
    if (extensions.includes(extname(file))) {
      try {
        const { data, info } = await sharp(file)
          .toColorspace('b-w')
          .trim()
          .resize({ width, height })
          .raw()
          .toBuffer({ resolveWithObject: true });

        const ascii = Array.from(
          data,
          (p, i) =>
            `${CHARS.at(toCharIndex(p))}${i % info.width === 0 ? '\n' : ''}`
        ).join('');

        const output = `${out ?? basename(file, extname(file))}.txt`;
        await outputFile(output, ascii);
        console.log(
          `Successfully asciified file ${chalk.bold(file)} to ${chalk.bold(
            output
          )}.`
        );
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error(
        createErrorString(
          `File ${chalk.bold(
            file
          )} does not have a supported file extension. Supported image formats are ${formats
            .map(format => format.toUpperCase())
            .join(', ')}.`
        )
      );
    }
  } else {
    console.error(createErrorString(`File ${chalk.bold(file)} not found.`));
  }
} else {
  cli.showHelp();
}
