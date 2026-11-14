# 工位物种鉴定所

一个移动端单页娱乐测试 MVP。10 道题，6 种结果，答案只在浏览器本地计算，不上传，不收集个人信息。

## 本地预览

在项目目录运行：

```powershell
python -m http.server 4173
```

然后打开 <http://localhost:4173/>。

## 当前范围

- 不接支付、订单、自动发货或统计。
- 不提供心理、职业或医疗诊断。
- 结果图由浏览器 Canvas 生成，可下载为 PNG。

## 开源基础

评分、结果渲染和结果图导出基于 [Quiz Studio](https://github.com/Yaowon/quiz-studio) 的 MIT starter，做了最小化和视觉改造。
