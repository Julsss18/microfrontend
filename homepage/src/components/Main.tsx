import { Flex, Layout } from "antd";
import CustomHeader from "./CustomHeader";
import MainContent from "./MainContent";

const layoutStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
};

const Main = () => {
  return (
    <div>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <CustomHeader />
          <MainContent />
        </Layout>
      </Flex>
    </div>
  );
};

export default Main;
