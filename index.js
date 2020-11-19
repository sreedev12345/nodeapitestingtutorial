const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const port = 5000;
const user = require('./models/user');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const jsPDF = require('jspdf').jsPDF;
const autoTable = require('jspdf-autotable').autoTable


const mongoose = require('mongoose');

app.set('view engine','ejs');
app.use(express.static(require('path').join(__dirname,'public')))

console.log(__dirname)



const mongodb = 'mongodb://127.0.0.1/test_demo';

	mongoose.connect(mongodb,(err,data)=>{
		console.log('conncted')
	});








	// const doc = new jsPDF();
	// const tablecolumn = ['FirstName','LastName','Gender','Age','Country'];
	// const tablerow = []
	// items.map((data,i)=>{
	//  const pdfdata = [
	//   data.FirstName,data.LastName,data.Gender,data.Country,data.Age,data.Id
	//  ]
	//   tablerow.push(items)
	// })
	//  doc.autoTable(tablecolumn,tablerow);
	//   doc.save('report.pdf')









	app.post('/getfile',async(req,res)=>{
		const workbook = await xlsx.readFile('./public/1603706743758.xls');
		const sheetnames = workbook.SheetNames;
				const sheetnamelist = xlsx.utils.sheet_to_json(workbook.Sheets[sheetnames[0]]);
				const doc = new jsPDF();
				 const tablecolumn = ['FirstName','LastName','Gender','Age','Country'];
				 const tablerow = []
				 tablerow.push(sheetnamelist)
				 doc.autoTable(tablecolumn,tablerow);
	           doc.save('report.pdf')
				res.render(require('path').join(__dirname,'public/view/index'),{data:sheetnamelist})
	  })



	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
		  cb(null, './public/');
		},
		filename: function (req, file, cb) {
		  cb(null, Date.now()+"." +file.originalname.split(".").pop());
		}
	  });
	  
	  const upload = multer({
		storage: storage,
		limits: {
		  fileSize: 1024 * 1024 * 50    // 50 MB
		}
	  })
	

	 













	
	app.post('/upload',upload.single('file'),(req, res, next) => {
	  // let imageFile = req.files.file;
	  console.log('arraaaaaa',req.file)
	  const addfile = new file({
		path : req.file.path
	  })
	  addfile.save((err,data)=>{
		console.log('data',data)
		 res.json({
		// file : `public/${req.file.filename}`
		file : data.path
	  })
	  })

	})




app.use(cors());
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());

app.post('/adduser',(req,res)=>{
	const adduser = new user(req.body);
	adduser.save((err,data)=>{
		res.json({
			status :200,
			data : data
		})
	})
})

app.get('/getuser',(req,res)=>{
	user.findOne({},(err,data)=>{
		res.json({
			data : data
		})
	})
})

app.listen(port,()=>{
	console.log(`server is listening on ${port}`)
 })

 module.exports = app;


