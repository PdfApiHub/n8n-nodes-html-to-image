# n8n-nodes-screenshot-html-to-image

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-screenshot-html-to-image.svg)](https://www.npmjs.com/package/n8n-nodes-screenshot-html-to-image)
[![License](https://img.shields.io/npm/l/n8n-nodes-screenshot-html-to-image.svg)](LICENSE.md)

> Capture website screenshots or render HTML as high-quality PNG images — with retina support, custom viewports, and dynamic content.

This is an [n8n](https://n8n.io/) community node powered by **[PDF API Hub](https://pdfapihub.com)**.

---

## 🚀 Install

1. Go to **Settings → Community Nodes** in n8n
2. Enter `n8n-nodes-screenshot-html-to-image`
3. Click **Install**

## 🔑 Setup

1. Sign up at [pdfapihub.com](https://pdfapihub.com) (free tier available)
2. Copy your API key
3. In n8n → **Credentials → New → PDF API Hub API** → paste your key

---

## ✨ Operations

### URL to Image
Take full-page or viewport screenshots of any website.

| Parameter | Description |
|-----------|-------------|
| **URL** | Any public webpage |
| **Full Page** | Capture entire scrollable page or just the viewport |
| **Cookie Accept Text** | Auto-dismiss cookie banners |
| **Wait Until** | Fully Loaded, DOM Ready, Network Quiet, or First Response |
| **Extra Delay** | Additional wait time for animations/lazy content |

### HTML to Image
Render your own HTML/CSS design as a PNG image.

| Parameter | Description |
|-----------|-------------|
| **HTML Content** | Your HTML template with `{{placeholder}}` support |
| **CSS Content** | Optional CSS styling |
| **Image Width/Height** | Output image dimensions in pixels |
| **Google Fonts** | Load custom fonts (pipe-separated) |
| **Dynamic Params** | Replace placeholders with dynamic data |
| **Starter Templates** | Pick from ready-made social media cards, OG images, etc. |

### Common Options

| Parameter | Description |
|-----------|-------------|
| **Output Format** | URL (hosted 30 days), Base64, Both, or Binary File |
| **Viewport** | Desktop, Laptop, Mobile, Tablet, or Custom |
| **Device Scale Factor** | 1× (standard), 2× (retina), 3× (ultra-high DPI) |
| **Quality** | Image quality 30–100 (lower = smaller file) |

---

## 💡 Use Cases

- **Social media images** — generate Open Graph / Twitter cards from templates
- **Dashboard screenshots** — capture analytics dashboards for reports
- **E-commerce** — generate product images with dynamic pricing
- **Monitoring** — screenshot web apps for visual regression testing

## 📚 Resources

- [PDF API Hub Docs](https://pdfapihub.com/docs)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
