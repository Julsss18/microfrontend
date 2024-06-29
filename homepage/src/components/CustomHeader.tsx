import { useEffect, useState, useRef } from "react";
import { Flex, Layout, Row, Col, Descriptions, Input } from "antd";
import type { DescriptionsProps } from "antd";

import { useStore } from "store/store";

const { Search } = Input;
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100vw",
  height: "120px",
  backgroundColor: "white",
  color: "black",
  paddingTop: "2em",
  textAlign: "end",
};

const labelStyle: React.CSSProperties = {
  fontSize: "20px",
  color: "black",
  paddingBottom: "8px",
};

const CustomHeader = () => {
  const { charts, getInitialData, searchData } = useStore();
  const initialMount = useRef(true);
  const [item, setItem] = useState<DescriptionsProps["items"]>();

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      let i: DescriptionsProps["items"] = [
        {
          key: charts?.id,
          label: `${charts?.companyCode} - ${charts?.companyFullname}`,
          children: `${charts?.location} | ${charts?.category}`,
        },
      ];
      setItem(i);
    }
  }, [charts]);

  const handleSearch = (val) => {
    searchData(val);
  };

  return (
    <>
      <Header style={headerStyle}>
        <Flex align="flex-end" vertical>
          <Row style={{ width: "100%" }} align="bottom">
            <Col span={12}>
              <Descriptions
                labelStyle={labelStyle}
                colon={false}
                layout="vertical"
                items={item}
              />
            </Col>
            <Col span={12}>
              <Search
                placeholder="Search Company"
                onSearch={handleSearch}
                style={{ width: "40%" }}
              />
            </Col>
          </Row>
        </Flex>
      </Header>
    </>
  );
};

export default CustomHeader;
