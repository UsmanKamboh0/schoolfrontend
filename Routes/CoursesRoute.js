const express=require('express');
const { isAnthentication, authorizeRoles } = require('../midleware/auth');
const { createCourse, mycourse,getAllCourses, GetAllCourses, GetCoursedetail } = require('../Controller/CourseController');
const router=express.Router();

router.route("/courses").get(GetAllCourses);


router
  .route("/admin/Course/new")
  .post(isAnthentication,authorizeRoles("admin","teacher"), createCourse);
  router.route("/courses/me").get(isAnthentication, mycourse);
  router
  .route("/admin/courses")
  .get( getAllCourses);
  router.route("/course/:id").get(GetCoursedetail);

  module.exports = router;
