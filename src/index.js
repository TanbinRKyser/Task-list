const express = require('express');
require('./db/mongoose');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const auth = require('./middleware/auth');

const app = express();
const port = process.env.PORT || 3000;

app.use( express.json() );
app.use( userRouter );
app.use( taskRouter );

app.listen( port, () => {
    console.log("Server is up on port.");
}) 

/* const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    const task = await Task.findById('62e267402f0d086b32c0b439')
    await task.populate('author');
    console.log(task.author);

    // const user = await User.findById('62e2672a2f0d086b32c0b431')
    // await user.populate('tasks');
    // console.log(user.tasks);
}

main(); */