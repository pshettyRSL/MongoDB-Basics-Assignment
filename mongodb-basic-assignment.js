Task 1 -

use company
db.createCollection("employees")
db.employees.insertMany([{"_id":"EMP001","name":"John","department":"Engineering","experience":4,"skills":["Java","SpringBoot"],"active":true,"address":{"city":"Pune","country":"India"}},{"_id":"EMP002","name":"Alice","department":"HR","experience":3,"skills":["Recruitment","Communication"],"active":true,"address":{"city":"Mumbai","country":"India"}},{"_id":"EMP003","name":"David","department":"Engineering","experience":6,"skills":["Java","MongoDB"],"active":true,"address":{"city":"Bengaluru","country":"India"}},{"_id":"EMP004","name":"Emma","department":"Finance","experience":2,"skills":["Accounting","Excel"],"active":false,"address":{"city":"Pune","country":"India"}},{"_id":"EMP005","name":"Robert","department":"Engineering","experience":5,"skills":["Java","Docker"],"active":true,"address":{"city":"Delhi","country":"India"}}])


Task 2 -

db.employees.find({ department: "Engineering" }, { _id: 1, name: 1, experience: 1}).sort({ name: 1})
db.employees.find({ experience: { $gte: 5 }}, {_id: 0, name: 1, experience: 1 }).sort({ experience: -1})
db.employees.find({ "address.city": "Pune"}, {_id: 0, name: 1, city: 1 }).sort({ name: 1})
db.employees.find({ "skills": { $in: ["MongoDB", "SpringBoot"] }}).sort({ name: 1})
db.employees.find({}, {_id:0, name:1, experience:1}).sort({ experience: -1}).limit(2)


Task 3 - 

db.employees.updateOne({ name: "Alice" }, { $inc: { experience: 1}})
db.employees.updateOne({ name: "Emma" }, { $set: { active: true}})
db.employees.updateOne({ name: "Robert" }, { $addToSet: { skills: "MongoDB"}})


Task 4 -

db.employees.insertOne({_id: "EMP999",name: "Temporary Employee",department: "Training",experience: 0})
db.employees.deleteOne({ _id: "EMP999" })


Task 5 -

db.employees.createIndex({ department: 1})
db.employees.getIndexes()


Task 6 -

db.employees.aggregate([{ $group: { _id: "$department", totalEmployees: { $sum: 1}}}]).sort({ _id:1})
db.employees.aggregate([{ $group: { _id: "$department", averageExperience: { $avg: "$experience"}}}]).sort({ _id:1})
db.employees.aggregate([{ $match: { department: "Engineering"}}, { $sort: { experience: -1}}, { $limit: 2} ])
