const mongoose = require('mongoose')

//Connection string
mongoose.connect('mongodb://127.0.0.1:27017/cinemaDB',
        {useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true ,
        useFindAndModify:false})


console.log('cinemaDB connected')