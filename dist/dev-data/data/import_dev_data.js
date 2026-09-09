//npx tsx ./dev-data/data/import_dev_data.ts --delete
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import fs from 'fs';
import { fileURLToPath } from 'node:url';
import Tour from './../../model/tourModel.js';
import User from './../../model/userModel.js';
import Review from './../../model/reviewModel.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: './config.env' });
const DB = (process.env.DATABASE || '').replace('<PASSWORD>', process.env.PASSWORD || '');
mongoose.connect(DB);
const importData = async () => {
    try {
        const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
        const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
        const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        console.log('Data successfully loaded');
    }
    catch (error) {
        console.log(error);
    }
    process.exit();
};
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        console.log('Data successfully deleted');
    }
    catch (error) {
        console.log(error);
    }
    process.exit();
};
if (process.argv[2] === '--import') {
    importData();
}
else if (process.argv[2] === '--delete') {
    deleteData();
}
//# sourceMappingURL=import_dev_data.js.map