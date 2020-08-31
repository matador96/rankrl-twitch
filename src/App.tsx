import React, { useState } from "react";

import "./App.css";

import { Layout, Checkbox, Select, Row, Col, Input, Button, Alert } from "antd";
import axios from "axios";

const { Header, Content } = Layout;
const { Option } = Select;
const checkboxes = [
  {
    name: "1s",
    key: 1,
    label: "Solo 1v1",
  },
  {
    name: "2s",
    key: 2,
    label: "Doubles 2v2",
  },
  {
    name: "3ss",
    key: 3,
    label: "Solo standard 3v3s",
  },
  {
    name: "3s",
    key: 4,
    label: "Standard 3v3",
  },
  {
    name: "hp",
    key: 5,
    label: "Hoops",
  },
  {
    name: "sy",
    key: 6,
    label: "Snowday",
  },
  {
    name: "rb",
    key: 7,
    label: "Rumble",
  },
  {
    name: "dp",
    key: 8,
    label: "Dropshot",
  },
];
function App() {
  const [data, setData] = useState({
    status: 0,
    message: "",
  });

  const [checkedItems, setCheckedItems] = useState({ "1s": false });
  const [id, setId] = useState("");
  const [platform, setPlatform] = useState("s");
  const [url, setUrl] = useState("s");
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setData({
      status: 0,
      message: "",
    });

    const array_playstyles: string[] = [];
    for (const [key, value] of Object.entries(checkedItems)) {
      if (value) {
        array_playstyles.push(`${key}`);
      }
    }

    const playstyles =
      array_playstyles.length !== 0 ? array_playstyles.toString() : "all";

    const geturl =
      "http://localhost:3002/loadrank/" +
      platform +
      "/" +
      id +
      "/" +
      playstyles;

    axios
      .get(geturl + "/1")
      .then(function (response) {
        setData(response.data);
        setUrl(geturl);
        setLoading(false);
      })
      .catch(function (error) {
        if (error) {
          setData({
            status: 0,
            message: "An error occurred and the api is not responding." + error,
          });
        }
      });
  };

  const handleChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChangeSelect = (value) => {
    setPlatform(value);
  };

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <Layout>
        <Content>
          <Row>
            <Col xs={10} style={{ margin: "auto" }}>
              <Header>Rocket League ranks for twitch</Header>
              <div className="right-block">
                Project on
                <a
                  href="https://github.com/matador96/rankrl-twitch"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "5px" }}
                >
                  Github
                </a>
                , developed by Matador
              </div>
              <Row className="first-row">
                <Col xs={8}>
                  <label className="rocketlabel">Choose platform</label>
                  <Select
                    defaultValue="steam"
                    style={{ width: 160 }}
                    value={platform}
                    onChange={handleChangeSelect}
                  >
                    <Option value="s">Steam</Option>
                    <Option value="p">Playstation</Option>
                    <Option value="x">Xbox</Option>
                  </Select>
                </Col>
                <Col xs={10}>
                  <label className="rocketlabel">Player ID</label>
                  <Input
                    placeholder={platform === "s" ? "STEAM ID" :"ID"}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                  />
                </Col>
              </Row>

              <Row>
                <Col xs={12}>
                  <label className="rocketlabel">Playlists</label>
                </Col>
              </Row>
              <Row className="playlist-checkbox">
                <Col span={24}>
                  {checkboxes.map((item) => (
                    <Checkbox
                      name={item.name}
                      key={item.key}
                      checked={checkedItems[item.name]}
                      onChange={handleChange}
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </Col>
              </Row>

              <Row style={{ marginTop: "15px" }}>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  style={id.length === 0 ? { opacity: 0 } : { opacity: 1 }}
                  loading={isLoading ? true : false}
                >
                  {isLoading ? "Checking" : "Check"}
                </Button>
              </Row>

              {data.status !== 0 && (
                <>
                  <Alert
                    message={data.status === 1 ? "Done" : "Error"}
                    showIcon
                    description={
                      data.status === 1
                        ? data.message
                        : "An error occurred and you entered the data incorrectly."
                    }
                    type={data.status === 1 ? "success" : "error"}
                    className="alert-message"
                    closable
                    onClose={onClose}
                  />

                  {data.status === 1 && (
                    <div className="command-list">
                      <Row>
                        <Col xs={24}>
                          <label className="rocketlabel">
                            Nightbot command
                          </label>
                          <Input
                            placeholder="Nightbot command"
                            value={"!addcom !rank $(urlfetch " + url + "/0)"}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={24}>
                          <label className="rocketlabel">
                            StreamElements command
                          </label>
                          <Input
                            placeholder="StreamElements command"
                            value={
                              "!command add !rank $(urlfetch " + url + "/0)"
                            }
                          />
                        </Col>{" "}
                      </Row>
                      <Row>
                        <Col xs={24}>
                          <label className="rocketlabel">API URL</label>
                          <Input placeholder="API URL" value={url + "/0"} />
                        </Col>
                      </Row>
                    </div>
                  )}
                </>
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
