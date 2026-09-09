import dotenv from 'dotenv';
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.stack);
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({path:'./config.env'});
const { default: mongoose } = await import('mongoose');

const { default: app } = await import('./app.js');

const { DATABASE, PASSWORD, PORT } = process.env;
if (!DATABASE || !PASSWORD) {
  console.error('Missing required environment variables. Please check your config.env file.');
  process.exit(1);
}
 const DB=DATABASE.replace('<PASSWORD>',PASSWORD);
 mongoose.connect(DB).then(con=>{
  console.log(con.connections);
  console.log('DB connection successful');
 })
const server = app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});

process.on('unhandledRejection',err=>{
  console.log('UNHANDLED REJECTION! Shutting down...');
  if(err instanceof Error){
     console.log(err.name,err.message);
  }
 
  server.close(()=>{
    process.exit(1);
  })
})