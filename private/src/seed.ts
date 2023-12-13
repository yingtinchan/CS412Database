
// import { Book } from "./book/entities/book.entity";
// import { Lecture } from "./lecture/entities/lecture.entity";
// import { Major } from "./major/entities/major.entity";
// import { Admin } from "./user/entities/admin.entity";
// import { Student } from "./user/entities/student.entity";
// import { Teacher } from "./user/entities/teacher.entity";
import { hashPassword } from "./utils/hash";

class Major {
    major_id: string;
    name: string;
}

class Admin {
    admin_id: string;
    name: string;
    password: string;
    email: string;
}

class Teacher {
    teacher_id: string;
    name: string;
    password: string;
    email: string;
}

class Student {
    student_id: string;
    name: string;
    password: string;
    email: string;
    major: string
    lecture: string;
}

class Book {
    name: string;
    category: string;
    author: string;
    description: string;
    student_id: string;
    teacher_id: string;
}

class Lecture{        
    lecture_id: string;
    name: string;
    start_time: string;
    end_time: string;
    sem: string;
}

class Attendance{
    lecture_id: string;
    student_id: string;
    attendance: boolean
}

var Chance = require('chance');
var chance = new Chance();

const categorys = [
    'Fiction',
    'Biography',
    'Memoir',
    'Autobiography',
    'Action fiction',
    'Anthology',
    'Mystery',
    'Chapter book']

const m = [{
    id: 'CS50',
    name: 'Computing'
},
{
    id: 'BBA',
    name: 'Business'
},
{
    id: 'NRS',
    name: 'Nursing'
},]

const l = [{
    id: 'code101',
    name: 'Programming'
},
{
    id: 'web101',
    name: 'HTML'
},
{
    id: 'db101',
    name: 'Database'
}, 
{
    id: 'econ101',
    name: 'Business'
},
{
    id: 'acc101',
    name: 'Account'
},
{
    id: 'health101',
    name: 'Healthcare'
},
{
    id: 'econ201',
    name: 'Economics'
},
{
    id: 'acc201',
    name: 'Auditing'
},
{
    id: 'health201',
    name: 'Nutrition'
},
{
    id: 'Nursing101',
    name: 'Nursing'
}]

major()
book()
teacher()
student()
admin()
lecture()
attendance()

async function major() {
    var url = 'http://127.0.0.1:3001/major'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < m.length; i++) {
        const major = new Major();
        major.major_id = m[i].id
        major.name = m[i].name
        await fetch(url, {
            body: JSON.stringify(major),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function book() {
    var url = 'http://127.0.0.1:3001/book'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].book_id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const book = new Book();
        book.name = chance.company()
        book.category = categorys[Math.floor(Math.random() * categorys.length)];
        book.author = chance.name()
        book.description = chance.sentence()
        await fetch(url, {
            body: JSON.stringify(book),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function student() {
    var url = 'http://127.0.0.1:3001/user/student'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const student = new Student();
        student.name = chance.name()
        student.password = await hashPassword("1111")
        student.email = student.name + "@example.com"
        student.major = m[Math.floor(Math.random() * 3)].id
        student.lecture = 'program101'
        await fetch(url, {
            body: JSON.stringify(student),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function teacher() {
    var url = 'http://127.0.0.1:3001/user/teacher'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const teacher = new Teacher();
        teacher.name = chance.name()
        teacher.password = await hashPassword("1111")
        teacher.email = teacher.name + "@example.com"
        await fetch(url, {
            body: JSON.stringify(teacher),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function admin() {
    var url = 'http://127.0.0.1:3001/user/admin'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const admin = new Admin();
        admin.name = chance.name()
        admin.password = await hashPassword("1111")
        admin.email = admin.name + "@example.com"
        await fetch(url, {
            body: JSON.stringify(admin),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function lecture() {
    var url = 'http://127.0.0.1:3001/lecture'

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const lecture = new Lecture();
        lecture.lecture_id = l[i].id
        lecture.name = l[i].name
        lecture.start_time = '0900'
        lecture.end_time = '1200'
        lecture.sem = '1'
        await fetch(url, {
            body: JSON.stringify(lecture),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}

async function attendance() {
    var url = 'http://127.0.0.1:3001/attendance '

    let res = await fetch(url)
    let data = await res.json()

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            await fetch(url + '/' + data[i].id, { method: 'DELETE' })
        }
    }
    for (let i = 0; i < 10; i++) {
        const attendance = new Attendance();
        let x = Math.floor(Math.random() * 10)
        let genid = "S"+(x+1).toString();
        while(genid.length<8){
          genid = genid.substring(0, 1) + '0' + genid.substring(1)
        }
        attendance.lecture_id = l[x].id
        attendance.student_id = genid
        attendance.attendance = x<5? true : false
        await fetch(url, {
            body: JSON.stringify(attendance),
            headers: {
                'dataType': 'json',
                'content-type': 'application/json'
            },
            method: 'POST',
        })
    }
}
