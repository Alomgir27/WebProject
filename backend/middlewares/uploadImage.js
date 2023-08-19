const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util"); // Import the promisify function from the 'util' module

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};

const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 1000000 },
});





// const productImgResize = async (req, res, next) => {
//   if (!req.files) return next();
  
//   const unlinkAsync = promisify(fs.unlink); // Promisify the unlink function
  
//   await Promise.all(
//     req.files.map(async (file) => {
//       const outputPath = path.join(__dirname, `../public/images/products/${file.filename}`);
      
//       await sharp(file.path)
//         .resize(300, 300)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);

//       // Use promisified unlink to delete the original uploaded file
//       await unlinkAsync(file.path);
//     })
//   );
//   next();
// };

// const blogImgResize = async (req, res, next) => {
//   if (!req.files) return next();
  
//   const unlinkAsync = promisify(fs.unlink); // Promisify the unlink function
  
//   await Promise.all(
//     req.files.map(async (file) => {
//       const outputPath = path.join(__dirname, `../public/images/blogs/${file.filename}`);
      
//       await sharp(file.path)
//         .resize(300, 300)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(outputPath);

//       // Use promisified unlink to delete the original uploaded file
//       await unlinkAsync(file.path);
//     })
//   );
//   next();
// };

module.exports = { uploadPhoto };
