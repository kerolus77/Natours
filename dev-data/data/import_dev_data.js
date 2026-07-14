const dotenv=require('dotenv');
const mongoose=require('mongoose');
const fs=require('fs');
const Tour=require('./../../model/tour_model');
dotenv.config({path:'./config.env'});
 const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
 mongoose.connect(DB).then(con=>{
  console.log(con.connections);
  console.log('DB connection successful');
 })

 const importData=async()=>{

    try {
        const tours=JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
          await Tour.create(tours);
          console.log('Data successfully loaded');
        
    } catch (error) {
        console.log(error);
    }

    process.exit();
 }

 const deleteData=async()=>{
    try {
        await Tour.deleteMany();
        console.log('Data successfully deleted');
    } catch (error) {
        console.log(error);
    }
    process.exit();
 }

 if(process.argv[2]==='--import'){
    importData();
 }else if(process.argv[2]==='--delete'){
    deleteData();
 }