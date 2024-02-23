const express = require('express');
const app = express();
const mongoose = require('mongoose');
const courseSchema = require('./modules/courseModel');

app.get('/', (req, res) => {
    res.send("Hello! this is the root route of the API");
});

//Retrieve all published backend courses and sort them alphabetically by their names
app.get("/api/CoursesSorted", async (req, res) => {
    try {
      const years = await courseSchema.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      courses.sort((a, b) => a.description.localeCompare(b.description));
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//Select and extract the name and specialization of each course
app.get("/api/CoursesNameAndSpecialization", async (req, res) => {
    try {
      const years = await courseSchema.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      const descriptionsAndTags = courses.map((course) => ({
        description: course.description,
        tags: course.tags,
      }));
      res.json(descriptionsAndTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//Retrieve all published BSIS and BSIT courses from the curriculum.

app.get("/api/CoursesPublished", async (req, res) => {
    try {
      const years = await courseSchema.find();
      let courses = [];
      years.forEach((year) => {
        ["1st Year", "2nd Year", "3rd Year", "4th Year"].forEach((yearKey) => {
          if (year[yearKey]) {
            courses.push(...year[yearKey]);
          }
        });
      });
      const descriptionsAndTags = courses
        .filter(
          (course) => course.tags.includes("BSIT") || course.tags.includes("BSIS")
        )
        .map((course) => ({
          description: course.description,
          tags: course.tags,
        }));
      res.json(descriptionsAndTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  



mongoose.connect('mongodb://localhost:27017/coursesdb')
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch((error) => {
        console.error("MongoDB connection error:..", error);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



