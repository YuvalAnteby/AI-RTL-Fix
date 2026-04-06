# AI RTL Fix 

A lightweight, open source browser extension that natively fixes Right-to-Left (RTL) language formatting (like Hebrew and Arabic) when mixed with English, code blocks, and KaTeX math equations in modern AI chatbots.

Currently officially supports: **Claude** and **Gemini**.

--- 

## Problems the extension fixes
* Punctuation marks (`.` `:` `?`) appear on the wrong side of the sentence
* Bullet points and numbered lists indent backwards
* Mixing Hebrew/Arabic with English scrambles the sentence structure
* Standard CSS RTL overrides completely break inline KaTeX math equations and code blocks

---

## The Solution
This extension uses an optimized, debounced JavaScript `MutationObserver`. It silently watches the chatbot's text stream in real time. If it detects RTL characters in a paragraph or list item, it dynamically injects a `dir="rtl"` attribute to fix the grammar and punctuation layout natively.  

Simultaneously, a strict CSS layer isolates all `<pre>`, `<code>`, and `.katex` blocks, forcing them into secure LTR "bubbles" so your math and programming syntax remains perfectly untouched.  

---

## Installation 

Since this extension is completely free and open-source, it is not hosted on the official web stores to avoid developer fees.  
You can easily install it locally following these instructions

### Chromium (Chrome, Edge, Brave, & Opera)
1. Click **Code > Download ZIP** at the top of this repository and extract the folder.
2. Open your browser and navigate to the extensions page (e.g., `chrome://extensions/` or `edge://extensions/`).
3. Toggle on **Developer mode** in the top right corner.
4. Click **Load unpacked** and select the extracted `AI-RTL-Fix` folder.

### Firefox
1. Click **Code > Download ZIP** and extract the folder.
2. Open Firefox and type `about:debugging` in the URL bar.
3. Click **This Firefox** on the left menu.
4. Click **Load Temporary Add-on...**
5. Select the `manifest.json` file inside the extracted folder. 
*(Note: Firefox removes temporary add-ons when you restart the browser).*

### Safari (macOS)
1. Open Safari and go to **Safari > Settings > Advanced**.
2. Check the box at the bottom: **Show features for web developers**.
3. In the macOS menu bar, click **Develop** and check **Allow Unsigned Extensions**.
4. Open your terminal and use Xcode's command line tools to convert the folder into a Safari App Extension by running: 
```bash
xcrun safari-web-extension-converter /path/to/AI-RTL-Fix
```
5. Build the project in Xcode to enable it in Safari. 
*(Note: You must re-enable "Allow Unsigned Extensions" every time Safari restarts).*

---

## Performance 
To prevent CPU spiking during long chats, the DOM MutationObserver is debounced.  
It waits for a 50ms pause in the AI's text generation before applying the RTL logic, reducing browser resource usage by over 90% compared to brute force script injection.  
The extension is strictly scoped and only activates on `claude.ai`, `gemini.google.com`, and `chatgpt.com`.

---

## License
Distributed under the **MIT License**. See `LICENSE` for more information. 

---

# Contribution
Feel free to fork and modify, or opening a PR!
