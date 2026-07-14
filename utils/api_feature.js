class ApiFeature{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    filter(){
      
          const queryObj={...this.queryStr};
          const excludedFields=['page','sort','limit','fields'];
          excludedFields.forEach(el=>delete queryObj[el]);
        
        // 1.1)Advanced Filtering
          let queryStr =JSON.stringify(queryObj);
          queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/,match=>`$${match}`)

          this.query=this.query.find(JSON.parse(queryStr));
          return this;
        
    }

    sort(){
          if(this.queryStr.sort){
    const sortBy=this.queryStr.sort.split(',').join(' ');
 this.query= this.query.sort(sortBy)
  }else{
    this.query= this.query.sort('-createdAt')
  }
  return this;
    }


    filedLimiting(){
        
  if(this.queryStr.fields){
    const fileds=this.queryStr.fields.split(',').join(' ');
   this.query=  this.query.select(fileds)
  }else{
    this.query= this.query.select('-__v')
  }
  return this;
    }


    pagination(){
const page= this.queryStr.page*1 ||1;
 const limit= this.queryStr.limit*1 ||20;
 const skip=(page-1)*limit;
 this.quey=this.query.skip(skip).limit(limit)
 return this;
}

}
module.exports=ApiFeature;
