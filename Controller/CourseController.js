const Course = require('../Models/CourseModel');
const Errorhandler = require('../Utils/Errorhandler');
const catchAsyncError = require('../midleware/catchAsyncErrors')
const ApiFeature = require('../Utils/ApiFeature');

const cloudinary =require('cloudinary')

// Create Course -- Admin
exports.createCourse = catchAsyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Courses",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    course,
  });
});


exports.mycourse = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find({ user: req.user._id }).populate('user');

  res.status(200).json({
    success: true,
    courses,
  });
});

// Get All Product (Admin)
exports.getAllCourses = catchAsyncError(async (req, res, next) => {
  const courses = await Course.find().populate('user');

  res.status(200).json({
    success: true,
    courses,
  });
});

exports.GetAllCourses =catchAsyncError( async (req, res, next) => {
  const resultPerPage = 18;
  const CoursesCount = await Course.countDocuments();
  const apiFeature = new ApiFeature(Course.find(), req.query)
    .search()
    .filter()
  ;

  let courses = await apiFeature.query;
  let filteredcoursesCount = courses.length;
  apiFeature.pagination(resultPerPage);
  courses = await apiFeature.query.clone().populate('user');
  res.status(200).json({
    success: true,
    CoursesCount,
    courses,
    resultPerPage,
    filteredcoursesCount,

  })
})

exports.GetCoursedetail = catchAsyncError(async (req, res, next) => {


  const course = await Course.findById({ _id: req.params.id }).populate('user');

  if (!course) {
    return next(new Errorhandler("Product not found", 404));
  }



  res.status(200).json({
    success: true,
    course,
  })
});
