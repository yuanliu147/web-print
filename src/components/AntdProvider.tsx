"use client";

import { App, ConfigProvider } from "antd";
import type { FC, PropsWithChildren } from "react";

import "@ant-design/v5-patch-for-react-19";

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
      <ConfigProvider>
        <App>{children}</App>
      </ConfigProvider>
  );
};

export default AntdProvider;