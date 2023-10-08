import React from "react";
// 导入图片
import logo from '../3536227.jpg';

const LogoImage = () => {
  return (
      // 使用 img 标签并将导入的 logo 作为 src 属性值
      <img src={logo} alt="Logo" width="100" height="100" />
  );
};

export default LogoImage;
