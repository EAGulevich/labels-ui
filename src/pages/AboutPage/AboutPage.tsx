import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import {
  Badge,
  Card,
  Col,
  Collapse,
  Divider,
  Flex,
  Row,
  Tabs,
  Tag,
  Typography,
} from "antd";

import { ROUTE_PATHS } from "@constants";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const AboutPage = () => {
  const { pathname } = useLocation();
  const { t: aboutT } = useTranslation("about");
  const { t: howToPlayT } = useTranslation("howToPlay");

  return (
    <Row justify="center" style={{ paddingBottom: "40px" }}>
      <Col xs={24} sm={24} md={18} lg={14}>
        <Card style={{ padding: "12px" }}>
          <Tabs defaultActiveKey={pathname}>
            <TabPane tab={aboutT("name")} key={ROUTE_PATHS.about}>
              <Paragraph>{aboutT("paragraphs.hello")}</Paragraph>
              <Paragraph>
                <Trans
                  ns={"about"}
                  i18nKey="paragraphs.idea"
                  components={{
                    Link: (
                      <Link
                        target="_blank"
                        to={
                          "https://www.youtube.com/watch?v=wmqT93Mbkfo&list=PLDuygd2Lb1g8VCcPFr9Xmn4iJd70iwZtG"
                        }
                      />
                    ),
                    BadgeRound: <Badge color={"purple"} />,
                  }}
                />
              </Paragraph>
              <Paragraph>{aboutT("paragraphs.webVersion")}</Paragraph>
              <Paragraph>{aboutT("paragraphs.end")}</Paragraph>
            </TabPane>
            <TabPane tab={howToPlayT("name")} key={ROUTE_PATHS.howToPlay}>
              <Title level={5}>{howToPlayT("paragraphs.goal.title")}</Title>
              <Paragraph>{howToPlayT("paragraphs.goal.text")}</Paragraph>
              <Title level={5}>
                {howToPlayT("paragraphs.preparation.title")}
              </Title>
              <Paragraph>
                <ol>
                  <li>
                    <Paragraph>
                      {howToPlayT("paragraphs.preparation.textList.device")}
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph>
                      {howToPlayT("paragraphs.preparation.textList.qrCode")}
                    </Paragraph>
                  </li>
                </ol>
              </Paragraph>
              <Title level={5}>
                {howToPlayT("paragraphs.stepsOfGame.title")}
              </Title>
              <Paragraph>
                <ol>
                  <li>
                    <Paragraph>
                      {howToPlayT("paragraphs.stepsOfGame.textList.addFact")}
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph>
                      {howToPlayT("paragraphs.stepsOfGame.textList.voting")}
                    </Paragraph>
                  </li>
                  <li>
                    <Paragraph>
                      {howToPlayT("paragraphs.stepsOfGame.textList.points")}
                    </Paragraph>
                    <Paragraph>
                      <Collapse
                        expandIconPosition={"end"}
                        items={[
                          {
                            key: "examples",
                            label: howToPlayT(
                              "paragraphs.stepsOfGame.pointsSystem.label",
                            ),
                            children: (
                              <Flex vertical>
                                <ul>
                                  <li>
                                    <Paragraph>
                                      {howToPlayT(
                                        "paragraphs.stepsOfGame.pointsSystem.paragraphs.morePoints",
                                      )}
                                    </Paragraph>
                                    <Paragraph>
                                      <Trans
                                        ns={"howToPlay"}
                                        i18nKey="paragraphs.stepsOfGame.pointsSystem.paragraphs.everyRound"
                                        components={{
                                          Tag: <Tag />,
                                        }}
                                      />
                                    </Paragraph>
                                    <Paragraph>
                                      <Trans
                                        ns={"howToPlay"}
                                        i18nKey="paragraphs.stepsOfGame.pointsSystem.paragraphs.example"
                                        components={{
                                          Tag: <Tag />,
                                        }}
                                      />
                                    </Paragraph>
                                  </li>
                                  <li>
                                    <Paragraph>
                                      {howToPlayT(
                                        "paragraphs.stepsOfGame.pointsSystem.paragraphs.voteFast",
                                      )}
                                    </Paragraph>
                                    <Paragraph>
                                      <Trans
                                        ns={"howToPlay"}
                                        i18nKey="paragraphs.stepsOfGame.pointsSystem.paragraphs.voteFastExample"
                                        components={{
                                          Tag: <Tag />,
                                        }}
                                      />
                                    </Paragraph>
                                  </li>

                                  <li>
                                    <Paragraph>
                                      {howToPlayT(
                                        "paragraphs.stepsOfGame.pointsSystem.voteYourself",
                                      )}
                                    </Paragraph>
                                  </li>
                                </ul>
                              </Flex>
                            ),
                          },
                        ]}
                      />
                    </Paragraph>{" "}
                  </li>
                  <li>
                    <Paragraph>
                      {howToPlayT("paragraphs.stepsOfGame.textList.resume")}
                    </Paragraph>
                  </li>
                </ol>
              </Paragraph>
              <Title level={5}>{howToPlayT("paragraphs.gameOver.title")}</Title>
              <Paragraph>{howToPlayT("paragraphs.gameOver.text")}</Paragraph>
            </TabPane>
          </Tabs>
          <Divider />
          <Paragraph
            type={"secondary"}
            style={{
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            <div>{howToPlayT("feedback")}</div>
            <Text code copyable>
              @meteorgul
            </Text>
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default AboutPage;
