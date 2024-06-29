import { Flex, Layout, Row, Col } from "antd";
import { LineChartOutlined } from "@ant-design/icons";
import FlexibleLayout from "./FlexibleLayout";

const flexStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100vw",
  minHeight: "100%",
  padding: "20px",
  backgroundColor: "rgb(0 0 0 / 0%)",
};

const roundedDiv: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  backgroundColor: "rgb(18 0 128 / 21%)",
  marginRight: 12,
};

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100%",
  minHeight: "100%",
  backgroundColor: "transparent",
};

const MainContent = () => {
  return (
    <>
      <Flex gap="middle" wrap style={flexStyle}>
        <Layout style={layoutStyle}>
          <Row>
            <Col span={24}>
              <Flex
                align="center"
                style={{
                  fontSize: 16,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                <Flex style={roundedDiv} justify="center" align="center">
                  <LineChartOutlined />
                </Flex>
                Performance
              </Flex>
            </Col>
          </Row>
          <FlexibleLayout />
        </Layout>
      </Flex>
    </>
  );
};

export default MainContent;
