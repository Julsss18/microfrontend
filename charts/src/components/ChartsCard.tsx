import React from "react";
import { Card, Radio, Layout, Flex } from "antd";
import type { RadioChangeEvent } from "antd";

const { Header } = Layout;

export interface IRadioButtonsOptions {
  value: string | number;
  label: string;
}

export interface IRadioButtons {
  options?: IRadioButtonsOptions[];
  defaultValue?: string | number;
  onChange: (e: RadioChangeEvent) => void;
}

export interface IChartsCard {
  hoverable?: boolean;
  title?: string;
  style?: React.CSSProperties;
  styles?: {
    header?: React.CSSProperties;
    body?: React.CSSProperties;
    extra?: React.CSSProperties;
    title?: React.CSSProperties;
    actions?: React.CSSProperties;
    cover?: React.CSSProperties;
  };
  radioOptions?: IRadioButtons;
  children?: React.ReactNode;
}

const headerStyle: React.CSSProperties = {
  backgroundColor: "transparent",
  padding: "unset",
};

const ChartsCard: React.FC<IChartsCard> = ({
  hoverable = true,
  title,
  style = { width: "100%", height: "100%" },
  styles = { body: { maxHeight: "85%" } },
  radioOptions,
  children,
}: IChartsCard) => {
  const generateHeader = () => {
    return (
      <Header style={headerStyle} className="no-drag">
        <Flex
          gap="middle"
          align="flex-end"
          style={{ height: "100%" }}
          justify="center"
          vertical
        >
          <Radio.Group
            onChange={radioOptions?.onChange}
            defaultValue={radioOptions?.defaultValue}
          >
            {radioOptions!.options!.map((value, index): React.ReactNode => {
              return (
                <Radio.Button key={index} value={value.value}>
                  {value.label}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </Flex>
      </Header>
    );
  };

  return (
    <Card hoverable={hoverable} title={title} style={style} styles={styles}>
      {radioOptions === null && radioOptions !== undefined ? (
        <></>
      ) : (
        generateHeader()
      )}
      {children && children}
    </Card>
  );
};

export default ChartsCard;
