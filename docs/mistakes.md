# Mistakes

Yes, mistakes are the worst thing to talk about but on the other hand these are the things that gives you the most hands-on experience.

## Proper naming
// TODO: EBItem should have been sg like ElementCategory, and its instances should have been Elements

## Weird HTML format
Since an email could be written in html my initial thought was that basically we need to create an HTML editor, rather than a specific email builder. I could not make bigger mistake than that. The thing is that an email written in html is not a simple html5 file, rather a weird html4. Or not even that one. You don't even know how your email is going to be interpreted as you don't control the doctype.
Check out this [SO conversation](https://stackoverflow.com/questions/9136002/what-version-of-html-to-use-in-emails)

There's a website which is similar to [caniuse.com](https://caniuse.com), called [caniemail.com](https://www.caniemail.com/). There you can check what are the features which are usable across the clients. Spoiler alert: not much.

Just look at [flexbox](https://www.caniemail.com/search/?s=flex). `display: flex` has an okay-ish support ~83%, but `justify-content` has ~58.5%.

The time I realized that it is not going to work with a simple html5 generated file was the point, where I already implemented an HTMLGenerator, and a CSSGenerator visitor. That was a really harsh realization.

**Key takeaway**: Always start with appropriate tests. In my case I should have sent an email with more than just a simple div with some texts.

## Lack of Dependency Injection

To tell you the truth, I didn't spend time to find a proper npm package which could be used as DI in a frameworkless environment and has proper API.

Instead I just made my odd solution. Classes with default constructor parameters, allowed me to use all of them like `new MyClass()`.
With this I was able to create singleton instances on the class itself (so a static field, see [class.util.ts](./src/common/utils/class.util.ts)).

But this came with costs:
- Only singleton instances can be made
- All classes had to have default parameters (even when it doesn't make sense)
- In case of a circular dependency, I could pull my hair out to find the problem - meanwhile a DI tool can easily show you the circle.

**Key takeaway**: Always find the proper tool for the job. In most cases there are some guys on the other side of the internet who spent much more time to produce a solution for a specific problem than you.

Take your time, find that tool, it worth the effort. \
(For DI I use [tsyringe](https://www.npmjs.com/package/tsyringe) nowadays - developed by microsoft, which is very similar to Angular's DI.)

## LitElement inside AppState (for Visualization)
Due to the lack of knowledge I was not able to cut off Lit from my base classes - such as StateEditor, SelectableViewer - which are the fundamental parts of the visualization of the state. They should have nothing to do with the framework/library I use.
The only things that they need to rely on are the [Custom element lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#custom_element_lifecycle_callbacks)

The way it should have been done:
```typescript
type LifeCycleBearerHTMLElement = {
  connectedCallback(): void;
  disconnectedCallback(): void;
} & HTMLElement

const StateEditorMixin = (CustomComponent: { new(): LifeCycleBearerHTMLElement }) => {
  // this part should not rely on Lit
  abstract class StateEditorCustomComponent extends CustomComponent {
    public stateNode!: StateNode;
    // ... the rest of the code from the current StateEditorLit ...
  }

  return StateEditorCustomComponent;
};

class AnItemEditor extends StateEditorMixin(LitElement) { // this can be lit specific
  public connectedCallback(): void {
    super.connectedCallback();
    console.log('hello world');
  }

  public doSg(): void {
    dispatchEBEvent(this, 'copy-state-node', this.stateNode);
  }
}
```

**Key takeaway**: Mixins

## Hack due to the lack of ES module

This is not necessarily a mistake, but a topic which was time-consuming.

Let's check the end of the _node_modules/tinymce/tinymce.js_ (with version 6.4.1). You can clearly see that it's not made for ES modules.

```javascript
30593. const exportToModuleLoaders = tinymce => {
30594.    if (typeof module === 'object') {
30595.      try {
30596.        module.exports = tinymce;
30597.      } catch (_) {
30598.      }
30599.    }
30600.  };
30601.  const exportToWindowGlobal = tinymce => {
30602.  window.tinymce = tinymce;
30603.    window.tinyMCE = tinymce;
30604.  };
30605.  exportToWindowGlobal(tinymce);
30606.  exportToModuleLoaders(tinymce);
```

So I ran into problems like:
> Error: 'default' is not exported by node_modules/tinymce/tinymce.js, imported by out-tsc/src/ToolPlugin/EditorTool/eb-editor-tool-editor.js

I tried `import * as tinymce from 'tinymce'` which lead me to the very same problem.

After that I tried importing tinymce as a side-effect module:

```typescript
import 'tinymce';
import 'tinymce/themes/silver';
import 'tinymce/models/dom';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/fullscreen';
import 'tinymce/icons/default';
```

But of course if you check the corresponding .js files the following error is obvious:
> Uncaught ReferenceError: require is not defined

I had the same problem with _node_modules/mjml-core/lib/index.js_ (version 4.14.1).

Of course I could search for some plugin which can mix up commonjs with es modules, but at that point I already spent too much time on figuring this out.

Eventually, in order to use them I referenced those two files directly from index.html as a simple script.

For simple `npm run start` this was enough. But in order to bundle it when using `npm run build` I basically needed to copy their minified version. You can see that _rollup.config.js_ in line 25,27.

**Key takeaway**: write your JS software in the era of ES modules. 😁