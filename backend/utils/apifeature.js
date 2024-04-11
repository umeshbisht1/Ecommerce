class Apifeatures {
   constructor(query, queryStr) {

      this.query = query;
      this.queryStr = queryStr;
   }
   search() {
    

      const keyword = this.queryStr.keyword ? {
         name: {
            $regex: this.queryStr.keyword,
            $options: "i",

         }
      } : {};

      // console.log(keyword);
      
      this.query = this.query.find({ ...keyword });
     
      return this;
   }
   filter() {

      const querycpy = { ...this.queryStr };
      // console.log(querycpy);

      const removefeild = ["keyword", "page", "limit"];
      
      removefeild.forEach(key => delete querycpy[key]);
      
      let queryStr = JSON.stringify(querycpy);
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
      //  console.log(JSON.parse(queryStr));
      this.query=this.query.where(JSON.parse(queryStr));
      return this;
   }
   pagination(resultperpage)
   {
      const currentpage=Number(this.queryStr.page)||1;
      const skip=resultperpage*(currentpage-1);
      this.query=this.query.limit(resultperpage).skip(skip);
      return this;
           
   }


}
export { Apifeatures }