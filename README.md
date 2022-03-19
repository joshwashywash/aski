# Table of Contents

- [Quick Start](#Quick-Start)
- [What You Should Know](#What-You-Should-Know)

## Quick Start

1. Install globally or locally

```console
npm install aski -g
```

2. Run from the command line (replace **meowth.png** with the path to your image)

```console
npx aski meowth.png
```

3. Open the generated `txt` file to see the result.

```console
$ xdg-open meowth.txt
```

If the image is small enough, you can also view it in your console

```console
$ cat meowth.txt
```

## What You Should Know

- The ascii text file is created in the same directory that you run the application in. Be careful.
- There is very basic error handling and I'm sure not everything is accounted for.
- The images are not resized. If you have a large image, you will have a large text file.
- The input images are not quantized. The app seems to work best with images that have a small color palette.
