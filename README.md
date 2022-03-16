This is a work in progress as I'm seeing what it takes and doesn't take to get an npm package published.

# Table of Contents

- [Quick Start](#Quick-Start)
- [What You Should Know](#What-You-Should-Know)

## Quick Start

0. clone the repo

1. Install dependencies

```console
$ npm install
```

2. Build the project

```console
$ npm run build
```

3. Run the app

```console
$ npm run start examples/meowth/meowth.png
```

This will either create or overwrite the file **meowth.txt** in the same directory that you ran the application in.

4. Open the generated `txt` file to see the result

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
