#editor 代码编辑器

基于微软 monaco-editor 封装的 react 精简版。

@kkb/oj-editor 代码编辑器，一款支持代码高亮，代码提示，并且支持多语言，定制性极高的一款插件。<br>

## 目录

* [安装插件](#安装插件)
* [组件使用](#组件使用)
  + [OjEditor 非受控组件介绍](#ojeditor非受控组件介绍)
  + [OjEditorCp 受控组件介绍](#ojeditorcp受控组件介绍)
  + [monaco 原生介绍](#monaco原生介绍)
* [props 参数介绍](#props参数介绍)

## 安装插件

终端输入：

``` 

yarn add @kkb/oj-editor
```

or

``` 

npm install @kkb/oj-editor
```

# 组件使用

## OjEditor 非受控组件介绍

非受控组件没有 onChange 事件

``` jsx
import React, { useEffect, useRef, useState } from 'react';
import { OjEditor, LANGUAGE_TYPE, EDITOR_THEME } from '@kkb/oj-editor';
const DemoTest = () => {
  const editorRef = useRef();

  const editorDidMount = (editor) => {
    // 监听输入事件
    editor.onDidChangeModelContent((ev) => {
      console.log(editorRef.current.getValue());
    });
  };

  return (
    <OjEditor
      ref={editorRef}
      className={styles.codeWrap} // 样式，控制宽高
      id="boxid"
      value={'let a = 122'} // 内容
      editorDidMount={editorDidMount} // 组件初始化后执行，只有初始化后，codeRef对象上方法才可使用
      // editor配置 https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html
      editorOptions={{
        minimap: { enabled: false }, // 关闭地图
        readOnly: false, // 只读
        cursorStyle: 'line', // 光标样式 'block' or 'line'
        fontSize: 14, // 字体大小
        contextmenu: false, // 右键菜单
        // 滚动条
        scrollbar: {
          useShadows: true, // 滚动内容时，投射水平和垂直阴影
          verticalHasArrows: false, // 垂直滚动是否有箭头
          horizontalHasArrows: false, // 水平滚动是否有箭头
          vertical: 'auto', // 垂直滚动条 'auto', 'visible', 'hidden'
          horizontal: 'auto', // 水平滚动条
        },
        showFoldingControls: 'mouseover', // 折叠控件 always mouseover移入
        scrollBeyondLastLine: false, // 是否滚动底部间隔
      }}
      lan={LANGUAGE_TYPE.javascript} // code语言
      codeTheme={EDITOR_THEME.VisualStudioDark} // 代码主题色
      onClick={e => {}} // editor点击事件
      vs="https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs" // 定义cdn地址（可选参数）
    />
  );
};

// editorRef上面挂载方法介绍
editorRef.current.getValue(); // 获取editor内容
editorRef.current.setValue('let b = 33'); // 设置editor的内容
editorRef.current.setLanguage(LANGUAGE_TYPE.javascript); // 设置语言，默认
editorRef.current.setTheme(EDITOR_THEME.VisualStudio); // 设置主题
editorRef.current.setEditorOpts({}); // 设置编辑器参数
editorRef.current.formatCode(); // 格式化代码
```

<br><br>

## OjEditorCp 受控组件介绍

OjEditorCp 组件 可以支持 antd Form 组件<br>

antd Form 直接包裹此组件，不需要定义 value 及 onChange 二参数即可。

``` jsx
import React, { useEffect, useRef, useState } from 'react';
import { OjEditorCp, LANGUAGE_TYPE, EDITOR_THEME } from '@kkb/oj-editor';
const DemoTest = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('let a = 122');

  return (
    <OjEditorCp
      ref={editorRef}
      className={styles.codeWrap} // 样式，控制宽高
      id="boxid" // 绑定id
      value={value} // 内容
      onChange={(v) => setValue(v)} // 内容改变时触发
      editorOptions={{}} // editor配置
      lan={LANGUAGE_TYPE.javascript} // code语言
      codeTheme={EDITOR_THEME.VisualStudioDark} // 代码主题色
      vs="https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs" // 定义cdn地址（可选参数）
    />
  );
};
```

<br><br><br>

## monaco 原生介绍

创建 monaco-editor 原生编辑器，直接参考 monaco-editor 官方文档即可

``` jsx
import React from 'react';
import { monaco } from '@kkb/oj-editor';

monaco.init().then((monacoInstance) => {
  const wrapper = document.getElementById('root');
  const properties = {
    value: "function hello() {\n\talert('Hello world!');\n}",
    language: 'javascript',
  };

  monacoInstance.editor.create(wrapper, properties);
});
```

# props 参数介绍

editor 受控组件、非受控组件的 props 参数介绍

| 名称 | 类型 | 默认值 | 描述 |
| :-: | :-: | :-: | :-: | --- | --- |
| id | String |  | 给编辑器 DOM 绑定 id |
| className | String |  | 定义 className 样式，同 react 组件 className |
| value | String |  | editor 内容 |
| onChange | Funtion |  | editor 内容改变时触发，只兼容 OjEditorCp 组件 |
| editorDidMount | Funtion |  | editor 初始化完成后执行 |
| editorOptions | Object |  | [editor 配置文档](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html) |
| lan | String | "javascript" | editor 语言配置 |
| codeTheme | String | "vs-dark" | 代码主题颜色，内置 light，vs-dark 二种主题 |
| vs | String | https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs | 自定义 monaco-editor 的 cdn |
| loading | React element、string | 加载中... | editor 加载中显示的组件 |
| onClick | Funtion |  | editor 元素点击事件 |
| <!-- |  |  |  |  | --> |
