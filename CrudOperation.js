const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json())

mongoose.connect('mongoURI', { useNewUrlParser: true, useUnifiedTopology: true });

const studentSchema = new mongoose.Schema({
  student_id: { type: Number, required: true , unique: true},
  student_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  marks: { type: Number, required: true }
});
const Student = mongoose.model('Student', studentSchema);

const teacherSchema = new mongoose.Schema({
  teacher_id: { type: Number, required: true , unique: true },
  teacher_name: { type: String, required: true },
  deptid: { type: Number, required: true }
});
const Teacher = mongoose.model('Teacher', teacherSchema);

const departmentSchema = new mongoose.Schema({
  deptid: { type: Number, required: true},
  deptname: { type: String, required: true }
});
const Department = mongoose.model('Department', departmentSchema);


// View all students
app.get('/viewstudents', async (req, res) => {
  Student.find().then((students) => {
    res.json(students);
  }).catch((err)=>{
    console.error(err);
    res.status(500).send('Error retrieving students');
});
});

// View all teachers
app.get('/viewteachers', async (req, res) => {
  Teacher.find().then((teachers) => {
    res.json(teachers);
  }).catch((err)=>{
    console.error(err);
    res.status(500).send('Error retrieving teachers');
});
});

// View all departments
app.get('/viewdept', async (req, res) => {
  Department.find().then((departments) => {
    res.json(departments);
  }).catch((err)=>{
    console.error(err);
    res.status(500).send('Error retrieving departments');
});
});

// Insert a new student
app.post('/insertstudent', async (req, res) => {
  const { student_id, student_name, date_of_birth, marks } = req.body;
  const student = new Student({ student_id, student_name, date_of_birth, marks });
  student.save().then(() => {
    res.json('Student inserted successfully');

  }).catch((err)=>{
      console.error(err);
      res.status(500).send('Error inserting student');
  })
});

// Insert a new teacher
app.post('/insertteacher', async (req, res) => {
  const { teacher_id, teacher_name, deptid } = req.body;
  const teacher = new Teacher({ teacher_id, teacher_name, deptid });
  teacher.save().then(() => {
    res.json('Teacher inserted successfully');

  }).catch((err)=>{
      console.error(err);
      res.status(500).send('Error inserting teacher');
  })
});

Delete a student by ID
app.delete('/deletestudent/:id', async (req, res) => {
  try {
    await Student.findOneAndDelete({ student_id: req.params.id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}); 


app.listen(3000, () => {
  console.log('Server started on port 3000');
});
