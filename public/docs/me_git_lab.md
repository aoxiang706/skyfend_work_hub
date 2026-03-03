# E:\code\me_git_lab 目录整理

本页为 **E:\code\me_git_lab** 的目录总览与分类说明，便于在网页上统一查看。  
**work-hub** 为本站点源码与 GitHub 仓库根目录，不在此处作为“资料”列出，仅作说明。

---

## 网页首页地址

**本站点首页（直接打开即可访问）：**

**https://aoxiang706.github.io/skyfend_work_hub/**

换电脑、手机均可使用该链接，无需安装任何环境。

---

## 一、目录总览（顶层，不含 work-hub）

| 分类         | 目录/名称           | 说明 |
|--------------|---------------------|------|
| 项目/代码    | **sss_ptz100**      | PTZ 相关工程，Git 仓库，含源码与构建 |
| 文档/接口    | **sss_ptz100_agx_doc1** | Postman 接口集合（ssf100） |
| 文档/接口    | **sss_ptz100_agx_doc2** | Postman 接口集合 + 雷达 T6 相关说明文本 |
| 设备/SDK     | **和普PTZ**         | 和普 PTZ SDK、Demo、升级日志等，见下方说明 |
| 设备/SDK     | **耐杰PTZ**         | 耐杰 PTZ/热像挡片 SDK 与工具，见下方说明 |
| 其他         | **device_tree**     | 设备树相关（当前目录下无文件列表，需本机核对） |
| 其他         | **.cursor**         | Cursor 规则等，仅本地使用，不纳入网页资料 |

若本机还有 **stm32 源码/资料**、**产品使用录屏视频**、**迅达雷达通讯协议** 等目录，可自行在本地补充到上表，或将其说明写成 Markdown 放到 `work-hub/public/docs/` 后在此处加链接。

---

## 二、项目与文档说明

### sss_ptz100

- **路径**：`E:\code\me_git_lab\sss_ptz100`
- **类型**：Git 仓库，PTZ 业务代码与工程。
- **说明**：为工作用项目代码，具体 README 与构建方式见仓库内文件。网页仅做索引，不复制完整源码。

### sss_ptz100_agx_doc1 / sss_ptz100_agx_doc2

- **路径**：`E:\code\me_git_lab\sss_ptz100_agx_doc1`、`sss_ptz100_agx_doc2`
- **内容**：`ssf100.postman_collection.json`（Postman 接口集合），以及 doc2 下的 `雷达T6-室内不开发射.txt`（寄存器/指令类说明）。
- **用途**：接口联调与文档归档，需在 Postman 中导入使用。

---

## 三、设备/SDK 说明（和普 PTZ、耐杰 PTZ）

以下为根据目录与可读文本整理的摘要；完整使用请以各目录内官方说明为准。

### 和普PTZ（HePu）

- **路径**：`E:\code\me_git_lab\和普PTZ`
- **常见内容**：多版本 SDK 压缩包（如 Linux aarch64、Win64、中文版等）、Demo（Qt、Java、Console）、升级日志（UpgradeLog.txt）、视频帧率异常 log 等。
- **升级日志摘要**（节选）：v3.0.9 修复已知问题；v3.0.8/v3.0.7 修复与优化重连、智能分析配置、客户端跟踪等；更早版本含设备搜索、取流、测温、跟踪模式等。具体以各包内 `UpgradeLog.txt` 为准。
- **使用**：解压对应平台 SDK，参考包内 demo 与文档；日志类文件仅供排查问题。

### 耐杰PTZ（耐杰热像/挡片等）

- **路径**：`E:\code\me_git_lab\耐杰PTZ`
- **常见内容**：热像挡片使用说明与 SDK（如 SDK2025_11_24）、Windows x86/x64 库与 demo（PtzControl、TraceTool、引导协议等）、光电模拟器、tmControlClient 等。
- **说明摘要**（根据 readme 等）：Windows SDK 更新过录像/抓图/双通道等；引导协议文档有修订；具体以目录内 readme/说明为准。
- **使用**：按需选用 Windows 或 GCC 版本，参考对应 demo 与文档。

---

## 四、无法自动识别的目录

- **device_tree**：当前仅知为设备树相关，未在工具中列出具体子文件。请在本机查看后，若需展示，可新建 `work-hub/public/docs/device_tree.md` 写简要说明，并在此处或「文档」页增加链接。
- 其他中文或非常规命名目录：建议在本机确认用途后，**转为 Markdown 说明**（如 `xxx.md`）放到 `work-hub/public/docs/`，并在本文「目录总览」表中补充一行，或在本站「文档」页增加对应入口。

---

## 五、后续维护建议

1. **新增目录**：在「目录总览」表里加一行，并在对应分类下写一两句说明。
2. **无法识别的**：统一写成 `public/docs/xxx.md`，在此或文档页链过去。
3. **和普/耐杰**：若有新版本或重要说明，可更新本节摘要，或单独建 `hepu_ptz.md` / `naijie_ptz.md` 在文档页展示。

更新后执行 `git add` → `commit` → `push`，网页刷新即可看到最新内容。
