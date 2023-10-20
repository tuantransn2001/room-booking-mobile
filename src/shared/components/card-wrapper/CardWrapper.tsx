/* eslint-disable import/extensions */
import React, { PropsWithChildren } from "react";
import createStyles from "./CardWrapper.style";
import { Image, View } from "react-native";
import { Layout, ViewPager } from "@ui-kitten/components";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { ICardWrapper } from "./shared/CardWrapper.interface";

interface CardWrapperProps extends ICardWrapper, PropsWithChildren {}

const CardLoader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <Rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
    <Rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
    <Rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
    <Rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
    <Rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
    <Circle cx="20" cy="20" r="20" />
  </ContentLoader>
);

export const CardWrapper = (props: CardWrapperProps) => {
  const styles = React.useMemo(() => createStyles(), []);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <View style={styles.container}>
      {props.loading ? (
        <CardLoader />
      ) : (
        <>
          <View
            style={{
              width: "100%",
              height: 192,
              backgroundColor: "#333333",
              borderRadius: 12,
              overflow: "hidden",
            }}
          >
            <ViewPager
              selectedIndex={selectedIndex}
              onSelect={(index) => setSelectedIndex(index)}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {props.sliders.map((slide, i) => (
                <Layout style={styles.tab} level="2" key={i}>
                  <Image
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    source={slide}
                  />
                </Layout>
              ))}
            </ViewPager>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                flexDirection: "column",
                gap: 6,
              }}
            >
              <TextWrapper bold h4>
                {props.body.title}
              </TextWrapper>

              {props.body.contents.map((content, i) => (
                <TextWrapper h5 key={i}>
                  {content}
                </TextWrapper>
              ))}
            </View>

            <View>
              <FontAwesomeIcon icon={faStarHalfAlt} />
              <TextWrapper>4.76</TextWrapper>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CardWrapper;
