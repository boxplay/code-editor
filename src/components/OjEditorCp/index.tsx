import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from 'react';
import {
  ControlledEditor,
  ControlledEditorOnChange,
  EditorDidMount,
} from '@monaco-editor/react';
import { initMonaco } from '../../utils';
import { EDITOR_THEME, LANGUAGE_TYPE } from '../../consts';
import { editorInitOpts } from '../../consts/editorDefault';
import {
  IOjEditorCpProps,
  LanguageType,
  CodeThemeType,
  EditorOptions,
} from '../../typings/codeEditor';

export interface EditorCpRef {
  setLanguage: (v: LanguageType) => void;
  setTheme: (v: CodeThemeType) => void;
  setEditorOpts: (options: EditorOptions) => void;
  formatCode: () => void;
}

// 受控组件
const OjEditorCp = forwardRef<EditorCpRef, IOjEditorCpProps>(
  (
    {
      id,
      className,
      value,
      onChange,
      editorDidMount,
      editorOptions = {},
      lan = LANGUAGE_TYPE.javascript,
      codeTheme = EDITOR_THEME.VisualStudioDark,
      vs,
      onClick,
    },
    ref,
  ) => {
    const editorRef = useRef<any>();
    const [language, setLanguage] = useState<LanguageType>(lan);
    const [theme, setTheme] = useState<CodeThemeType>(codeTheme);
    const [opts, setOpts] = useState<EditorOptions>({
      ...editorInitOpts,
      ...editorOptions,
    });

    // 初始化editor
    const handleEditorDidMount: EditorDidMount = (_, editor) => {
      editorRef.current = editor;
      editorDidMount?.(editor);
    };

    const handleEditorChange: ControlledEditorOnChange = (_ev, v) => {
      onChange?.(v);
    };

    // ref相关方法
    useImperativeHandle(ref, () => ({
      setLanguage, // 设置语言
      setTheme, // 设置主题
      // 设置editor配置参数
      setEditorOpts: (editorOpts: EditorOptions) =>
        setOpts({
          ...opts,
          ...editorOpts,
        }),
      // 格式化代码
      formatCode: () =>
        editorRef?.current?.getAction(['editor.action.formatDocument']).run(),
    }));

    useEffect(() => {
      initMonaco({ vs });
    }, []);

    return (
      <div
        className={className}
        id={id}
        style={
          className
            ? {}
            : {
                width: 400,
                height: 400,
              }
        }
        onClick={onClick}
      >
        <ControlledEditor
          value={value}
          onChange={handleEditorChange}
          editorDidMount={handleEditorDidMount}
          language={language}
          theme={theme}
          options={opts}
        />
      </div>
    );
  },
);

export { OjEditorCp };
