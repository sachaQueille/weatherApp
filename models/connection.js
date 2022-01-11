var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology : true,
    useNewUrlParser: true,
}

mongoose.connect('mongodb+srv://weatherUser:Weather2021@cluster0.prvpu.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options,
    function(err){
        console.log(err);
    }
)