# Work Hub

个人工作内容整理：项目列表、文档、笔记资料、代码仓链接。静态站点，可用 GitHub Pages 部署，换电脑打开同一网址即可访问。

- **GitHub**：[aoxiang706](https://github.com/aoxiang706)

## 本地运行

需先安装 [Node.js](https://nodejs.org/)（含 npm）。

```bash
cd skyfend_work_hub
npm install
npm run dev
```

浏览器打开终端提示的地址（通常 `http://localhost:5173`）。

## 构建与部署（GitHub Pages）

1. 在 GitHub 新建仓库（如 `skyfend_work_hub`），本地添加远程并推送：

   ```bash
   git init
   git remote add origin https://github.com/aoxiang706/skyfend_work_hub.git
   git add .
   git commit -m "feat: init skyfend_work_hub"
   git branch -M main
   git push -u origin main
   ```

2. 仓库设置中开启 Pages：  
   **Settings → Pages → Source** 选 **GitHub Actions**（或先选 **main** 分支、**/ (root)** 再改）。

3. 若用 **GitHub Actions** 构建并发布：
   - 在仓库根目录创建 `.github/workflows/deploy.yml`（见下方示例），推送后自动构建并把 `dist/` 发布到 Pages。
   - 访问地址：`https://aoxiang706.github.io/skyfend_work_hub/`

4. 若用 **分支 + 静态文件**：  
   - 本地执行 `npm run build`，把 `dist/` 目录内容推送到 `gh-pages` 分支或 `main` 的 `docs/` 目录，在 Settings → Pages 里选择对应分支/目录即可。

### 示例：GitHub Actions 部署（推荐）

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deploy
```

仓库 **Settings → Pages → Build and deployment** 选 **GitHub Actions**。推送后访问：`https://aoxiang706.github.io/skyfend_work_hub/`。

## 内容维护

- **项目列表**：编辑 `public/data/projects.json`，可增加 `repoUrl`、`path`、`docsPath` 等。
- **文档**：将 Markdown 放到 `public/docs/`，如 `ptz100_agx.md`；在 `src/pages/Docs.jsx` 的 `DOCS` 中增加对应项即可展示。
- **笔记资料**：将 OneNote 导出的 Markdown/HTML 放到 `public/content/notes/`，并维护 `public/content/notes/index.json`（格式见笔记页说明）。也可在站内使用「添加笔记」页编写并下载 .md，再按说明入库。

## 常见问题

### 哪些数据无法被直接读取、需要你提供？

- **192.168.3.105 上的 OneNote**：当前环境无法访问该 PC，也无法直接读 OneNote。需要你在那台电脑上把笔记导出为 Markdown/HTML，将导出文件放到本仓库的 `public/content/notes/`，并维护 `index.json`。
- **E:\\code\\me_git_lab 的文档**：该路径在你本机 Windows 上，当前环境读不到。请把要展示的文档复制到本仓库（如 `public/docs/me_git_lab/` 或合并进 `public/docs/me_git_lab.md`）后 push，网页即可展示。
- **其他仅存在于你本机或他机的文件**：只要未放入本仓库或未通过可访问的 URL 提供，都无法被自动读取，需要你手动拷贝/导出到仓库或指定目录。

### 当前网页如何打开？是否必须用 npm？

- **部署后（推荐）**：推送到 GitHub 并开启 Pages 后，**直接浏览器打开**  
  `https://aoxiang706.github.io/skyfend_work_hub/`  
  不依赖你本机 npm，换电脑、手机也能访问。**永久有效，个人使用免费**（GitHub Pages 公开仓库免费）。
- **本地开发**：需要 Node/npm，执行 `npm install` 和 `npm run dev`，用浏览器打开终端给出的地址（如 `http://localhost:5173`）。
- **本地只看构建结果、不想装 npm**：在已装 Node 的机器上执行一次 `npm run build`，用任意静态服务器打开 `dist` 目录（例如 `npx serve dist`），再在浏览器访问该地址；或把 `dist` 内容部署到任意静态托管。

### 可视化添加笔记、个人工作总结与 Cursor 阶段性总结

- **站内「添加笔记」**：导航栏有「添加笔记」页，可填写标题、分类、Markdown 内容，实时预览，并**下载 .md 文件**或复制内容。把下载的文件放入 `public/content/notes/`，在 `public/content/notes/index.json` 里增加一条记录，commit 并 push，即可在「笔记资料」中展示，当作个人工作总结信息库使用。
- **Cursor 阶段性自动补充**：本仓库无后端，无法从 Cursor 直接“写库”。可以这样配合使用：
  1. 在 Cursor 里让 AI 帮你做阶段性任务总结，生成一段 Markdown（或直接生成符合 `index.json` 的一条条目）。
  2. 你将该内容保存为 .md 放入 `public/content/notes/`，并更新 `index.json`（或使用「添加笔记」页下载/复制后手动入库）。
  3. 也可以在本仓库里放一个 Cursor 规则或 Skill：例如“当我要求「把本次对话总结成 work hub 笔记」时，生成一条可追加到 `public/content/notes/` 的 .md 内容及对应的 `index.json` 条目”。你复制进仓库并 push 后，网站更新即可看到。这样实现“阶段性自动分类总结并补充到网页”。

## 技术栈

- Vite + React  
- react-router-dom  
- react-markdown  
