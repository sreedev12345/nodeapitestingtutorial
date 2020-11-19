const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');
// const mongoose = require('mongoose');
// const Mockgoose = require('mockgoose').Mockgoose
// const mockgoose = new Mockgoose(mongoose);

// const mongodb = 'mongodb://127.0.0.1/test_demo';

// before(function(done){
// 		mockgoose.prepareStorage().then(function(){
// 			mongoose.Promise = global.Promise;
// 			mongoose.connect(mongodb,function(err){
// 				done(err)
// 			})
// 			mongoose.connection.on('connected',function(err){
// 				if(err) {
// 					console.log('error')
// 				} else {
// 					console.log('connected')
// 				}
// 			})
// 		})
// })





describe('app',function(){
	it('app should return',(done)=>{
		request(app).post('/adduser')
		.send({username : 'aparna'})
		.end(function(err,res){
			expect(res.status).to.equal(200);
			expect(res.body.data).to.have.property('_id');
			expect(res.body.data.username).to.equal('aparna')
			done();
		})
	})
	// it('get getuser',(done)=>{
	// 	request(app).get('/getuser')
	// 	.end(function(err,res){
	// 		 expect(res.body.data.username).to.equal('sreedev')
	// 		done();
	// 	})
	// })
})