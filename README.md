# MJML-EMAIL-BUILDER

This is an old project which was discontinued.
The goal was to create a WYSIWYG editor for emails.

At this stage of the project 80-90% was done by me.
Kudos for the remaining part to [Lucien](https://github.com/lucienruppert) & [Elementbound](https://github.com/elementbound)

[**Demo is available here**](https://ocsi0520.github.io/mjml-email-builder/)

## Tech Stack

### Base of the project
The scaffold was provided by [open-wc](https://open-wc.org/guides/developing-components/getting-started/)

### Package Manager
Just the usual de-facto [npm](https://www.npmjs.com/).
So this project has the boring
- `npm run build`
- `npm run start`
- `npm run test`

commands.

### Bundler
At the time of writing the app, [vite](https://vite.dev/) was not that popular therefore I used [Rollup](https://rollupjs.org/)

### Tests
For the same reason I used [sinon](https://sinonjs.org/) and [chai](https://www.chaijs.com/) for that sole unit test I have in the codebase 🙂

### Localization
The project also contains i18n with [lit-localization](https://lit.dev/docs/localization/overview/).


## How to start
Before building the actual project, you have to generate the translations for lit-localization. This generation is based on the _xlf_ files. There's only one _xlf_ file under _xliff_ folder: _hu.xlf_

> Such files are generated with `npx lit-localize extract` command. See [lit-localization](https://lit.dev/docs/localization/overview/).

To generate the actual code for translations you have to use this command: `npx lit-localize build`.

When running `npm run build`, first the `tsc` transpiles all .ts into .js files into _out-tsc_ folder.
_index.html_ has a reference to _out-tsc/src/eb-root.js_ which ref is going to be picked up by the rollup.config.js, then it does its magic to bundle everything.

When running `npm run start`, `tsc` is started in watching mode. It produces the js files into _out-tsc_ folder, and the _index.html_ grabs those non-minified files. Then `wds` (web-dev-server) starts an http-server, check _web-dev-server.config.mjs_

## Architecture
For further details check out the [architecture.md](./docs/architecture.md) file.

For even further details check out the one that describes [my unforgivable mistakes](./docs/mistakes.md).

## What are those buttons in the header?

The project supposed to be integrated into an another app.
That's why I chose webcomponents, so regardless of the framework of the host app, the MJML-email-builder could be integrated into it.

Therefore the main ways to communicate between this app and the host app are events and properties on __eb-root__ (so a simple component communication).

We could:
1. send the current app state to the host, so that we can save the user's current work as a draft email.
1. send the generated email & current app state so that the host can eventually send the email AND save it to history. \
For sending the email we'd need an email address (or multiple addresses) but this feature was never finished. (So fifth button would have replaced the second one.)
1. (debug) save the app state to file
1. (debug) load the app state from file.
1. exit the app to go back to the host
