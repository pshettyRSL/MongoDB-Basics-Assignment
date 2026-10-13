Task 1 -

use company_advanced
db.createCollection("employees", { validator: { $jsonSchema: { bsonType: "object", required: ["name"], properties: { name: { bsonType: "string" }, departmentId: { bsonType: "int" }, experience: { bsonType: "int" }, active: { bsonType: "bool" } } } } })
db.employees.insertMany([
    { _id: 1, name: "John", departmentId: 10, skills: ["Java", "MongoDB"], experience: 4, active: true, certifications: [{ name: "MongoDB", status: "Expired", expiryYear: 2026 }] },
    { _id: 2, name: "Alice", departmentId: 10, skills: ["Python", "MongoDB"], experience: 6, active: true, certifications: [{ name: "MongoDB", status: "Active", expiryYear: 2028 }] },
    { _id: 3, name: "David", departmentId: 20, skills: ["Communication"], experience: 3, active: false, certifications: [{ name: "Communication", status: "Active", expiryYear: 2027 }] }])
db.employees.insertOne({
    _id: 99,
    name: 123,
    departmentId: "HR",
    experience: "one",
    active: "yes"
})

Task 2 -

db.employees.find({certifications: {$elemMatch: { name: "MongoDB", status: "Active" }}})
db.employees.updateOne({ name: "John", "certifications.name": "MongoDB" },{ $set: { "certifications.$.status": "Active" }})
db.employees.updateOne({},{$set: { "certifications.$[c].status": "Renewal Due" }},{ arrayFilters: [{ "c.expiryYear": { $lt: 2027 }}]})

Task 3 -

db.employees.bulkWrite([
{ updateOne: { filter: { name: "John" }, update: { $inc: { experience: 1 }}}},
{ updateOne: { filter: { name: "Alice" }, update: { $set: { active: false }}}},
{ insertOne: { document: { _id: 4, name: "Emma", departmentId: 20, active: true, experience: 2, skills: ["Excel"], certifications: [{name: "Excel", status: "Active", expiryYear: 2026}]}}}
])

Task 4 - 

db.createCollection("department")
db.department.insertMany([{ _id: 10, name: "Engineering" }, { _id: 20, name: "HR" }])
db.employees.aggregate([
  {$lookup: {from: "department", localField: "departmentId", foreignField: "_id", as: "department"}},
  {$unwind: "$department"},
  {$project: {_id:0, name: 1, departmentName: "$department.name"}},
  {$sort: { name: 1 }}
])
db.employees.aggregate([
  { $unwind: "$skills" },
  { $group: { _id: "$skills", employeeCount: { $sum: 1 } } },
  { $sort: { employeeCount: -1, skills: 1 } }
])
db.employees.aggregate([
  { $match: { active: true } },
  { $facet: {results: [{ $sort: { name: 1 } }], summary: [{ $count: "activeEmployees" }]}}
])

Task 5 -

db.employees.createIndex(
    {departmentId: 1, name: 1},
    {name: "departmentId_1_name_1"}
)
db.employees.getIndexes()
db.employees
  .find({ departmentId: 10 })
  .sort({ name: 1 })
  .explain("executionStats")


db.createCollection("session")
db.session.insert({_id: 1, userName: "John", expiresAt: new Date(Date.now() + 600000)})
db.session.createIndex({ expiresAt: 1 },{ expireAfterSeconds: 60 })

Task 6 -

mongodump --db company_advanced --archive=company.archive --gzip
mongorestore --archive=company.archive --gzip \
--nsFrom="company.*" \
--nsTo="company_restore.*"