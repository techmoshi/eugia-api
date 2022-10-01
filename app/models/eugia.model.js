module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
      image:String,
      designation:String,
      name:String,
      email:String,
      mobile_no:String,
      category:String,
      category_id:String,
      report_date:String,
      role:String,
      role_desc:String,
      job_desc:String,
      exp:String,
      qualification:String,
      job_location:String,
      // Job_id:String  ,
      isDeleted: {
        type: Boolean,
        required: true,
        default: false,
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const eugia = mongoose.model("eugia", schema);
  return eugia;
};
