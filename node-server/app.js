const express = require("express");
const cors = require("cors");
const app = express();
const cheerio = require("cheerio");

app.use(cors());

app.options(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/loadrank/:platform/:id/:playlist/:json", async function (
  request,
  response
) {
  const platform = request.params.platform;
  const playerid = request.params.id;
  const json = request.params.json;
  const playlist = request.params.playlist.split(",");

  const platforms = [
    {
      mini: "s",
      full: "steam",
    },
    {
      mini: "p",
      full: "psn",
    },
    {
      mini: "x",
      full: "xbl",
    },
  ];

  const selectedplatform = await platforms.find((el) => el.mini === platform)
    .full;

  function doRequest(url) {
    return new Promise(function (resolve, reject) {
      var request = require("request");
      request(url, function (error, res, body) {
        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);

          response.send({
            status: 2,
            message: "Tracker not working.",
          });
        }
      });
    });
  }

  async function main(id, name) {
    var url =
      "https://rocketleague.tracker.network/rocket-league/profile/" +
      selectedplatform +
      "/" +
      playerid +
      "/mmr?playlist=" +
      id;

    let body = await doRequest(url);
    var rankback = new Object();
    var $ = cheerio.load(body);

    rankback.id = id;
    rankback.name = name;

    $("div.summary .stat").each((i, rankline) => {
      if (i === 0) {
        rankback.ranktitle = GetNameRank(
          $(rankline).children("img").attr("src")
        );
        rankback.division = $(rankline)
          .children("div")
          .children("div.value")
          .text();
      }
      if (i === 1) {
        var mmr = $(rankline).children("div.value").text();
        rankback.mmr = parseInt(mmr.replace(",", ""));
      }
      if (i === 4) {
        // For unranked
        var matches = $(rankline).children("div.value").text();
        if (matches < 10) {
          rankback.ranktitle = "Unranked";
          rankback.division = "";
        }
      }
    });

    return rankback;
  }

  function GetNameRank(img) {
    if (img) {
      var name = img.replace(
        "https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/",
        ""
      );

      name = name.replace(".png", "");
      name = name.replace("-", "");

      const ranks = {
        s40: "Unranked",
        s41: "Bronze I",
        s42: "Bronze II",
        s43: "Bronze III",
        s44: "Silver I",
        s45: "Silver II",
        s46: "Silver III",
        s47: "Gold I",
        s48: "Gold II",
        s49: "Gold III",
        s410: "Platinum I",
        s411: "Platinum II",
        s412: "Platinum III",
        s413: "Diamond I",
        s414: "Diamond II",
        s415: "Diamond III",
        s416: "Champion I",
        s417: "Champion II",
        s418: "Champion III",
        s419: "Grand Champion",
      };

      return ranks[name];
    }
  }

  var data = new Object();

  var text = "";

  if (playlist.indexOf("1s") !== -1) {
    await main(10, "1v1").then((result) => {
      if (result.mmr) {
        data.mmr_1v1 = result.mmr;
        data.title_1v1 = result.ranktitle;
        data.div_1v1 = result.division;
        text +=
          " [1v1]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }
  if (playlist.indexOf("2s") !== -1) {
    await main(11, "2v2").then((result) => {
      if (result.mmr) {
        data.mmr_2v2 = result.mmr;
        data.title_2v2 = result.ranktitle;
        data.div_2v2 = result.division;
        text +=
          " [2v2]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }
  if (playlist.indexOf("3ss") !== -1) {
    await main(12, "3v3s").then((result) => {
      if (result.mmr) {
        data.mmr_3v3s = result.mmr;
        data.title_3v3s = result.ranktitle;
        data.div_3v3s = result.division;
        text +=
          " [3v3s]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }
  if (playlist.indexOf("3s") !== -1) {
    await main(13, "3v3").then((result) => {
      if (result.mmr) {
        data.mmr_3v3 = result.mmr;
        data.title_3v3 = result.ranktitle;
        data.div_3v3 = result.division;
        text +=
          " [3v3]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }
  if (playlist.indexOf("hp") !== -1) {
    await main(27, "hoops").then((result) => {
      if (result.mmr) {
        data.mmr_hoops = result.mmr;
        data.title_hoops = result.ranktitle;
        data.div_hoops = result.division;
        text +=
          " [Hoops]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }
  if (playlist.indexOf("rb") !== -1) {
    await main(28, "rumble").then((result) => {
      if (result.mmr) {
        data.mmr_rumble = result.mmr;
        data.title_rumble = result.ranktitle;
        data.div_rumble = result.division;
        text +=
          " [Rumble]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }
  if (playlist.indexOf("dp") !== -1) {
    await main(29, "dropshot").then((result) => {
      if (result.mmr) {
        data.mmr_dropshot = result.mmr;
        data.title_dropshot = result.ranktitle;
        data.div_dropshot = result.division;
        text +=
          " [Dropshot]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }
  if (playlist.indexOf("sy") !== -1) {
    await main(30, "snowday").then((result) => {
      if (result.mmr) {
        data.mmr_snowday = result.mmr;
        data.title_snowday = result.ranktitle;
        data.div_snowday = result.division;
        text +=
          " [Snowday]: " +
          result.ranktitle +
          " " +
          result.division +
          " (" +
          result.mmr +
          " mmr) ";
      }
    });
  }

  let ranks = {
    status: 1,
    message: text,
  };

  if (json == 1) {
    response.json(ranks);
  } else {
    response.send(ranks.message);
  }
});

app.listen(3002);
