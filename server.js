const dotenv=require('dotenv');
const mongoose=require('mongoose');
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
