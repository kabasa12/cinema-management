const mongoose = require('mongoose')

//Connection string
mongoose.connect('mongodb://localhost:27017/cinemaDB',
        {useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true ,
        useFindAndModify:false})


console.log('cinemaDB connected')