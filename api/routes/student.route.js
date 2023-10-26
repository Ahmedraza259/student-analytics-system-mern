const express = require("express");
const router = express.Router();
const controller = require("../controllers/student.controller");

router.route("/add-student").post(controller.addStudent);
router.route("/get-predictions").post(controller.getLlmPredictions);
router.route("/all-subjects").get(controller.getAllSubjects);
router.route("/all-students").get(controller.getStudents);
router.route("/all-feedbacks").get(controller.getFeedbacks);


module.exports = router;
