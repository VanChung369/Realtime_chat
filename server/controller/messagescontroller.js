const Messages = require("../model/Messages");
module.exports.get = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
        time: msg.createdAt,
      };
    });
    res.json(projectedMessages);
  } catch (e) {
    next(e);
  }
};
module.exports.add = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "successfully." });
    else return res.json({ msg: "Failed" });
  } catch (e) {
    next(e);
  }
};
module.exports.delete = async (req, res, next) => {
  try {
    const { from, to, message,id } = req.body;
    const data = await Messages.deleteOne({
      _id: id,
    });

    if (data) return res.json({ msg: "successfully." });
    else return res.json({ msg: "Failed" });
  } catch (e) {
    next(e);
  }
};
