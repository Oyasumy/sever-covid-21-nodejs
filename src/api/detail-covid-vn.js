/* eslint-disable no-undef */
const express = require("express");

const axios = require("axios").default;
const cheerio = require("cheerio");
const findProvince = require("../commons/dataProvince");
const { compare, checkNumber } = require("../commons/index");
const { baseURL, govURL, worldURL } = require("../commons/baseURL");
const router = express.Router();

router.get("/province", async (req, res, next) => {
  try {
    await axios
      .get(baseURL)
      .then((response) => {
        // eslint-disable-next-line no-undef
        let $ = cheerio.load(response.data);
        // console.log("html" ,$);

        var detailCase = [];

        var dataRow = $("table > tbody > tr > td").toArray();
        // console.log("data row" , dataRow);
        for (let i = 0; i < dataRow.length - 1; i += 2) {
          let obj = {
            province: "",
            case: 0,
            positive: [],
          };

          if ($(dataRow[i]).text() !== "") {
            obj.province = $(dataRow[i]).text();
            obj.case = parseInt($(dataRow[i + 1]).text()) || 0;

            // get positive
            var result = findProvince($(dataRow[i]).text());
            obj.positive = result ? result[0].data : [0, 0];

            // add onj to detail cases
            detailCase.push(obj);
          }
        }

        return res.send(detailCase);
      })

      .catch((er) => {
        next(er);
      });

    // let data = $('table').text();
  } catch (error) {
    next(error);
  }
});

router.get("/country/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    axios
      .get(`${worldURL}/${id}`)
      .then((response) => {
        return res.send([response.data]);
      })
      .catch((err) => next(err));
  } catch (error) {
    next(error);
  }
});

router.get("/top-world/:index", async (req, res, next) => {
  try {
    const { index } = req.params;
    const dataParse = checkNumber(index);
    if (!dataParse) return next(new Error("reject data"));
    //  call api
    axios
      .get(worldURL)
      .then((response) => {
        const data = response.data.sort(compare).slice(0, dataParse);

        return res.send(data);
      })
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

router.get("/world", async (req, res, next) => {
  try {
    await axios
      .get(govURL)
      .then((response) => {
        // eslint-disable-next-line no-undef
        let $ = cheerio.load(response.data);

        var data = {
          detailCases: {
            total: 0,
            dead: 0,
            Recovered: 0,
          },
          activeCases: {
            currentlyInfectedPatients: 0,
            inMildCondition: [0, 0],
            Serious: [0, 0],
          },
          closeCases: {
            outcome: 0,
            Recovered: [0, 0],
            Deaths: [0, 0],
          },
        };

        //  Get raw data
        var rawDetailCases = $("#maincounter-wrap > div > span").toArray();

        // detail cases
        data.detailCases.total = $(rawDetailCases[0]).text().replace(/,/g, "").replace(/ /g, "");
        data.detailCases.dead = $(rawDetailCases[1]).text().replace(/,/g, "");
        data.detailCases.Recovered = $(rawDetailCases[2]).text().replace(/,/g, "");

        // active cases
        var rawCurrentlyInfectedPatients = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(14) > div > div.panel-body > div > div.panel_front > div.number-table-main");
        var rawMild = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(14) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(1) > span");
        var rawMildPercent = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(14) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(1) > strong");
        var rawSerious = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(14) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(2) > span");
        var rawSeriousPercent = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(14) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(2) > strong");

        data.activeCases.currentlyInfectedPatients = $(rawCurrentlyInfectedPatients).text().replace(/,/g, "");
        data.activeCases.inMildCondition[0] = $(rawMild).text().replace(/,/g, "");
        data.activeCases.inMildCondition[1] = $(rawMildPercent).text().replace(/,/g, "");
        data.activeCases.Serious[0] = $(rawSerious).text().replace(/,/g, "");
        data.activeCases.Serious[1] = $(rawSeriousPercent).text();

        // close cases
        var rawCasesOutcome = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(15) > div > div.panel-body > div > div.panel_front > div.number-table-main");
        var rawRecovered = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(15) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(1) > span");
        var rawRecoveredPercent = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(15) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(1) > strong");
        var rawDead = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(15) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(2) > span");
        var rawDeadPercent = $("body > div.container > div:nth-child(2) > div.col-md-8 > div > div:nth-child(15) > div > div.panel-body > div > div.panel_front > div:nth-child(3) > div:nth-child(2) > strong");

        data.closeCases.outcome = $(rawCasesOutcome).text().replace(/,/g, "");
        data.closeCases.Recovered[0] = $(rawRecovered).text().replace(/,/g, "");
        data.closeCases.Recovered[1] = $(rawRecoveredPercent).text();
        data.closeCases.Deaths[0] = $(rawDead).text().replace(/[,\n]/g, "");
        data.closeCases.Deaths[1] = $(rawDeadPercent).text();

        return res.send([data]);
      })

      .catch((er) => {
        next(er);
      });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
