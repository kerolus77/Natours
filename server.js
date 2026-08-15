const dotenv=require('dotenv');
const mongoose=require('mongoose');
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({path:'./config.env'});
 const app=require('./app');
 const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.PASSWORD);
 mongoose.connect(DB).then(con=>{
  console.log(con.connections);
  console.log('DB connection successful');
 })

 const port=process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

process.on('unhandledRejection',err=>{
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name,err.message);
  server.close(()=>{
    process.exit(1);
  })
})