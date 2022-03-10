const FileModel = require("../models/FileModel");
const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const getAll = asyncHandler(async (req, res) => {
  const files = await FileModel.find({});

  res.status(200).json({
    message: "Files Listed!",
    files: files,
  });
});


const upload = asyncHandler(async (req, res, next) => {
  res.send("upload");
  console.log(req.file);
  const title = req.headers.title;
  const fileUrl = `/uploads/files/${req.file.filename}`;
  const fileType = req.file.originalname.split(".")[1];
  const owner = await UserModel.findOne({ _id: req.user.id });

  const newFile = await FileModel.create({
    title,
    fileUrl,
    fileType,
    owner: req.user.id,
  });

  owner.files.push(newFile._id);
  await owner.save();
  await newFile.save();

  if (!newFile) {
    return next(
      res.status(200).json({
        message: "File upload error!",
      })
    );
  }

  res.status(200).json({
    message: "File uploaded!",
    id: response._id,
    response,
  });
});

module.exports = {
  getAll,
  upload,
};
