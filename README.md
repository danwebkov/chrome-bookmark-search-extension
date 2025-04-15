# Chrome bookmark search extension

## Purpose

Manifest V3 simple bookmarks search extension. When installed, it adds a extension button with bookmark icon that provide you bookmarks search. It also can be used as boilerplate-example extension.


It shows basic interactions between a tabs, background scripts, and the active tab. It can be easily extended to add more complex functionality.


## What this extension does

It provides the following functionality:

1. Clicking the extension button opens a chrome://bookmarks tab and close other chrome://bookmarks/* tabs.

2. When you activate other tab, chrome://bookmarks tab closing.

3. You also can add hotkey (e.g. CTRL+SHIFT+F) for this extension main event, and thus get fast bookmark search hotkey.

## How to install

1. Clone or download this repository to your local machine.
2. Open your Chrome-based browser and navigate to `chrome://extensions`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" button that appears after enabling developer mode.
5. Select the directory containing the extension files (the same directory as the `manifest.json` file).
6. The extension should now appear in your browser's toolbar. If it doesn't, check whether it's hidden behind the browser's "puzzle" icon.

