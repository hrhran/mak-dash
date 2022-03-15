const level  = require("../models/level");
const path = require("path");
const fs = require("fs");
const helper = require("../helper");


const getLevel = (req, res, next) => {
        level
        .find()
        .sort({ timestamp: -1 })
        .exec((err, levels) => {
          if (err) return console.log(err);
          res.render("levelPage", {
            lvls: levels,
            helper: helper,
          });
        }); 
  };

  const addLevel = async (req, res, next) => {
    const data = req.body;
    const addOrUpdateLevel= await User.findOneAndUpdate({symbol:data.symbol},{
      timestamp: Math.floor(Date.now() / 1000),
      date: data.date,
      symbol: data.symbol.toUpperCase(),
      levels: data.levels.replaceAll(' ',''),
      major: data.major.replaceAll(' ',''),
      comment: data.comment,
    }, { upsert: true })
    // let lvl = await new level({
    //     timestamp: Math.floor(Date.now() / 1000),
    //     date: data.date,
    //     symbol: data.symbol.toUpperCase(),
    //     levels: data.levels.replaceAll(' ',''),
    //     major: data.major.replaceAll(' ',''),
    //     comment: data.comment,
    // });
    // lvl = await lvl.save();
    res.redirect('/levels')
  };

  const getUpdateLevelView = async (req, res, next) => {
    try {
      const id = req.params.id;
      const onelevel = await level.findById(id).exec();
      res.render("updateLevel", {
        lvls: onelevel,
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const updateLevel = async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    let lvl = await level.findByIdAndUpdate(
      id,
      {
        date: data.date,
        symbol: data.symbol,
        levels: data.levels.replaceAll(' ',''),
        major: data.major.replaceAll(' ',''),
        comment: data.comment,
      },
      { new: true }
    );
    if (!lvl)
      return res.status(404).send("Levels with the given id not found");
    res.redirect("/levels");
  };
  

  const deleteLevel = async (req, res, next) => {
    try {
      const id = req.params.id;
      const lvl = await level.findByIdAndRemove(id);
      if (!lvl)
        return res.status(404).send("Level with the given id not found");
      res.redirect("/levels");
    } catch (error) {
      res.status(400).send(error.message);
    }
  };



module.exports = {
  getLevel,
  addLevel,
  getUpdateLevelView,
  updateLevel,
  deleteLevel,
};
