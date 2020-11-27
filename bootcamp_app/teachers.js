const { Pool } = require('pg');

const pool = new Pool({
  name: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers
JOIN assistance_requests ON teachers.id = teacher_id
JOIN students ON student_id = students.id 
JOIN cohorts ON cohort_id = cohorts.id 
WHERE cohorts.name = $1
ORDER BY teacher;
`;
const cohort = process.argv[2] || 'JUL02';
const values = [cohort];

pool.query(queryString, values)
.then(res => {
  console.log('query successful!');
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  });
})
.catch(err => console.error('query error', err.stack));