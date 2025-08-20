# Documentation website

This is the documentation website for the Citizens Advice Design System. The site is built using [Parklife](https://github.com/benpickles/parklife) and [Decant](https://github.com/benpickles/decant) to allow using Ruby on Rails as a static site generator.

## Running the documentation website

> [!NOTE]
> This guide assumes you have first read [the setup guide](../contributing/02-local-setup.md) for the project as a whole and have run the top-level setup script

Following this you should be able to run the dev server with:

```sh
./bin/dev
```

The docs should now be running on [localhost:4000](https://localhost:4000/)

## Working with content

Content for the docs site is stored under `content` and grouped by section, with `content/pages` being reserved for top-level one-off pages like the accessibility statement. Examples are stored under `content/examples`.

## Building the site

You can generate a static build of the site using:

```sh
bin/static-build
```

You can then serve the site using:

```sh
npx serve build
```

This uses `serve` which is included as a development dependency, but any static file server command will do.
