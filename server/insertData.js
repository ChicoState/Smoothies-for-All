const User = require('./models/user');
const Post = require('./models/post');
const mongoose = require('mongoose');

const insertData = () => {
  const objectIds = new Array(3).fill(3).map(() => new mongoose.Types.ObjectId());

  User.insertMany([
    { _id: objectIds[0], username: 'John.Doe', email: 'john.doe@email.com', password: 'password' },
    { _id: objectIds[1], username: 'Jane.Doe', email: 'jane.doe@email.com', password: 'password' },
    { _id: objectIds[2], username: 'John.Smith', email: 'john.smith@email.com', password: 'password' }
  ]);

  Post.insertMany([
    {
      title: 'Post 1',
      body: 'Mollit qui incididunt laborum ex minim commodo aliquip elit sunt in. Labore laborum ea voluptate nostrud nostrud deserunt nisi nisi sit consectetur. In irure laboris ad exercitation adipisicing minim ipsum aliquip commodo adipisicing excepteur amet enim. Cillum ex ullamco pariatur officia cupidatat mollit ad anim anim dolor. Eu Lorem aliquip fugiat et irure cupidatat voluptate enim consequat occaecat mollit occaecat. Ut eu in aute commodo esse consequat proident eiusmod officia cillum dolore sit sint. Ullamco enim aliqua fugiat ullamco consectetur qui.',
      photo: 'https://via.placeholder.com/150',
      postedBy: objectIds[0]
    },
    {
      title: 'Post 2',
      body: 'Mollit qui incididunt laborum ex minim commodo aliquip elit sunt in. Labore laborum ea voluptate nostrud nostrud deserunt nisi nisi sit consectetur. In irure laboris ad exercitation adipisicing minim ipsum aliquip commodo adipisicing excepteur amet enim. Cillum ex ullamco pariatur officia cupidatat mollit ad anim anim dolor. Eu Lorem aliquip fugiat et irure cupidatat voluptate enim consequat occaecat mollit occaecat. Ut eu in aute commodo esse consequat proident eiusmod officia cillum dolore sit sint. Ullamco enim aliqua fugiat ullamco consectetur qui.',
      photo: 'https://via.placeholder.com/150',
      postedBy: objectIds[1]
    },
    {
      title: 'Post 3',
      body: 'Mollit qui incididunt laborum ex minim commodo aliquip elit sunt in. Labore laborum ea voluptate nostrud nostrud deserunt nisi nisi sit consectetur. In irure laboris ad exercitation adipisicing minim ipsum aliquip commodo adipisicing excepteur amet enim. Cillum ex ullamco pariatur officia cupidatat mollit ad anim anim dolor. Eu Lorem aliquip fugiat et irure cupidatat voluptate enim consequat occaecat mollit occaecat. Ut eu in aute commodo esse consequat proident eiusmod officia cillum dolore sit sint. Ullamco enim aliqua fugiat ullamco consectetur qui.',
      photo: 'https://via.placeholder.com/150',
      postedBy: objectIds[2]
    }
  ]);
};

module.exports = {
  insertData
};
