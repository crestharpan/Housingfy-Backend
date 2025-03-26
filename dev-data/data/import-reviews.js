const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Review = require('../../Model/reviewModel');

dotenv.config({ path: './config.env' });

const Db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(Db).then(() => {
  console.log('DB connection Successful');
});

//READ FILE FORM TOURS-SIMPLE.JSON

const reviews = JSON.parse(
  fs.readFileSync('./dev-data/data/reviews.json', 'utf-8')
);

//IMPORTING FILES TO DATABASE
const importData = async () => {
  try {
    await Review.create(reviews);

    console.log('successfully added all the data');
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await Review.deleteMany();

    console.log('Deleted all the data');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
