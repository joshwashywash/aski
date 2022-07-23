# Quick Start

1. Install globally or locally

```
npm install aski -g
```

2. Run from the command line (replace **meowth.png** with the path to your image)

```
npx aski meowth.png
```

3. Open the generated `txt` file to see the result.

```
xdg-open meowth.txt
```

If the image is small enough, you can also view it in your console

```
cat meowth.txt
```

# What You Should Know

- The ascii text file is created in the same directory that you run the application in.
- If you don't give the output file a name with the `-o` flag, it will default to the same base name as the input image. For example, `meowth.png` will generate `meowth.txt`. Be careful that you don't overwrite any important files this way.
- There is very basic error handling and I'm sure not everything is accounted for.
- The input images are not quantized. The app seems to work best with images that have a small color palette.
- The image is trimmed to fit it's content. See [sharp's trim function](https://sharp.pixelplumbing.com/api-resize#trim) for the deets.
