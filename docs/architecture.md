# Architecture

## Register
This supposed to be a noun. Copied from google translate:
>  an official list or record, for example of births, marriages, and deaths, of shipping, or of historic places.

So this is just a wrapper for a hash-table. The most striking example is [EBItemRegister](../src/AppState/Register/EBItemRegister.ts). This register things related to [EBItems (discussed later)](#ebitem).
That being said we basically grab the id of an item, and assign this id to something.
That something can be the way how to [make MJML template](#3-mjml-css-generator) for that item, how to serialize/compress an instance of an item, or how to create a [StateNode](#1-statenode) for that item.

## EBItem
This application consists of so-called items. (Obviously I should have found a more specific-phrase like ElementCategory so that its instances should have been Elements.)

These items represents well... categories of elements which can be put onto the canvas.
But actually the canvas itself is also considered as an instance of the CanvasItem. Block, Slot, Button, WYSIWYG section (called EditorToolPlugin), picture (called ImageToolPlugin) etc-etc are all considered as items.

## Item Instance (Element) State
Each of the instance of items has their own state.
This state contains data about the instance, \
general ones such as paddings, margins, background color, and \
item-specific ones like text for a button, the division ratio for a block (2-1, 1-1-1, 1-2). \
This state must be serializable.

## Item parts
Items need to provide a unique item id and the following:

### 1. StateNode
An item need to have the possibility to create a StateNode.
A StateNode is basically a Node which is a mediator among a StateViewer, a state and if present a StateEditor. That means the item instances are presented on the canvas by their viewer. In case I click on a viewer, it gets selected which triggers an editor to be created and shown on the sidepanel.
In case we edit something with the editor the StateNode's state is being updated, and we also notify the viewer of the change so it can re-render itself.

This StateNode is also part of a tree called **AppState**. \
I.e. canvas has a block, which has a 2-1 ratio (big and small) for slots. Inside the first slot there's a Title instance.  So the AppState is like:

![image](./simple-app-state.svg)

> side note: sometimes I use the abbreviation `SN` to refer to StateNode

### 2. StateEditor
This one is already mentioned. Nothing fancy about it.
An item needs to implement a `getEditor` method, which provides an item-specific editor for an item instance. So if the user selects a Title element on the canvas, then a `<eb-title-tool-editor>` component is being created, which (besides the general state fields like bg-color, paddings) has a field to change the title text.

### 3. MJML-CSS Generator
This is a part of the app which has radically changed overtime. You can find the reason written in the [doc of my mistakes](./mistakes.md#weird-html-format).
So in order to convert our AppState into a genuine email-compatible html-like format first we have to "compile" each of our element into [mjml-template](https://mjml.io/)

As there used to be separate HTML & CSS generator, and also there's a compressor part - so multiple operations which involves the whole AppState - I used the [Visitor pattern](https://refactoring.guru/design-patterns/visitor).

Just for the sake of brevity and clarity let's not go into the details so deeply yet. Say each of the item can handle their own type of StateNode.
Meaning if you have a ButtonStateNode and you want to convert it into MJMLTemplate, then inside [ButtonToolPlugin](../src/ToolPlugin/ButtonTool/ButtonToolPlugin.ts) the #getMJMLCSSGenerator method returns a [ButtonMJMLCSSGenerator](../src/ToolPlugin/ButtonTool/ButtonMJMLCSGenerator.ts).
This generator accepts a ButtonStateNode and returns an `<mj-button>` template with the proper attributes.

In case the SN is a container one, then a [ContainerMJMLCSSGenerator](../src/AppState/EBItem/ContainerMJMLCSSGenerator.ts) is used, which first converts all of its children (recursively), then it places those mjml templates into its own template as nested ones.
So i.e. a SlotStateNode is being processed, and it has a Button and a Title children, then (pseudo-code coming)
1. ButtonElement --> `<MJMLButtonTemplate />`
2. TitleElement --> `<MJMLTitleTemplate />`
3. SlotStateNode -->
```html
<MJMLSlotTemplate>
    <MJMLButtonTemplate />
    <MJMLTitleTemplate />
</MJMLSlotTemplate>
```

### 4. StateNodeCompressor
Lastly an item has a [StateNodeCompressor](../src/AppState/EBItem/StateNodeCompressor.ts) which is responsible for serializing and de-serializing the state nodes.
The purpose of this feature is to be able to save the AppState into a simple file / wherever.
It's similar to [MJML-CSS Generator](#3-mjml-css-generator) in the terms of that from each of the StateNode we get a string, and eventually all of these substrings are combined into one big string. This big combined string is basically the compressed/serialized AppState.\
Whenever we want to load back the state we also use the StateNodeCompressor. The string becomes the same AppState-tree that it used to be, and then we just replace the canvas's content with it.

## Builtin Items
It must be mentioned that there are items which are available even without registering any additional plugins. These items are [CanvasItem](../src/AppState/BuiltInItem/Canvas/CanvasItem.ts), [BlockItem](../src/AppState/BuiltInItem/Block/BlockItem.ts) and [SlotItem](../src/AppState/BuiltInItem/Slot/SlotItem.ts)

### CanvasItem
It kinda speaks for itself. This one is the "element category" of canvas. There can be only one canvas in the AppState and it must be the root element in.
The only direct children it can have are Block elements (discussed right after).

### BlockItem
A block item represents a row (in desktop) or a column (in mobile). From the user's perspective you are not able to add any elements to the canvas without first injecting a block element.
From the dev's perspective it's a bit different.
BlockItems **MUST HAVE** at least one slot child. Based on it's division rate, there can be 1, 2 or 3 Slot children. Also the only type that a Block element accepts as a child is the Slot element.

### SlotItem
The only container item (so far) that can have arbitrary children (except Canvas & Block). Whenever the user adds a new element to the canvas then it's going to be a child of one of the slot elements.

## Plugins
A plugin is also an item, but has one more thing to do: provide an icon which gets shown on the sidepanel, and can be used by the user to create an element by drag-n-drop the icon onto one of the slot elements.

# Plugin-base architecture
I wanted to comply with the [open-closed principle](https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle).

## How RegisterVisitor works

As we discussed there are some responsibilities of the items (including plugins):
- generate it's ~~html~~ MJML code
- ~~generate it's css~~
- serialize/compress its elements
- deserialize/uncompress its elements
- provide possibility to copy its instance on the canvas
- provide an editor component on the sidepanel to edit one of its element's state
- provide a viewer component for canvas

## Visitor part
As the AppState is a tree of state nodes, and each of the state node is processed based on its type, so we need to know which SN belongs to which item.
All SN [has the corresponding](../src/AppState/StateNode/StateNode.ts?plain=1#L20) item's id.
Furthermore we need to know how each item handles their operations,
therefore I created a [register](#register) for each operation (MJML generation, serialization, deserialization...) [to track](#register-part) how that operation is carried out for each item.

Just to clarify it let's put serialization as an example.
There's a [AppCompressorRegister](../src/AppState/Register/Visitor/AppCompressorRegister.ts) which registers the way how to compress its SN for each item.
Before we try to serialize the AppState, we have to [register each item](#register-part) to AppCompressorRegister. After registering every item, the AppCompressor knows exactly how to compress each SN. So basically we just have to traverse each node, based on its item id we get the (item-specific) compress operator from the AppCompressorRegister, and apply it to the SN (which belongs to the particular item).


## Register part
As aforementioned each operation need to be implemented for each item.
As an example let's check [ButtonToolPlugin](../src/ToolPlugin/ButtonTool/ButtonToolPlugin.ts). ButtonToolPlugin implements how a ButtonStateNode [serailized/deserialized](../src/ToolPlugin/ButtonTool/ButtonToolPlugin.ts?plane1#L40) or [turned into mjml template](../src/ToolPlugin/ButtonTool/ButtonToolPlugin.ts?plane1#L46).

So in order to be able to process a ButtonStateNode (for whatever operation), we have to register these implementations into an "OperationRegister".
- AppCompressorRegister - registers the way a StateNode is serialized
- AppDecompressorRegister - registers the way a serialized state is turned back into a StateNode
- AppMJMLVisitorRegister - registers the way how a StateNode is turned into an mjml template

In pseudo code:
```typescript

const allOperationRegister = [AppCompressorRegister.getInstance(), AppDecompressorRegister.getInstance(),AppMJMLVisitorRegister.getInstance(), /*...*/ ];

const allItems = [CanvasItem, ButtonToolPlugin, /*...*/ ];

allOperationRegister.forEach(register => allItems.forEach(item => register.registerItem(item)));
```

### EBItemManager
The real code is in [EBItemManager](../src/AppState/EBItemManager.ts). It pre-registers all [built-in items](#builtin-items) and accepts plugins.

## AppFlow

### state changes: Commands
Since this application supposed to be an editor, therefore I had to implement the undo/redo mechanism.
For this one the most obvious pattern is [command pattern](https://refactoring.guru/design-patterns/command).

I created a [RevertableCommand interface](../src/command/RevertableCommand.ts), the usual things are written:
- execute (do)
- undo

Plus there's an extra one: isExecutable.

### CommandManager

There's a [CommandManager](../src/command/CommandManager.ts) unit that has the responsibility to check whether the commands are executable, execute them in case yes, undo the commands, keep track of the history chain.


There's one special case that must be mentioned:

![image](./command-graph-example.svg)

Let's say we have 5 commands initially: A,B,C,D,E
Since E was the last executed command, therefore internally in CommandManager there's a pointer which points to it.

Let's say the user wants to undo the last 2 commands, namingly E and D. In this case we first call the E's undo method, then D's undo method. Meanwhile we update the >>last executed command's<< pointer. So that means the pointer now points to C.

In this case if the user executes a new F command, then we basically alter the history chain, and end up with the bottom graph, meaning we lost the D and E commands.

This is a usual behaviour among those apps which provides history (i.e. vs code), but it's good to visualize this.

### Views

There was an another AC as to different [device views](../src/views.ts), namingly Desktop, Tablet and Mobile. \
There used to be a toolbar, where the preview icons were present. At this stage of the project it was under remaking, therefore you can't see it at the moment. \
However, the preview is still in the project, you can find it as [\<eb-preview>](../src/pillar/preview/eb-preview.ts).

The concept is easy, we just create an iframe with the width associated to a device view, compile the AppState to html, and feed the iframe with the compiled html.

### Events

// TODO: