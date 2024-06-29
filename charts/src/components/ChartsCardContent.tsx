import React, { useState, useRef } from "react";

import { Flex, Layout, Card, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import { Area } from "@ant-design/plots";
import { Resizable } from "re-resizable";

const { Content, Sider } = Layout;

const layoutStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  height: "100%",
};

const contentStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  padding: "unset",
  width: 500,
};

const sideStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  padding: "unset",
};

const ChartsCardContent = ({ chartsData, title, subTitle }) => {
  const [width, setWidth] = useState(475);
  const [defaultWidth, setDefaultWidth] = useState(475);
  const sideRef = useRef<HTMLDivElement>(null);

  const maxWidth = 475;
  const minWidth = 250;

  const config = {
    data: {
      value: chartsData,
    },
    xField: (d) => new Date(d.date),
    yField: "close",
  };

  const items: DescriptionsProps["items"] = [
    {
      label: title,
      children: subTitle,
    },
  ];

  const handleResizeStop = (e, direction, ref, d) => {
    let newWidth = width + d.width;
    if (newWidth > maxWidth) {
      newWidth = maxWidth;
    }
    if (newWidth < minWidth) {
      newWidth = minWidth;
    }
    setWidth(newWidth);
    setDefaultWidth(newWidth);
  };

  return (
    <>
      <Layout style={{ height: 250, ...layoutStyle }} className="no-drag">
        <Content style={contentStyle}>
          <Resizable
            defaultSize={{
              width: defaultWidth,
              height: 250,
            }}
            bounds={"parent"}
            onResizeStop={handleResizeStop}
            enable={{ right: true, top: false, bottom: false, left: false }}
            handleStyles={{
              right: {
                border: "solid 1px #80808042",
                width: 1,
                borderRadius: 5,
              },
            }}
            maxWidth={maxWidth}
            minWidth={minWidth}
          >
            <Area
              style={{ transition: "width 1s ease-out" }}
              {...config}
              width={defaultWidth}
            />
          </Resizable>
        </Content>
        <Sider ref={sideRef} style={sideStyle}>
          <Card
            hoverable={false}
            styles={{ title: { border: "unset" }, body: { height: "100%" } }}
            bordered={false}
            style={{ height: "100%", boxShadow: "unset" }}
          >
            <Flex justify="center" align="center" style={{ height: "100%" }}>
              <Descriptions
                layout="vertical"
                colon={false}
                items={items}
                labelStyle={{
                  color: "black",
                  fontSize: 20,
                  fontWeight: "bolder",
                }}
                contentStyle={{ fontSize: 16, color: "black", fontWeight: 500 }}
              />
            </Flex>
          </Card>
        </Sider>
      </Layout>
    </>
  );
};

export default ChartsCardContent;
