import React, { useRef, useState, useEffect } from 'react';
import { OjEditor, LANGUAGE_TYPE } from './index';

const App = () => {
  const editorRef = useRef();
  const [codeValue, setCodeValue] = useState('');

  const editorDidMount = (editor) => {
    setTimeout(() => {
      editor.getAction(['editor.action.formatDocument']).run();
    }, 1300);
  };

  useEffect(() => {
    setCodeValue(`class Solution(object):
       def twoSum(self, nums, target):
        """
         :type nums: List[int]
           :type target: int
          :rtype: List[int]
        """`);
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'rgba(221,232,12,0.4)',
        width: 600,
      }}
    >
      <OjEditor
        ref={editorRef} // 暴露ref，挂载系列方法
        id="codeWrap"
        editorDidMount={editorDidMount} // 组件初始化后
        // editor配置
        editorOptions={{
          contextmenu: true,
        }}
        lan={LANGUAGE_TYPE.python}
        value={codeValue}
      />
    </div>
  );
};
export default App;
