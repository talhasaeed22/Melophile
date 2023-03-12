const mongoose = require('mongoose');
const { Schema } = mongoose;

  const postSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      content:{
          type:String,
          required:true
      },
      name: {
        type:String,
        required:true
      },
      userImage: {
        type:String,
        required:true
      },
      image:{
          type:String,
      },
      audio:{
          type:String,
      },
      day:{
        type:String,
      },
      month:{
        type:String,
      },
      year:{
        type:String,
      }
  });


  module.exports = mongoose.model('post', postSchema);