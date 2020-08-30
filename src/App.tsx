import React from "react";

import "./App.css";

import { Layout, Checkbox, Select, Row, Col, Input, Button } from "antd";

const { Header, Footer, Content } = Layout;
const { Option } = Select;

interface User {
  name: string;
  id: number;
}
const user: User = {
  name: "Hayes",
  id: 0,
};

const platformOptions = [
  { key: "steam", value: "steam", text: "Steam" },
  { key: "ps4", value: "ps4", text: "Playtation 4" },
  { key: "xbox", value: "xbox", text: "Xbox one" },
];

function App() {
  return (
    <div className="App">
      <Layout>
        <Content>
          <Row>
            <Col xs={8} style={{ margin: "auto" }}>
              <Header>Rocket League ranks for twitch</Header>
              <Row className="first-row">
                <Col xs={8}>
                  <label className="rocketlabel">Выберите платформу</label>
                  <Select defaultValue="steam" style={{ width: 160 }}>
                    <Option value="steam">Steam</Option>
                    <Option value="ps4">Playstation</Option>
                    <Option value="xbox">Xbox</Option>
                  </Select>
                </Col>
                <Col xs={8}>
                  <label className="rocketlabel">Введите ID игрока</label>
                  <Input placeholder="Введите ID игрока" />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <label className="rocketlabel">Выберите режимы</label>
                </Col>
              </Row>
              <Row className="playlist-checkbox">
                <Col span={8}>
                  <Checkbox>Solo 1v1</Checkbox>
                  <Checkbox>Doubles 2v2</Checkbox>
                  <Checkbox>Solo standard 3v3s</Checkbox>
                  <Checkbox>Standard 3v3</Checkbox>
                </Col>
                <Col span={8}>
                  {" "}
                  <Checkbox>Hoops</Checkbox>
                  <Checkbox>Snowday</Checkbox>
                  <Checkbox>Rumble</Checkbox>
                  <Checkbox>Dropshot</Checkbox>
                </Col>
              </Row>

              <Row style={{ marginTop: "15px" }}>
                <Button type="primary" loading>
                  Проверить
                </Button>
              </Row>
            </Col>
          </Row>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </div>
  );
}

export default App;
